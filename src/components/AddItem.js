import React from "react";
import { Provider, Subscribe } from "unstated";
import styled from "styled-components";
import TodosContainer from "../store";
import { withRouter } from "react-router-dom";
const AddTodo = props => {
  const handleKeyPress = (e, next) => {
    if (e.key === "Enter") {
      const listId = props.match.params.id;
      next(e.target.value, listId);
      props.history.push("/");
    }
  };

  return (
    <Subscribe to={[TodosContainer]}>
      {todos => {
        return (
          <div>
            <h1>Add Item</h1>
            <Input
              type="text"
              onKeyPress={e => handleKeyPress(e, todos.addItem)}
              placeholder="Add new item..."
            />
          </div>
        );
      }}
    </Subscribe>
  );
};

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`;

export default withRouter(AddTodo);
