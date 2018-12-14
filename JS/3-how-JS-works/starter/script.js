///////////////////////////////////////
// Lecture: Hoisting
// Variable declaration and function declaration

/***Function hoisting***
function calculateAge(year){
    console.log(2016-year);
}

calculateAge(1990);

//retirement(1965); // This will not work

var retirement = function(year){
    console.log(65-(2016 - year));
}

//retirement(1965); //This will work

/***Variable hoisting***
console.log(age);
var age = 23;
console.log(age);
*/








///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/* VERYYYY IMPORTANT ************/
/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third() // it's possible to call function due to execution stack
                // But c and b are undefined because of scope chain
                // look at the fig in lecture
    }
}

function third() {
    var d = 'John';
    console.log(a+d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

// console.log(this);

calculateAge(1996);

function calculateAge(year){
    console.log(2018-year);
    console.log(this); // points to window object
}

var john = {
    name : 'John',
    yearOfBirth : 1990,
    calculateAge : function(){
        console.log(this); // Points to object
        console.log(2018 - this.yearOfBirth);
        function innerFunction(){
            console.log(this); // Points to Window !
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name : 'Mike',
    yearOfBirth : 1984,
}

//////// Method Borrowing ////////
mike.calculateAge = john.calculateAge;
//////////////////////////////////
mike.calculateAge();




































