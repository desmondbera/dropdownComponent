import React, { Component } from 'react';
import Dropdown from './components/DropdownComponent';
import { createSorter } from './util/Sort';

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    console.log('inside of compDidMount')
    this.fetchData();
  }

  fetchData() {
    console.log('Inside of fetchdata')
    fetch('https://api.myjson.com/bins/dbg52')
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }


  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
  }


  render() {

    const { data } = this.state;
    const sortedData = createSorter(data);

    return (
      <div className="App">
        <div className="wrapper">
          <Dropdown
            titleHelper="Location"
            title="Please select a county"
            list={sortedData}
            toggleItem={this.toggleSelected}
          />
        </div>
      </div>
    );
  }
}

export default App;
