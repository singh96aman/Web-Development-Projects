/*******************
*Function constructor
********************

var john = {
    name : 'John',
    yearOfBirth : 1990,
    job : 'teacher'
};

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // Not using inheritance
    //this.calculateAge = function(){
    //    console.log(2016-this.yearOfBirth);
    //}
}

Person.prototype.calculateAge = function(){
    console.log(2016-this.yearOfBirth);
}

// First empty object is created and then Person constructor runs 
var john = new Person('John', 1990, 'teacher');
var mark = new Person('Mark', 1988, 'thief');
var steve = new Person('Steve', 2006, 'doctor');

john.calculateAge()
mark.calculateAge()
steve.calculateAge()
*/


/**********************
Objects creation
***********************

var personProto = {
    calculateAge : function(){
        console.log(2018-this.yearOfBirth);
    }
}

//var john = Object.create(personProto);
//john.name = 'John'
//john.yearOfBirth = 1990;
//john.job = 'teacher';

//console.log(john);

var jane = Object.create(personProto, {
    name : { value : 'Jane' },
    yearOfBirth : { value : 1990 },
    job : { value : 'designer' }
});

console.log(jane);
*/

/************************
Primitives vs Objects
************************

// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a,b);

//Objects
var obj1 = {
    name : 'John',
    age : 26
};

var obj2 = obj1;
obj1.age = 36;
console.log(obj1, obj2);

//Functions
var age = 27;
var obj = {
    name : 'Jonas',
    city : 'Lisbon'
};

function change (a,b){
    a=30;
    b.city = 'Lucknow'
}

change(age, obj);
console.log(age, obj);
/*

/****************************
Passign functions as arguments
*****************************

var years = [1990, 1965, 1937, 2005, 1998]

function arrayCalc(arr, fn){
    var arrRes = []
    for (var i=0; i<arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function isFullAge(ele){
    return ele >=18;
}

function calculateAge(ele){
    return 2016 - ele;
}

function maxHeartRate(ele){
    if(ele >=18 && ele <=81)
        return Math.round(206.9 - (0.67*ele))
    else
        return -1
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages, rates);
*/

/**************************
Functions returning Functions
***************************

//functions are objects so we are only returning objects

function interviewQues(job){
    if(job === 'designer')
        return function(name){
            console.log(name + ' is a designer')
        }
    else 
        return function(name){
            console.log(name+ ' is a teacher')
        }
}

var job = interviewQues('designer')

job('aman');
*/

/***********************************
Immediately Invoked Function expressions (IIFE)
************************************

// Normal function
function game(){
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();

//IIFE
(function (){
    var score = Math.random() * 10;
    console.log(score >= 5);
})();
(function (temp){
    var score = Math.random() * 10;
    console.log(score >= 5-temp);
})(10);
*/

/***********************************
Closure
************************************

function retirement (retirementAge){
    var a  = ' years left until retirement'
    return function(yearOfBirth){
        var age = 2016 - yearOfBirth;
        console.log((retirementAge-age) + a)
    }
}

var retirementUS = retirement(66)
retirementUS(1990)

retirement(66)(1990)

function interviewQues(job){
    return function(name){
        console.log(name+' is a '+job)
    }
}

interviewQues('designer')('aman')
interviewQues('teacher')('sanjay')



// An inner function has always access to the variable and parameters of its outer function, even after the outer function has returned. This is known as Closure
*/

/********************
Bind, Call and Apply
********************

var john = {
    name : 'John',
    age : 28,
    job : 'teacher',
    presentation : function(style, time){
            console.log(this.name+' who is '+this.age+' years old and is '+this.job+' is '+style+' in style and its '+time)
    }
}

john.presentation('formal','morning')

var emily = {
    name : 'Aman',
    age : 22,
    job : 'student'
}

john.presentation.call(emily, 'friendly', 'evening') // METHOD BORROWING

var johnFriendly = john.presentation.bind(john, 'friendly')

johnFriendly('night')

var years = [1990, 1965, 1937, 2005, 1998]

function arrayCalc(arr, fn){
    var arrRes = []
    for (var i=0; i<arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function isFullAge(limit, ele){
    return ele >=limit;
}

function calculateAge(ele){
    return 2016 - ele;
}

var ages = arrayCalc(years, calculateAge);
var fulljapan = arrayCalc(ages, isFullAge.bind(this, 20));

// Bind allows us to preset the arguments

console.log(ages);
console.log(fulljapan);

*/
