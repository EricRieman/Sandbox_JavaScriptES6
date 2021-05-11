// A place to learn the Javascript ES6 changes

import { PersonModule } from "./person"

// var -> function
// let -> block
// const -> block, cant change

// # Objects 

const person =
{
  name: 'Eric',
  walk: function () { },  // walk is a method of the person object
  talk() { },            // ES6 way to define a method

  logThis() {
    console.log(this);
  }
};

person.talk();
person['name'] = 'John'; // we can use [] to access properties/methods of objects

// # This keyword
// always returns reference to current object

person.logThis();

const logThis = person.logThis; // Not calling method, just getting reference to function
console.log(logThis);
logThis(); // undefined, the 'this' was not called in reference to an object, 
// it is called by the global object, which is the window object. 
// Becasue we are in a react environment, and we are using strict mode 
// by default, to prevent problems.

// # Binding this
// binding ensures the this always returns a reference to an object
// in javascript, functions are objects with methonds, like bind()

const bindedLogThis = person.logThis.bind(person);
bindedLogThis(); // now we are binded to a reference of the person object, so 'this'
// returns a reference to that object, instead of undefined

// # Arrow functions
// The 3 square functions below are equivalent
const square1 = function (number) //old way
{
  return number * number;
}

const square2 = (number) => // arrow function, if no parameters, dont need ()
{
  return number * number;
}

const square3 = (number) => number * number; // because we return single line, we can shorten more

console.log(square1(5));
console.log(square2(5));
console.log(square3(5));

const jobs =
  [
    { id: 1, isActive: true },
    { id: 1, isActive: true },
    { id: 1, isActive: false }
  ];

const activeJobs1 = jobs.filter(function (job) { return job.isActive; });
const activeJobs2 = jobs.filter(job => job.isActive);

console.log(activeJobs1);
console.log(activeJobs2);

// # Arrow functions and this
// arrow functions dont re-bind this

const person2 = 
{
  talk()
  {
    console.log( "this", this );
  },

  talk2()
  {
    setTimeout( function() {console.log("this", this ); }, 1000 ); // a call back function that
  },

  talk3()
  {
    var self = this;
    setTimeout( function() {console.log("self", self ); }, 1000 ); // a call back function that
  },

  talk4()
  {
    setTimeout( () => {console.log("this", this ); }, 1000 ); 
  }
};

person2.talk(); // this references parent object, person2
person2.talk2(); // the callback method's this references the window oject, not protected by react's strict mode

// one way we can solve is by creating a self variable:
person2.talk3(); // now we have a reference to the parent oject.

// Or, we can use arrow functions (way better!) becasue the arrow function does not re-bind this
person2.talk4();

// # Array map
const colors = ['red', 'green', 'blue' ];
const items1 = colors.map( function(color) // the callback function can be converted to an arrow function
{
  return '<li>' + color + '</li>';
});
console.log( items1 );

const items2 = colors.map( color =>'<li>' + color + '</li>' ); // we can simplify the concatination using template literals
console.log( items2 );

const items3 = colors.map( color => `<li>{color}</li>` ); // a template literal uses back tick, ``
console.log( items3 );

// # object destructuring
const address =
{
  street: '',
  city: '',
  country: ''
};

const street1 = address.street
const city1 = address.city;
const country1 = address.country;

// below does the same thing as the three lines above, but the variables need to be the same name
const { street, city, country } = address;

// We can define an alias, using
const { street: st } = address;

// # Spread operator
const first = [1,2,3];
const second = [4.5,6];

const copied = [...first]; // this is a spread operator, it returns all values in the array, and puts them into our new array

const combined1 = first.conat( second ); // old way of concatinating arrays
const combined2 = [...first, ...second ]; // new way, using spread operator
const combined3 = [...first, 'a', ...second, 'b' ]; // can also be used to simply emplace new elements when concatting

// we can also apply the spread operators to objects
const one = {name: 'eric' };
const two = {jon: 'developer' };

const comboObj = {...one, ...two, location: 'USA' };
console.log( comboObj );

// # Classes

class Person
{
  constructor(name) // the constructor of the class, 
  {
    this.name = name; // notice, we dont need to define a variable, this does it
  }

  walk() {} 
}

const person3 = new Person( 'eric' );
console.log( person3.name );

// # Inheritance

class Teacher extends Person // Teacher is a child of person
{
  constructor( name, degree )
  {
    super( name ); // calls the parent class constructor
    this.degree = degree;
  }
  teach() {}
}

const teacher = new Teacher('eric', 'test');
console.log( teacher );

// # Module
// we can split code across multiple files, and call each file a module

const personMod = new PersonModule( "eric" ); //module included at beginning of file. 
personMod.talk();

// # Named and default exports

// We can define and export more then one class in a module
// we can also export functions 
// a default export is typically used when there is only one class that needs exported from a file
// use the 'default' keyword

// for a named module:   import {...} from ''
// for a default module: import  ... from ''
// we do not need {} wehn there is a default

// a module can have both a default export and named exports
// for default and named: import ..., {..} from ''