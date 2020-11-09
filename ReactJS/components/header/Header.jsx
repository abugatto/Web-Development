import React from 'react';
import './Header.css';

/**
 * Define Header, a React componment of CS142 project #4 problem #3.
 */

 class Header extends React.Component {
    constructor(props) {
        super(props);

        //create state tuple 
        this.state = {
            buttonWasClicked: false,
            imageGraphic: './../../modelData/logo.jpg'
        };

        //Create bounded handlers
        this.handleButtonClickBound = event => this.handleButtonClick(event);
    }

    handleButtonClick(event) {
        event.preventDefault();
        
        this.setState({ buttonWasClicked: !this.state.buttonWasClicked });
        this.setState({ 
            imageGraphic: (this.state.buttonWasClicked ? './../../modelData/emergx.jpeg' : './../../modelData/logo.jpg') 
        });
    }

    render() {
        return (
            <div className="header-Container">
                <p className="header-title"> 
                    <input 
                        type="image" 
                        src={this.state.imageGraphic}
                        alt={this.state.buttonWasClicked ? "Wordmark" : "Logo"}
                        width={this.state.buttonWasClicked ? "100vw" : "400vw"} 
                        height={this.state.buttonWasClicked ? "100vw" : "100vw"} 
                    ></input>
                </p>
                <p className="header-title"> Property of Emergent AI </p>
                <span>
                    <button type="button" onClick={event => this.handleButtonClick(event)}>
                        {this.state.buttonWasClicked ? "Wordmark" : "Logo"}
                    </button>
                </span>
            </div>
        );
    }
 }

 export default Header;