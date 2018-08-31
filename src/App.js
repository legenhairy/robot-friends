import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry';

import { setSearchField } from './actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	  onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}	
}

class App extends Component {
    constructor() {
    	super()
    	this.state = {
    	  robots: []
	    }
	}		
	

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		   .then(response => response.json())
  		   .then(users => this.setState({robots: users}));
	}
	
	render() {
		const { robots } = this.state;
		const { searchField, onSearchChange } = this.props;
		const filteredRobots = robots.filter(robots =>{
			return robots.name.toLowerCase().includes(searchField.toLowerCase());
		})
		if (this.state.robots.length === 0) { //if no robots are passed in 
			return <h1>Loading</h1>
		} else {
		  return (
		    <div className = "tc"> 
			   <h1>RoboFriends</h1>	
			   <SearchBox searchChange={onSearchChange} />
			   <Scroll>
			     <ErrorBoundry>	
			       <CardList robots={filteredRobots} />
		       	 </ErrorBoundry>
		       </Scroll>	  
		    </div>	
		);    
		
	  }
	
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);