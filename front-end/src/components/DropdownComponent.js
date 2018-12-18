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
    console.log('Inside of handleInputChange')

    let getNewList = filterListFromInput(e.target.value, this.props.list)

    console.log('get newList from filterlist.js is: ',getNewList);

    // const sortedFiltered = createSorter(getNewList);
    // console.log('SOrted filtered is: ', sortedFiltered)



    this.setState({ input: e.target.value, filteredList: getNewList })

    // return filteredObjList
    // newList = newList.filter( function(item) {
    //   console.log(item.name)
    //   // return item.name.search(e.target.value !== -1)
    //   // return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    // });

    //Clear if the input is already in there - as a result of us clicking an item.
    // if(this.state.input.length > 0) {
    //   console.log('input length greater than 0')
    //   this.setState({ input: '', countyClick: '', isInputEmpty: true})
    // }
    // console.log(this.state.input)
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

    const { isListOpen, title, isInputEmpty, input, countyClick, wasCountyClicked, filteredList } = this.state;

    console.log(filteredList)

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
                filteredList.map((item, i) => (<li key={i} className={item.level}>{item.name}</li>))
            }
            </ul>
          }
      </div>
    )
  }
}
export default Dropdown;
