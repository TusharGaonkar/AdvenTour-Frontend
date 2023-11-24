import { Input } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => (
  <Input
    type="search"
    size="sm"
    placeholder="Search places to go"
    startContent={<FaSearch className="mr-2" />}
  />
);

export default SearchBar;
