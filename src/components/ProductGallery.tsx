import axios from "axios";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";
import ProductDetails from "./ProductDetails";
import { debounce } from "../utils/Debounce";

interface Product {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const ProductGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | string>("asc");

const fetchProducts = useCallback(
  async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10&_sort=albumId&_order=${sortOrder}&title_like=${searchTerm}`
      );
      setProducts((prevProducts) =>
        page === 1 ? res.data : [...prevProducts, ...res.data]
      );
      setHasMore(res.data.length > 0);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  },
  [searchTerm, sortOrder]
);

  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortOrder, fetchProducts, searchTerm]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value)
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onsearh = useCallback(debounce(handleSearch), [])

  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [sortOrder, fetchProducts, searchTerm]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, loading, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProducts]);

  const handleAlbumChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setPage(1)
      const value = event.target.value;
      setSortOrder(value as "asc" | "desc");
    },
    []
  );

  // Memoizing the product list to prevent unnecessary re-renders
 const productItems = useMemo(() => {
   if (products.length === 0 && !loading) {
     return <p className="text-center">No products found</p>;
   }

   return products.map((product) => (
     <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
       <ProductItem product={product} onClick={handleProductClick} />
     </Col>
   ));
 }, [products, handleProductClick, loading]);

  if (loading && products.length === 0)
    return <Spinner animation="border" variant="primary" />;

  return (
    <Container className="mt-3">
      <Row className="mb-3">
        <Col md={8}>
          <SearchBar
            onSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
              onsearh(e.target.value)
            }
            value={searchTerm}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            aria-label="Filter by Album ID"
            value={sortOrder}
            onChange={handleAlbumChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>{productItems}</Row>
      {loading && (
        <Spinner
          animation="border"
          variant="primary"
          className="d-block mx-auto"
        />
      )}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          show={!!selectedProduct}
          onHide={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default ProductGallery;
