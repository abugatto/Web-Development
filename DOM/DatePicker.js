/*
	DatePicker.js
	2 June 2020
	Anthony Bugatto
*/

'use strict'; //use yo jshint

/*
	Datepicker class
*/
class DatePicker {
	/*
		Datepicker class constructor
		@param {string}: div attribute id
		@param {function}: callback
		@constructor
	*/
	constructor(id, callback) {
		if(!(this instanceof DatePicker)) {
			return new DatePicker(id, callback);
		}

		this.id = id;
		this.callback = callback;
	}

	/*
		render: create table and append it to DOM after id
		@param {object}: date
	*/
	render(date) {
		let parent = document.getElementById(this.id);
		parent.appendChild(this._newCalendar(date));
	}

	/*
		_newCalendar: internal function to render DOM calendar
		@param {object}: date
		@return {object}: table
	*/
	_newCalendar(date) {
		//Create table and add it to DOM
		let table = document.createElement("table");

		//Create table header
		let header = this._newCalendarHeader(table, date);

		//Append days of month
		let tempDay = new Date(date.getTime());
		tempDay.setDate(1);
		tempDay.setDate(1 - tempDay.getDay());

		let rowIdx = 2;
		while(true) {
			let weekRow = table.insertRow(rowIdx);
			rowIdx = rowIdx + 1;

			//Append rest of days in current week
			for(let i = 0; i < 7; i++) {
				let dayCell = weekRow.insertCell(i);
				dayCell.innerHTML = tempDay.getDate();

				//set attribute and event listener
				if(tempDay.getMonth() === date.getMonth()) {
					//if sat or sun set different color
					if(tempDay.getDay() === 0 || tempDay.getDay() === 6) {
						dayCell.style.color = '#8a8a8a'
					}

					//set listener for date click (need new object for callback input)
					dayCell.addEventListener("click", () => {
						this.callback(this.id, {
							month: tempDay.getMonth() + 1, //starts at 0
							day: tempDay.getDate(),
							year: tempDay.getFullYear()
						});
					});
				} else {
					dayCell.style.color = 'rgba(0, 0, 0, 0)';
				}

				//increment day
				tempDay.setDate(tempDay.getDate() + 1);
			}

			//break loop when new week is in different month
			if(tempDay.getMonth() !== date.getMonth()) {
				break;
			}
		}

		return table;
	}

	/*
		_newCalendar: internal function to render DOM calendar
		@param {object}: table
		@param {object}: date
		@return {object}: header
	*/
	_newCalendarHeader(table, date) {
		//create table header and append row for month navigation
		let header = table.createTHead();
		let navRow = header.insertRow(0);
		navRow.setAttribute("id", "Header");

		//append month and arrows to nav header
		let leftArrowCell = navRow.insertCell(0);
		leftArrowCell.innerHTML = "<";
		leftArrowCell.setAttribute("id", "LeftArrow");
		leftArrowCell.colSpan = "1";

		let months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
		let monthCell = navRow.insertCell(1);
		monthCell.innerHTML = months[date.getMonth()] + " " + date.getFullYear();
		monthCell.colSpan = "5";

		let rightArrowCell = navRow.insertCell(2);
		rightArrowCell.innerHTML = ">";
		rightArrowCell.setAttribute("id", "RightArrow");
		rightArrowCell.colSpan = "1";

		//Add event listeners for arrows
		leftArrowCell.addEventListener("click", () => {
			this._resetCalendar(table, date, -1);
		});

		rightArrowCell.addEventListener("click", () => {
			this._resetCalendar(table, date, 1);
		});

		//Append days of week to header
		let weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		let weekdayRow = header.insertRow(1); 
		for(let i = 0; i < 7; i++) {
			let cell = weekdayRow.insertCell(i);
			cell.setAttribute("id", "WeekdayRow");
			cell.innerHTML = weekdays[i];
		}

		return header;
	}

	/*
		_resetCalendar: internal function to reset calendar
		@param {object}: table
		@param {object}: date
	*/
	_resetCalendar(table, date, displacement) {
		table.remove();
		date.setMonth(date.getMonth() + displacement);
		console.log(date);
		this.render(date);
	}
};