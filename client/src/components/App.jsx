import React from 'react';
import AllLists from './AllLists.jsx';
import Form from './Form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:4321/list/many/all')
      .then(data => data.json())
      .then(data => this.setState({lists: data}))
      .catch(err => console.log('error at App.jsx componentDidMount', err));
  }

  render() {
    return (
      <div>
        <Form />
        <AllLists
          lists={this.state.lists}
        />
      </div>
    );
  }
}


export default App;