// src/Search.jsx
import React, { useState } from 'react';
import { employees } from './data';

const Search = () => {
  const [query, setQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    const results = employees.filter(employee =>
      employee.name.toLowerCase().includes(value)
    );
    setFilteredEmployees(results);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search employee names"
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {filteredEmployees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
