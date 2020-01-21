import React from 'react';
import List from './List.jsx';

class AllLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AllLists">
        {this.props.lists.map(list =>
          <List
            toggleGlobalEditMode={this.props.toggleGlobalEditMode}
            globalEditMode={this.props.globalEditMode}
            list={list}
            editListName={this.props.editListName}
            listNameOnChange={this.props.listNameOnChange}
            editListDescription={this.props.editListDescription}
            listDescriptionOnChange={this.props.listDescriptionOnChange}
            editList={this.props.editList}
            updateList={this.props.updateList}
            deleteList={this.props.deleteList}
            key={list._id}
          />)}
      </div>
    );
  }
}

export default AllLists;