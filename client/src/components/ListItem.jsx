import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.item._id}>
        <p>{this.props.item.name}</p>
        <p>{this.props.item.notes}</p>
        <p>{this.props.item.status}</p>
        <p>{this.props.item.due}</p>
      </div>
    );
  }
}

export default ListItem;