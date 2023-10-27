let login  = document.getElementById('login');
login.addEventListener("submit",(e)=>{
    e.preventDefault();
    let user = JSON.parse(localStorage.users);
    let username = document.getElementById("username");
    let pass = document.getElementById("password");
    for(let index = 0; index<user.length; index++){
        if (username.value.trim()==user[index].username && pass.value.trim()==user[index].pass){
            window.location.href = "../Home/index.html"
        }
        
        
        
    }
})