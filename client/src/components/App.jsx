import React from 'react';
import AllLists from './AllLists.jsx';
import Form from './Form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      editListName: '',
      editListDescription: ''
    };
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.editList = this.editList.bind(this);
    this.listNameOnChange = this.listNameOnChange.bind(this);
    this.listDescriptionOnChange = this.listDescriptionOnChange.bind(this);
    this.updateList = this.updateList.bind(this);
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

  editList(id) {
    let filtered = this.state.lists.filter(el => el._id === id);
    this.setState({editListName: filtered[0].name, editListDescription: filtered[0].description});
  }

  listNameOnChange(e) {
    this.setState({editListName: e.target.value});
  }

  listDescriptionOnChange(e) {
    this.setState({editListDescription: e.target.value})
  }

  updateList(id) {
    fetch(`http://127.0.0.1:4321/list/one/${id}`,
      {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "name": this.state.editListName,
          "description": this.state.editListDescription})
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState(prevState => {
          let i = prevState.lists.findIndex(el => el._id === id);
          prevState.lists.splice(i, 1, data);
          return {lists: prevState.lists, editListName: '', editListDescription: ''};
        });
      })
      .catch(err => console.log('error at App.jsx updateList', err));
  }




  render() {
    return (
      <div>
        <Form addList={this.addList} />
        <AllLists
          editListName={this.state.editListName}
          listNameOnChange={this.listNameOnChange}
          editListDescription={this.state.editListDescription}
          listDescriptionOnChange={this.listDescriptionOnChange}
          editList={this.editList}
          updateList={this.updateList}
          deleteList={this.deleteList}
          lists={this.state.lists}
        />
      </div>
    );
  }
}


export default App;