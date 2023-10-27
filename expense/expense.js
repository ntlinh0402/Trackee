var expensesAPI = 'http://localhost:3000/expenses'
var incomesAPI = 'http://localhost:3000/incomes'
function start(){
    // truyền các expenses, incomes đc render để get ra
    getExpenses(renderExpenses);
    handleCreateForm();
    getExpenses(totalExpenses)
    getIncomes(renderIncomes);
    handleCreateForm2();
    getIncomes(totalIncomes)
    moneyAvailable()
}
// Khởi tạo hàm start ngay sau khi bắt đầu load trang
start();
function getExpenses(callback){
    fetch(expensesAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}
////Quan trọng create api
/// Các method tương tác với API
function createExpense(data, callback){
    var options={
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(data)
        

    }
    console.log(JSON.stringify(data));
    fetch(expensesAPI,options)
        .then(function(response){
            response.json()
        })
        .then(callback);

}
function handleDeleteExpense(id){
    var options={
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    };
    // trỏ vào id delete
    fetch(expensesAPI + '/'+ id , options)
        .then(function(response){
            response.json()
        })
        .then(function(){
            var expenseItem=document.querySelector('.expense-item-'+id);
            if(expenseItem){
                expenseItem.remove();
            }
        }); 
}
function renderExpenses(expenses){
    var listExpensesBlock = document.querySelector('#list-expenses');
    var htmls= expenses.map(function(expense){
        return `
        <li class="expense-item-${expense.id}">
        <h4>${expense.date}</h4>
        <h4>${expense.description}</h4>
        <h4 id="expense_list_cost">${expense.cost}</h4>
        <button class="deleteBtn" onclick="handleDeleteExpense(${expense.id})"><i class="far fa-trash-alt" ></i></button>
        
        </li>
        `;
    });
    listExpensesBlock.innerHTML = htmls.join('')


}
function handleCreateForm(){
    var createExpenseBtn =document.querySelector('#createExpenses')
    createExpenseBtn.onclick = function(){
        var date = document.getElementById('date').value;
        var description = document.querySelector('input[name="description"]').value;
        var cost = document.querySelector('input[name="cost"]').value;
        var formData = {
            date:date,
            description:description,
            cost:cost


        }
        createExpense(formData, function(){
            getExpenses(renderExpenses);
        });
    }
}




function totalExpenses(expenses){
 
    var htmls= expenses.map(function(expense){
        return Number(expense.cost );
        
    })
    
    const totalSpent = htmls.reduce((total, currentNum) => total + currentNum)

document.getElementById('spent__symbol').innerHTML=totalSpent
localStorage.setItem('totalSpent', totalSpent)
}

localStorage.setItem('totalSpent', totalSpent)
console.log(totalSpent)


function moneySpent(){
    
    var earn = localStorage.getItem("totalEarned")
    console.log(earn)
    //try
    
}



///INCOME
function getIncomes(callback){
    fetch(incomesAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}
////Quan trọng create api
function createIncome(data, callback){
    var options={
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(data)
        

    }
    console.log(JSON.stringify(data));
    fetch(incomesAPI,options)
        .then(function(response){
            response.json()
        })
        .then(callback);

}
function handleDeleteIncome(id){
    var options={
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    };
    fetch(incomesAPI + '/'+ id , options)
        .then(function(response){
            response.json()
        })
        .then(function(){
            var incomeItem=document.querySelector('.income-item-'+id);
            if(incomeItem){
                incomeItem.remove();
            }
        }); 
}
function renderIncomes(incomes){
    var listIncomesBlock = document.querySelector('#list-incomes');
    var htmls= incomes.map(function(income){
        return `
        <li class="income-item-${income.id}">
        <h4>${income.date}</h4>
        <h4>${income.description}</h4>
        <h4 id="income_list_cost">${income.cost}</h4>
        <button class="deleteBtn" onclick="handleDeleteIncome(${income.id})"><i class="far fa-trash-alt" ></i></button>
        
        </li>
        `;
    });
    listIncomesBlock.innerHTML = htmls.join('')


}
function handleCreateForm2(){
    var createIncomeBtn =document.querySelector('#createIncomes')
    createIncomeBtn.onclick = function(){
        var date = document.getElementById('date').value;
        var description = document.querySelector('input[name="description"]').value;
        var cost = document.querySelector('input[name="cost"]').value;
        var formData = {
            date:date,
            description:description,
            cost:cost


        }
        createIncome(formData, function(){
            getIncomes(renderIncomes);
        });
    }
}




function totalIncomes(incomes){
 
    var htmls= incomes.map(function(income){
        return Number(income.cost );
        
    })
    
    const totalEarned = htmls.reduce((total, currentNum) => total + currentNum)
 
document.getElementById('earned__symbol').innerHTML=totalEarned
localStorage.setItem('totalEarned', totalEarned)
    
}





function moneyAvailable(){
 var earned =localStorage.getItem("totalEarned")
 console.log(earned)
 var spent =localStorage.getItem("totalSpent")
 console.log(spent)
 var moneyAvailable = earned - spent
 console.log(moneyAvailable)
 document.getElementById('amount__available').innerHTML=moneyAvailable
localStorage.setItem('amount__available', moneyAvailable)
}




