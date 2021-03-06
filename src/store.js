import { Container } from "unstated";

const defaultState = {
  list: [
    {
      id: 1,
      completed: false,
      text: "Read README"
    },
    {
      id: 2,
      completed: false,
      text: "Add one todo"
    },
    {
      id: 3,
      completed: false,
      text: "Add filters"
    },
    {
      id: 4,
      completed: false,
      text: "Add multiple lists"
    },
    {
      id: 5,
      completed: false,
      text: "Optional: add tests"
    }
  ]
};

class TodosContainer extends Container {
  constructor(props) {
    super(props);

    this.state = this.readStorage();
  }

  readStorage() {
    if (window && window.localStorage) {
      let state = window.localStorage.getItem("appState");
      if (state) {
        let listData = JSON.parse(state);
        if (listData.list.length > 0) {
          return JSON.parse(state);
        } else {
          return defaultState;
        }
      }
      return defaultState;
    }
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state);
      window.localStorage.setItem("appState", state);
    }
  }

  getList() {
    return this.state.list;
  }

  toggleComplete = async id => {
    const item = this.state.list.find(i => i.id === id);
    const completed = !item.completed;

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          completed
        };
      });
      return { list };
    });

    this.syncStorage();
  };

  createTodo = async text => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list.length + 1
      };

      const list = state.list.concat(item);
      return { list };
    });

    this.syncStorage();
  };
  filterList = selected => {
    const listData = window.localStorage.getItem("appState"); //get list from storage
    const storageList = JSON.parse(listData);
    if (selected) {
      if (selected === "completed") {
        let filteredList = storageList.list.filter(
          list => list[selected] === true
        );

        this.setState({ list: filteredList });
      } else if (selected === "active") {
        let filteredList = storageList.list.filter(
          list => list.completed === false
        );
        this.setState({ list: filteredList });
      } else {
        this.setState({ list: storageList.list });
      }
    }
  };
  addItem = async (value, id) => {
    let selectedList = this.state.list.filter(
      list => list.id === parseInt(id)
    )[0];

    if (selectedList.items !== undefined) {
      selectedList.items = [...selectedList.items, value];
    } else {
      selectedList.items = [value];
    }
    this.syncStorage();
  };
}

export default TodosContainer;
