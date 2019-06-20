import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
class TodoItem extends React.Component {
  state = {
    showList: false
  };
  showList = () => {
    console.log("in showList");
    this.setState({ showList: !this.state.showList });
  };
  render() {
    const { id, text, items, completed, onComplete } = this.props;
    const Wrapper = styled.p`
      font-size: 24px;
      cursor: pointer;
    `;

    const Text = styled.span`
      text-decoration: ${props => (props.completed ? "line-through" : "none")};
    `;
    const Accordion = styled.span`
      color: #fff;
      font-size: 22px;
      margin-right: 5px;
      display: inline-block;
      font-weight: bold;
    `;

    const List = styled.ul`
      font-size: 15px;
      margin: 5px;
      display: block;
      margin-top: 10px;
      padding-left: 80px;
    `;
    const ListLi = styled.li`
      font-size: 15px;
      padding: 5px;
    `;

    return (
      <Wrapper>
        <code>
          [{completed ? "x" : "  "}]{" "}
          <Accordion onClick={this.showList}>
            {this.state.showList ? "-" : "+"}
          </Accordion>
          <Text completed={completed} onClick={onComplete}>
            {text}
          </Text>
          <Link
            to={`addItem/${id}`}
            style={{
              color: "#fff",
              fontSize: "12px",
              marginLeft: "15px",
              verticalAlign: "middle"
            }}
          >
            Add Item
          </Link>
          {this.state.showList ? (
            <List>
              {items != undefined
                ? items.map((item, index) => {
                    return <ListLi key={index}>{item}</ListLi>;
                  })
                : "No Added Items"}
            </List>
          ) : null}
        </code>
      </Wrapper>
    );
  }
}
export default TodoItem;
