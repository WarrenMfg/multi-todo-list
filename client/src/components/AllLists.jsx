import React from 'react';
import List from './List.jsx';

class AllLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.lists.map(list =>
          <List
            list={list}
            deleteList={this.props.deleteList}
            key={list._id}
          />)}
      </div>
    );
  }
}

export default AllLists;