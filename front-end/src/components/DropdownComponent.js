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
      input: '',
      countyClick: '',
      wasCountyClicked: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClearBtn = this.handleClearBtn.bind(this);
  }

  handleClickOutside(e) {
    this.setState({
      isListOpen: false
    })
  }

  handleClearBtn(e) {
    this.setState({
      input: '',
      isInputEmpty: true,
      countyClick: '',
      wasCountyClicked: false
    })
  }

  handleInputChange(e) {
    console.log('Inside of handleInputChange')
    // console.log(e.target.value)
    this.setState({ input: e.target.value })
    //Clear if the input is already in there - as a result of us clicking an item.
    // if(this.state.input.length > 0) {
    //   console.log('input length greater than 0')
    //   this.setState({ input: '', countyClick: '', isInputEmpty: true})
    // }
    console.log(this.state.input)
  }

  handleLiClick(e) {
    console.log('Inside of handleLiClick');
    let countyName = e.target.innerText;
    let classAttr = e.target.getAttribute('class');
    let idAttr = e.target.getAttribute('id');

    if(classAttr === 'county') {
      this.setState({
        countyClick: countyName,
        isInputEmpty: false,
        wasCountyClicked: true
      })

      const element = document.getElementById(idAttr);
      element.scrollIntoView({behavior: "smooth", block: "start"})
    }

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

    const { isListOpen, title, isInputEmpty, input, countyClick, wasCountyClicked } = this.state;

    // if(input.length >= 1) {
    //   console.log('Inputh length is greater >= 1')
    //   let filterInput = getUserInput(list);
    // }

    return (
      <div className="outer-wrapper">
        <div className="heading" onClick={this.toggleList}>
          <div className="heading-title">
            <input type="text" placeholder={title} value={ wasCountyClicked === true ? countyClick : input} onChange={this.handleInputChange}/>
            { input.length > 0 || wasCountyClicked ? <button onClick={this.handleClearBtn}>X</button> : <span></span> }
          </div>
          { isListOpen ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i> }
        </div>
          { isListOpen && <ul>
            { isInputEmpty === false || this.state.input === '' ?
                list.map((item, i) => (<li key={i} id={item.id} className={item.level} onClick={this.handleLiClick.bind(this)}>{item.name}</li>)) :
                <li> otherwise we will filter thru all the items </li>
            }
            </ul>
          }
      </div>
    )
  }
}
export default Dropdown;
