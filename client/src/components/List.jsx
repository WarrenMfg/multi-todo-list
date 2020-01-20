import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      notes: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:4321/item/many/${this.props.list._id}`)
      .then(data => data.json())
      .then(data => this.setState({items: data}))
      .catch(err => console.log('error at List.jsx componentDidMount', err));
  }

  addItem() {
    fetch(`http://127.0.0.1:4321/item/one/${this.props.list._id}`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": this.state.name,
        "notes": this.state.notes,
        "list": this.props.list._id})
    })
      .then(data => data.json())
      .then(data => {
        this.setState(prevState => {
          prevState.items.push(data);
          return {items: prevState.items, name: '', notes: ''};
        })
      })
      .catch(err => console.log('error at List.jsx addItem', err));
  }

  deleteItem(id) {
    fetch(`http://127.0.0.1:4321/item/one/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    })
      .then(data => data.json())
      .then(data => this.setState(prevState => {
        let filtered = prevState.items.filter(el => el._id !== data._id);
        return {items: filtered};
      }))
      .catch(err => console.log('error at List.jsx deleteItem', err));
  }

  handleInputChange(e) {
    this.setState({name: e.target.value});
  }

  handleTextareaChange(e) {
    this.setState({notes: e.target.value});
  }

  handleEnter(e) {
    if (e.key === 'Enter' && this.state.name) {
      this.addItem();
    }
  }

  handleClick(e) {
    if (e.target.tagName === 'BUTTON') {
      this.addItem();
    } else if (e.target.tagName === 'I') {
      if (e.target.parentElement.tagName === 'H3') {
        this.props.deleteList(this.props.list._id)
      } else {
        this.deleteItem(e.target.dataset.id);
      }
    }

  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        className='List'
        id={this.props.list._id}
      >
        <input
          type="text"
          placeholder="Todo"
          value={this.state.name}
          onChange={this.handleInputChange}
          onKeyPress={this.handleEnter}
          required
        />
        <textarea
          placeholder="Notes"
          value={this.state.notes}
          onChange={this.handleTextareaChange}
        ></textarea>
        <button>Add</button>
        <h3>{this.props.list.name} <i className="far fa-minus-square" data-id={this.props.list._id}></i></h3>
        <p>{this.props.list.description}</p>
        {this.state.items.map(item =>
          <ListItem
            item={item}
            key={item._id}
          />
        )}
      </div>
    );
  }
}

export default List;