import React from 'react';
import AllLists from './AllLists.jsx';

class App extends React.Component {
  constructor(props) { // If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.
    super(props);
    this.state = {
      lists: []
    };
  }

  render() {
    return (
      <div>
        <AllLists lists={this.state.lists} />
      </div>
    );
  }
}


export default App;