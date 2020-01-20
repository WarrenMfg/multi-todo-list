import React from 'react';
import AllLists from './AllLists.jsx';
import Form from './Form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:4321/list/many/all')
      .then(data => data.json())
      .then(data => this.setState({lists: data}))
      .catch(err => console.log('error at App.jsx componentDidMount', err));
  }

  addList(list) {
    this.setState(prevState => {
      prevState.lists.push(list);
      return {lists: prevState.lists};
    });
  }

  deleteList(id) {
    fetch(`http://127.0.0.1:4321/list/one/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    })
      .then(data => data.json())
      .then(data => this.setState(prevState => {
        let filtered = prevState.lists.filter(el => el._id !== data._id);
        return {lists: filtered};
      }))
      // delete associated todos from list
      .then(() => {
        fetch(`http://127.0.0.1:4321/item/many/${id}`,
          {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
          })
            .then(data => data.json())
            .then(data => console.log(data))
            .catch(err => console.log('error at App deleteList deleting items', err));
      })
      .catch(err => console.log('error at List.jsx deleteItem', err));
  }

  render() {
    return (
      <div>
        <Form addList={this.addList} />
        <AllLists
          deleteList={this.deleteList}
          lists={this.state.lists}
        />
      </div>
    );
  }
}


export default App;