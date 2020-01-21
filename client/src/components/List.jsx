import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      // notes: '',
      listEditMode: false,
      itemEditMode: false,
      editItemName: '' //,
      // editItemNotes: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleConfirmListEdit = this.handleConfirmListEdit.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    // this.handleItemNotesChange = this.handleItemNotesChange.bind(this);
    this.handleConfirmItemEdit = this.handleConfirmItemEdit.bind(this);
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:4321/item/many/${this.props.list._id}`)
      .then(data => data.json())
      .then(data => this.setState({items: data}))
      .catch(err => console.log('error at List.jsx componentDidMount', err));
  }

  addItem() {
    fetch(`http://127.0.0.1:4321/item/one/${this.props.list._id}`,
    {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": this.state.name,
        // "notes": this.state.notes,
        "list": this.props.list._id})
    })
      .then(data => data.json())
      .then(data => {
        this.setState(prevState => {
          prevState.items.push(data);
          return {items: prevState.items, name: '' /*, notes: ''*/};
        })
      })
      .catch(err => console.log('error at List.jsx addItem', err));
  }

  deleteItem(id) {
    fetch(`http://127.0.0.1:4321/item/one/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'}
    })
      .then(data => data.json())
      .then(data => this.setState(prevState => {
        let filtered = prevState.items.filter(el => el._id !== data._id);
        return {items: filtered};
      }))
      .catch(err => console.log('error at List.jsx deleteItem', err));
  }

  handleInputChange(e) {
    this.setState({name: e.target.value});
  }

  // handleTextareaChange(e) {
  //   this.setState({notes: e.target.value});
  // }

  handleEnter(e) {
    if (e.key === 'Enter' && this.state.name) {
      this.addItem();
    }
  }

  handleClick(e) {
    if (e.target.tagName === 'BUTTON' && this.state.name) {
      this.addItem();
      e.target.blur();

    } else if (e.target.tagName === 'I') {

      if (e.target.parentElement.tagName === 'H3') {
        if (e.target.classList.contains('fa-minus-square')) { // if delete
          this.props.deleteList(this.props.list._id);
        } else if (e.target.classList.contains('fa-pen-square')) { // if edit
          if (!this.props.globalEditMode) { // if not in edit mode
            this.props.toggleGlobalEditMode();
            this.setState({listEditMode: true});
            this.props.editList(this.props.list._id);
          }
        }

      } else { // click is on todo item
        if (e.target.classList.contains('fa-minus-square')) {
          this.deleteItem(e.target.dataset.id);
        } else if (e.target.classList.contains('fa-pen-square')) {
          if (!this.props.globalEditMode) { // if not in edit mode
            this.props.toggleGlobalEditMode();
            let filtered = this.state.items.filter(el => el._id === e.target.dataset.id);
            this.setState({itemEditMode: e.target.dataset.id, editItemName: filtered[0].name /*, editItemNotes: filtered[0].notes*/ });
          }
        }
      }
    }
  }

  handleConfirmListEdit() {
    this.props.toggleGlobalEditMode();
    this.setState({listEditMode: false});
    this.props.updateList(this.props.list._id);
  }

  handleItemNameChange(e) {
    this.setState({editItemName: e.target.value});
  }

  // handleItemNotesChange(e) {
  //   this.setState({editItemNotes: e.target.value});
  // }

  handleConfirmItemEdit() {
    let id = this.state.itemEditMode;

    fetch(`http://127.0.0.1:4321/item/one/${id}`,
      {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "name": this.state.editItemName //,
          /* "notes": this.state.editItemNotes*/ })
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState(prevState => {
          let i = prevState.items.findIndex(el => el._id === id);
          prevState.items.splice(i, 1, data);
          return {
            items: prevState.items,
            itemEditMode: false,
            editItemName: '' //,
            // editItemNotes: ''
          }
        });
      })
      .catch(err => console.log('error at List.jsx handleConfirmItemEdit', err));
  }




  render() {
    return (
      <div
        onClick={this.props.globalEditMode ? null : this.handleClick}
        className='List'
        id={this.props.list._id}
      >
        <div className="List-name-and-form">
          {this.state.listEditMode ?
            <input
              type="text"
              value={this.props.editListName}
              onChange={this.props.listNameOnChange}
            /> :
            <h3>{this.props.list.name}
              <i className="fas fa-pen-square"></i>
              <i className="fas fa-minus-square"></i>
            </h3>
            }

          {this.state.listEditMode ?
            <input
              value={this.props.editListDescription}
              onChange={this.props.listDescriptionOnChange}
            /> :
            <p>{this.props.list.description}</p>
          }

          {this.state.listEditMode ?
            <button
              onClick={this.handleConfirmListEdit}
            >Confirm</button> :
            null
          }
        </div>
        <div className="List-add-todo">
          <input
            type="text"
            placeholder="Todo"
            value={this.state.name}
            onChange={this.handleInputChange}
            onKeyPress={this.handleEnter}
            required
          />
          {/* <textarea
            placeholder="Notes"
            value={this.state.notes}
            onChange={this.handleTextareaChange}
          ></textarea> */}
          <button>Add</button>
        </div>


          {this.state.items.map(item =>
            <ListItem
              item={item}
              itemEditMode={this.state.itemEditMode}
              editItemName={this.state.editItemName}
              handleItemNameChange={this.handleItemNameChange}
              // editItemNotes={this.state.editItemNotes}
              // handleItemNotesChange={this.handleItemNotesChange}
              handleConfirmItemEdit={this.handleConfirmItemEdit}
              key={item._id}
            />
          )}
      </div>
    );
  }
}

export default List;