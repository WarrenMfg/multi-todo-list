import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.handleListName = this.handleListName.bind(this);
    this.handleListDescription = this.handleListDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleListName(e) {
    this.setState({name: e.target.value});
  }

  handleListDescription(e) {
    this.setState({description: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name && this.state.description) {

      fetch(`/list/one/add`,
      {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "name": this.state.name,
          "description": this.state.description})
      })
        .then(data => data.json())
        .then(data => {
          this.setState({name: '', description: ''})
          this.props.addList(data);
        })
        .catch(err => console.log('error at Form.jsx handleSubmit', err));
    }
    e.target.blur();
  }

  render() {
    return (
      <form className="Form">
        <input
          type="text"
          placeholder="New list name"
          value={this.state.name}
          onChange={this.handleListName}
        />
        <input
          type="text"
          placeholder="New list description"
          value={this.state.description}
          onChange={this.handleListDescription}
        />
        <button
          onClick={this.handleSubmit}
        >Add</button>
      </form>
    );
  }
}

export default Form;