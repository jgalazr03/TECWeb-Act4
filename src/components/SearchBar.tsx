"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="text"
        placeholder="Buscar ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>
        <Search size={18} className="mr-2" />
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
