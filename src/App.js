import React from "react";
import { Provider, Subscribe } from "unstated";

import styled from "styled-components";

import main from "./main";
import AddItem from "./components/AddItem";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function App() {
  return (
    <Provider>
      <Wrapper>
        <TodosWrapper>
          <Router>
            <div>
              <Route exact path="/" component={main} />
              <Route exact path="/addItem/:id" component={AddItem} />
            </div>
          </Router>
        </TodosWrapper>
      </Wrapper>
    </Provider>
  );
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`;

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

export default App;
