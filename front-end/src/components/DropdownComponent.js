import React, { Component } from 'react';
import { getFifteen } from '../util/GetFirstFifteen';
import { getUserInput } from '../util/GetUserInput';

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
      isInputEmpty: true,
      title: this.props.title,
      input: ''
    }
  }

  handleClickOutside(e) {
    this.setState({
      isListOpen: false
    })
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value,
      isInputEmpty: false
    })


  }

  selectItem = ( title, id, stateKey ) => {
    this.setState({
      title: title,
      isListOpen: false
    })
  }

  toggleList = () => {
    this.setState(prevState => ({
      isListOpen: !prevState.isListOpen
    }))
  }
  render() {

    const { list } = this.props;

    const listOfFifteen = getFifteen(list);



    const { isListOpen, title, isInputEmpty, input } = this.state;

    if(input.length >= 1) {
      console.log('Inputh length is greater >= 1')
      let filterInput = getUserInput(list);
    }

    return (
      <div className="outer-wrapper">
        <div className="heading" onClick={this.toggleList}>
          <div className="heading-title">
            <input type="text" placeholder={title} onChange={this.handleInputChange.bind(this)}/>
          </div>
          { isListOpen ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i> }
        </div>
          { isListOpen && <ul>
            { isInputEmpty === true || this.state.input === '' ? listOfFifteen.map((item, i) => (<li key={i} className={item.level}>{item.name}</li>)) : <li> otherwise we will filter thru all the items </li> }
            </ul>
          }
      </div>
    )
  }
}
export default Dropdown;
