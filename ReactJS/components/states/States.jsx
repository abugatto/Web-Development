import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    //console.log('window.cs142models.statesModel()', window.cs142models.statesModel());

    //keeps track of us states and search string
    this.state = {
      states: window.cs142models.statesModel().sort(), //sort alphabetically
      searchString: ''
    };

    //handles event due to ReactJS calling durectly from DOM
    this.handleSearchBound = event => this.handleSearch(event);
  }

  //handle change in search input field
  handleSearch(event) {
    this.setState({ searchString: event.target.value });
  }

  //create states list and filter
  filterStates(searchString) {
    //Create react list
    const statesList = [];
    for(let i = 0; i < this.state.states.length; i++) {
      //append if search is empty or substring is in list item
      const stateItem = this.state.states[i];
      //console.log('string "', searchString, '" is:', !searchString);
      //console.log('stateItem "', stateItem, '":', stateItem.search(searchString));
      if(!searchString || stateItem.toLowerCase().search(searchString.toLowerCase()) >= 0) {
        statesList.push( 
          (<div className="states-list-item"> {stateItem} </div>)
        );
      }
    }

    //If substring is in no elements of list
    //console.log(!statesList);
    //console.log(statesList);
    if(statesList.length === 0) {
      statesList.push(
        (<div className="states-list-item"> There are no matching states! </div>)
      );
    }

    //return HTML for list 
    return statesList;
  }

  render() {
    return (
      <div>
        <p className="states-searchbar">
          <label htmlFor="inputID"> Search US States </label>
          <input 
            id="inputID"
            type="text"
            value={this.state.searchString}
            onChange={this.handleSearchBound}
          />
        </p>

        <div className="states-list-display">
          <p className="states-list-header"> 
            <span> US States </span>
            { this.state.searchString && (
                <span> Containing "{this.state.searchString}" </span>
              )
            }
          </p>

          <div className="states-list">
            {this.filterStates(this.state.searchString)}
          </div>
        </div>
      </div>
    );
  }
}

export default States;
