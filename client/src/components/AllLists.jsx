import React from 'react';

class AllLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.lists.map(list => <List key={list._id} />)}
      </div>
    );
  }
}

export default AllLists;