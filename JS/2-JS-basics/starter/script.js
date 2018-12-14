/*
    /*********************
    *Variable and Datatypes
    *********************
    var firstName = 'Aman';
    var lastName = 'Thakur'
    var age = 28.90;
    var adult = true;
    var job;

    console.log(job);

    // var 3years = 3; error
    // var if = 23;

    /*********************
    * Variable mutation and type coercion
    /*********************

    // Type coercion
    console.log(firstName+" "+lastName+" "+age+" "+adult);

    // Variable mutation
    age = 'twenty eight';
    job = 'driver';

    alert(firstName+' is a'+ age + ' '+ job);

    // Asking questions 
    lastName = prompt('What is your last name ?');
    console.log(firstName+' '+lastName);

*/

/***********
*Basic Math Operators
************

var year, frist, second, third;
year = 2020;
first = year-15;
second = year-200;
var bool = true;
console.log((first*second)+" "+(first+second)+" "+(first/second));

// Logical Operators
var isFirstOlderThanSecond = first >second;
console.log(isFirstOlderThanSecond);

// typeof operator
console.log(typeof year+" "+typeof bool+" "+typeof 'Aman Singh Thakur'+" "+typeof third);

*/

/*****************
Operator Precedence
******************

var now = 2018;
var yearAman = 1996;
var fullAge = 18;

var isFullAge = now - yearAman >= fullAge;
console.log(isFullAge);

// grouping
var avg = (yearAman+now)/2;

//multiple assignments 
var x, y;
x=y=(3+5)*4-6;
// * and / has left to right associativity 
// = has right to left associativity

console.log(x,y);
x*=2;
x++;
*/

/*********************
if else statement
*********************
var firstName = 'John'

var civilStatus = 'single'
if (civilStatus === 'single')
    console.log(firstName+' is single')
else
    console.log(firstName+' is married')

var isMarried = false;

if (!isMarried)
    console.log(firstName+' is single')
else
    console.log(firstName+' is married')
    */


/**********************
Boolean logic
**********************

var firstName = 'John';
var age =16;
if(age <13)
    console.log(firstName+ ' is a boy.')
else if(age >=13 && age <=20)
    console.log(firstName+' is a man');
else
    console.log(firstName+' is an old man');
    */


/************************
* Truthy and False values and equality operators


// falsy values : undefined, null, 0, '', NaN
// truthy values : NOT falsy values

var height=23;
if(height || height === 0)
    console.log('Varaible is defined');
else
    console.log('Variable has not been defined');

// Equality Operator

if(height=='23')
    console.log('The == operator does type coercion!');

if(height==='23')
    console.log('The == operator does type coercion!');

*/

/*****************************
Functions
*****************************

function calculateAge(birthyear){
    return 2018-birthyear
}

console.log(calculateAge(1996));

function yearsUntilRetirement(year, firstName){
    var age = calculateAge(year);
    var retirement = 65-age;
    console.log(firstName+ ' retires in ' + retirement+' years.');
}

yearsUntilRetirement(1990, 'John');
*/

/*******************************
Function statements and expressions
******************************

// Function declaration
// function whatDoYouDo(job, firstName){}
// function expression

var whatDoYouDo = function(job, firstName){
    switch(job){
        case 'teacher' : return firstName+' teaches kids how to code.'
        case 'driver' : return firstName+' drives safely'
        case 'designer' : return firstName+' drives safely'
        default:
            return 'Something is wrong'
    }
}

var str = whatDoYouDo('teacher','John');
console.log(str);
*/

/*******************************
Arrays
******************************

// Initializw new array
var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);

console.log(names[2]);
console.log(names.length);

// Mutate array data
names[1] = 'Ben';
names[names.length] = 'Mary';
console.log(names);

//Different data types
var john = ['John', 'Smith', 1990, 'teacher',false];
john.push('blue');
john.unshift('Mr.');

console.log(john);
john.pop()
console.log(john);
john.shift();
console.log(john);

console.log(john.indexOf(1990));

john.indexOf('designer')  === -1 ? console.log('Not a designer') : console.log('is a designer')
*/

/*******************************
Objects and properties
********************************

// Object literal
var john = {
    firstName : 'John',
    lastName : 'Smith',
    job : 'teacher',
    year : 1990,
    married : false
}

// Mutate
john.job = 'designer';
var x = 'job';
console.log(john, john.firstName, john['lastName'], john[x]);

// new keyword
var jane = new Object();
jane.name = 'Jane';
jane.birthyear = 1969;
jane['lastname'] = 'Smith';
console.log(jane);
*/

/*******************************
Objects and method
********************************

var john = {
    firstName : 'John',
    lastName : 'Smith',
    job : 'teacher',
    year : 1990,
    married : false,
    calcAge : function(){
        this.age = 2018- this.year;
    }
};

john.calcAge();
console.log(john.age);
*/

/*******************************
Loops and iterations
********************************
var names = ['John', 'Mark', 'Jane', 1990, false, 'Aman'];
for(var i=0; i<names.length; i++){
    if(typeof names[i] !== 'string')
        continue; //similar to use break;
    console.log(names[i]);
}

//var i=0
//while (i<names.length){
//    console.log(names[i]);
//    i++;
//}
*/

















