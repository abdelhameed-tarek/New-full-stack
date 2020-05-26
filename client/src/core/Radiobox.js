import React, { useState } from "react";

const Radiobox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((price, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type="radio"
        className="mr-2 ml-4"
        name={price}
        value={`${price._id}`}
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default Radiobox;
