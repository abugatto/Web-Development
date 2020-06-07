/*
	TableTemplate.js
	5 June 2020
	Anthony Bugatto
*/

'use strict'; //use yo jshint

/*
	TableTemplate class
*/
class TableTemplate {
	/*
		TableTemplate static fillIn 
		@param {string}: attribute id
		@param {object}: dictionary
		@param {string}: column name
	*/
	static fillIn(id, dictionary, columnName) {
		//get DOM table
		let table = document.getElementById(id);
		let rows = table.rows;

		//Fill in Header
		let header = rows.item(0);
		let processor = new Cs142TemplateProcessor(header.innerHTML);
		header.innerHTML = processor.fillIn(dictionary);

		//Set column array if columnName is undefined
		let cols = [];
		if(columnName === undefined) {
			//create array of indices [1,2,3...] for cols
			cols = Array.from(Array(header.cells.length).keys());
		} else {
			//loop over cols to find columnName
			let colSet = false;
			for(let i = 0; i < header.cells.length; i++) {
				if(header.cells[i].textContent === columnName) {
					cols = [i];
					colSet = true;
				}
			}

			//set colIdx to all if not found
			if(!colSet) {
				cols = Array.from(Array(header.cells.length).keys());
			}
		}

		//Fill rows x cols
		for(let i = 1; i < rows.length; i++) {
			let row = rows[i];
			for(let j = 0; j < cols.length; j++) {
				let cell = row.cells[cols[j]];
				let processor = new Cs142TemplateProcessor(cell.textContent);
				cell.innerHTML = processor.fillIn(dictionary);
			}
		}

		//make table visible if invisible
		if(table.style.visibility === "hidden") {
			table.style.visibility = "visible";
		}
	}
};
