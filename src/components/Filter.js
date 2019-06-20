import React from "react";

import styled from "styled-components";

const Filter = ({ onFilter }) => {
  const handleOnChange = e => {
    onFilter(e.target.value);
  };

  return (
    <Select onChange={handleOnChange}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </Select>
  );
};

const Select = styled.select`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0px 18px;
  font-size: 18px;
  height: 40px;
  width: 175px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`;

export default Filter;
