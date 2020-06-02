/*
	cs-142-template-processor.js
	1 June 2020
	Anthony Bugatto
*/

'use strict';

/*
	cs142template-processor class
	@param {string}: template
	@constructor
*/
function Cs142TemplateProcessor(template) {
	//prevent polluting of global namespace
	if(!(this instanceof Cs142TemplateProcessor)) { //if new not used (global)
		return new Cs142TemplateProcessor(template); //recurse with local object
	}

	this.template = template;
} 

/*
	cs142template-processor class
	@param {object}: dictionary containing property names and values
	@return {string}: template
*/
Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
	var template = this.template;

	//Use regex to find {{string}} in template
	let props = template.match(/{{([^{}]*)}}/g);

	//Substitute properties from dictionary
	var propName;
	for(let i = 0; i < props.length; i++) {
		//extract property name from props {{string}}->string
		propName = props[i].slice(2,-2); //first two to last two

		//substitute if in dictionary
		if(propName in dictionary) {
			template = template.replace(props[i], dictionary[propName]);
		} else {
			template = template.replace(props[i], '');
		}
	}

	return template;
};