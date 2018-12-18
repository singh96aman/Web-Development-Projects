// Each is a different module
/**********************************/
var budgetController = (function (){
  
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var calculateTotal = function (type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value;
        })
        data.totals[type] = sum;
    }
    
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
    }
    
    return {
        addItem : function(type, des, val){
            var newItem, ID;
            
            //Create new id
            if(data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length -1].id + 1
            else
                ID = 0
            //Create new item
            if(type == 'exp')
                newItem = new Expense(ID, des, val);
            else if(type == 'inc'){
                newItem = new Income(ID, des, val);
            }
            //Add Item
            data.allItems[type].push(newItem);
            return newItem;
        },
        
        deleteItem : function(type, id){
            // id = 3
            var ids = data.allItems[type].map(function(current){
                return current.id;
            });
            
            index = ids.indexOf(id);
            
            if(index !== - 1){
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        calculateBudget : function(){
          
            // calculate total income and expenses
            
            calculateTotal('exp')
            calculateTotal('inc')
            
            // calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that me spent
            if(data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
            else
                data.percentage=-1;
            
        },
        
        getBudget : function (){
          return {
              budget : data.budget,
              totalInc : data.totals.inc,
              totalExp : data.totals.exp,
              percentage : data.percentage
          }  
        },
        
        testing : function(){
            console.log(data);
        }
        
    }
    
})();



/**********************************/
var UIController = (function (){
    
    var DOMstrings = {
        inputType : '.add__type',
        description : '.add__description',
        value : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expenseLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container : '.container'
    }
    
    return{
        getInput : function(){
            
            return {
                type : document.querySelector(DOMstrings.inputType).value , // inc or exp
                description : document.querySelector(DOMstrings.description).value,
                value : parseFloat(document.querySelector(DOMstrings.value).value)
            }
        },
        
        displayBudget : function (obj){
             document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;    document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;  document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            
            if(obj.percentage>0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';   
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '--'
            }
        },
        
        getDOMStrings : function (){
        return DOMstrings;
        },
        
        addListItem : function(obj, type){
            
            var html, newHtml, element;
            //Create HTML string with placeholder text
            if(type == 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'
            }else if(type=='exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)
            
            // Insert data into HTML
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
                
        },
        
        deleteListItem : function(selectorID){
           
           var ele = document.getElementById(selectorID); document.getElementById(selectorID).parentNode.removeChild(ele);
            
        },
        
        clearFields : function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.description + ', ' + DOMstrings.value)
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });
            fieldsArr[0].focus()
        }
    }
    
})()




// GLOBAL APP CONTROLLER
/**********************************/
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
         document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
            if(event.keyCode==13 || event.which == 13)
                ctrlAddItem()
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
    }
    
    var DOM = UICtrl.getDOMStrings();
    
    var updateBudget = function(){
        
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Update it
        UICtrl.displayBudget(budget);
        //console.log(budget);
        
    };
    
    var ctrlAddItem = function(){
        
        var input, newItem;
        
        //1. Get the field input data
        input = UICtrl.getInput();
        
        if(input.description != "" && !isNaN(input.value) && input.value >0){
            // 2. Add the item to the budget controller
            newItem =budgetCtrl.addItem(input.type, input.description, input.value)

            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            
            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update the budget   
            updateBudget();
        }
    };
    
    var ctrlDeleteItem = function(event){
        
        var itemId, splitId, type, ID;
        itemId=event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(itemId);
        
        if(itemId){
            //inc-1 or exp-1
            splitId = itemId.split('-')
            type = splitId[0];
            ID = parseInt(splitId[1]);
            console.log(type, ID)
            if(type=='income')
                type='inc'
            else
                type='exp'
            
            //1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID)
            
            //2. delete the item from the UI
            UICtrl.deleteListItem(itemId)
            
            //3. update and show the new budget
            updateBudget();
            
        }
    };
    
    return {
        init : function(){
            console.log('Applications has started !');
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
            })
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);

controller.init()