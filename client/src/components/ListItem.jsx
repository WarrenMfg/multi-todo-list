import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id={this.props.item._id}>
        <p>{this.props.item.name}
          <span>{this.props.item.status}</span>
          <span>{this.props.item.due}</span>
          <i className="far fa-minus-square" data-id={this.props.item._id}></i>
        </p>
        <p>{this.props.item.notes}</p>
      </div>
    );
  }
}

export default ListItem;