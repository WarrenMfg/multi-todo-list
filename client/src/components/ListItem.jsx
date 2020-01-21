import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ListItem" id={this.props.item._id}>

        {this.props.itemEditMode === this.props.item._id ?
          <input
            type="text"
            value={this.props.editItemName}
            onChange={this.props.handleItemNameChange}
          /> :
          <p>{this.props.item.name}
            <i className="fas fa-pen-square" data-id={this.props.item._id}></i>
            <i className="fas fa-minus-square" data-id={this.props.item._id}></i>
          </p>
        }

        {this.props.itemEditMode === this.props.item._id ?
          <button
            onClick={this.props.handleConfirmItemEdit}
          >Confirm</button> :
          null
        }

      </div>
    );
  }
}

export default ListItem;