import React from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

interface SearchBarProps {
  onSearch: (term: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  value,
}) => {
  return (
    <Form className="mb-4">
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search by title..."
          defaultValue={value}
          onChange={onSearch}
        />
      
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
