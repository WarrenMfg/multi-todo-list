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
            editMode={this.props.editMode}
            editListName={this.props.editListName}
            listNameOnChange={this.props.listNameOnChange}
            editListDescription={this.props.editListDescription}
            listDescriptionOnChange={this.props.listDescriptionOnChange}
            editList={this.props.editList}
            confirmListEdit={this.props.confirmListEdit}
            deleteList={this.props.deleteList}
            key={list._id}
          />)}
      </div>
    );
  }
}

export default AllLists;