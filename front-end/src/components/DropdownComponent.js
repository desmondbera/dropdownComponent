import React, { Component } from 'react';
import { getFifteen } from '../util/GetFirstFifteen';
import { getUserInput } from '../util/GetUserInput';
import { filterListFromInput } from '../util/FilterList';
import { createSorter } from '../util/Sort';


class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isListOpen: false,
      isInputEmpty: true,
      title: this.props.title,
      input: '',
      countyClick: '',
      wasCountyClicked: false,
      filteredList: null
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
      wasCountyClicked: false,
      filteredList: null
    })
  }

  handleInputChange(e) {

    let getNewList = filterListFromInput(e.target.value, this.props.list)
    this.setState({
      input: e.target.value,
      filteredList: getNewList
    })
  }

  handleLiClick(e) {
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

    const { isListOpen, title, isInputEmpty, input, countyClick, wasCountyClicked, filteredList } = this.state;

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
                filteredList.map((item, i) => (<li key={i} className={item.level}>{item.name}</li>))
            }
            </ul>
          }
      </div>
    )
  }
}
export default Dropdown;
