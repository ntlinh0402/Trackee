let register = document.getElementById("register");
register.addEventListener("submit",(e)=>{
    e.preventDefault();
    /* alert("ok") */
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let pw = document.getElementById("password");
    console.log(username.value.trim() + " " + pw.value.trim())
    let number =/[0-9]/g;
    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter=/[A-Z]/g;
    if(email.value.trim().length==0){
        alert("Mời bạn nhập email")
    }
    else if(username.value.trim().length==0){
        alert("Mời bạn nhập usernam")
        
    }
    else if(pw.value.trim().length==0){
        alert("Mời bạn nhập password")
        
    }
    else if(pw.value.trim().length<6){
        alert("Mời bạn nhập mật khẩu 6 kí tự")
    }
    else if(!pw.value.trim().match(number)){
        alert("Mật khẩu cần có số");

    }
    else if(!pw.value.trim().match(lowerCaseLetter)){
        alert("Mật khẩu cần có chữ cái in thường");

    }
    else if(!pw.value.trim().match(upperCaseLetter)){
        alert("Mật khẩu cần có chữ cái in hoa");

    }
    else{
        if(localStorage.users){
            let user = JSON.parse(localStorage.users);
            user.push({
                username:username.value.trim(),
                pass: pw.value.trim()
            })
            localStorage.setItem('users',JSON.stringify(user))
        } else{
            localStorage.setItem("users",JSON.stringify([{
                username: username.value.trim(),
                pass:pw.value.trim()
            }]))
        }
        alert("Đăng kí thành công")
        document.location.replace("../login/login.html")
    }
})

