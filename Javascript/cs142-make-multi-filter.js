/*
	cs-142-make-multi-filter.js
	1 June 2020
	Anthony Bugatto
*/

'use strict';

/*
	cs142MakeMultiFilter
	@param {array}: original array
	@return {function}: filtering function  
*/
function cs142MakeMultiFilter(originalArray) {
	//get reference of input array
	var currentArray = originalArray.slice(0); //use var so it can be used outside

	/*
		arrayFilterer
		@param {function}: filterCriteria function eg. x > 0
		@param {function}: callback function
		@return {function}: returns itsself (allows filter cascades)
	*/
	var arrayFilterer = function(filterCriteria, callback) {
		//return currentArray if filterCriteria not specified
		if(typeof filterCriteria !== 'function') {
			return currentArray;
		}

		//filter array using criteria function
		for(let i = 0; i < currentArray.length; i++) {
			if(!filterCriteria(currentArray[i])) {
				currentArray.splice(i,1); //delete 1 element at position i
				i--; //decrement i after removal of element
			}
		}

		//set this of callback to originalArray, pass current array as param
		if(typeof callback === 'function') {
			callback.apply(originalArray, [currentArray]);
		}

		return arrayFilterer;
	};

	return arrayFilterer;
}