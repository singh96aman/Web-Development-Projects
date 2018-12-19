// Each is a different module
/**********************************/
var budgetController = (function (){
  
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0)
            this.percentage = Math.round((this.value/totalIncome)*100)
        else
            this.percentage=-1
    }
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
    
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function (type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum + cur.value;
        })
        data.totals[type] = sum;
    };
    
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
    };
    
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
        
        calculatePercentages : function(){
              data.allItems.exp.forEach(function(cur){
                  cur.calcPercentage(data.totals.inc)
              });
        },
        
        getPercentages : function(){
            var allPercentage = data.allItems.exp.map(function(cur){
               return cur.getPercentage(); 
            });
            return allPercentage;
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
        container : '.container',
        expensesPercentageLabel : '.item__percentage',
        dateLabel : '.budget__title--month'      
    }
    var formatNumber = function(num, type){
          
            var num, numSplit, int, dec, type;
            num = Math.abs(num);
            num = num.toFixed(2);
            numSplit = num.split('.');
            int = numSplit[0];
            
            if(int.length>3){
                int=int.substr(0, int.length-3)+','+int.substr(int.length-3, int.length);
            }
            
            dec = numSplit[1];
               
            return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.'+ dec; 
            
        };
    
    var nodeListForEach = function (list, callback) {
        for(var i=0; i<list.length; i++){
             callback(list[i], i);
        }
    };
            
    
    return{
        getInput : function(){
            
            return {
                type : document.querySelector(DOMstrings.inputType).value , // inc or exp
                description : document.querySelector(DOMstrings.description).value,
                value : parseFloat(document.querySelector(DOMstrings.value).value)
            }
        },
        
        displayPercentages: function(percentages){
              
            
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
            console.log(fields)
            
        
            nodeListForEach(fields, function(current, index){
                if(percentages[index]>0)
                    current.textContent = percentages[index] + '%';
                else
                    current.textContent = '--';
                
            })    
        },
        
        displayMonth : function(){
            var now, year, month;
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] +' '+year;     
        },
        
        changedType : function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType +',' +DOMstrings.description+','+DOMstrings.value
            );
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        
        displayBudget : function (obj){
            
            var type;
            obj.budget >0 ? type = 'inc' : type = 'exp';
             document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);    document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;  document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            
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
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'
            }else if(type=='exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', formatNumber(obj.value,type))
            
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
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
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
    
    var updatePercentages = function(){
      
        //1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        //2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        //3 . Update the UI with new percentages
        UICtrl.displayPercentages(percentages);
        
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
            
            //6. Calculate and update percentages
            updatePercentages();
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
            UICtrl.displayMonth();
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