function formSubmit(f){
    var password = document.getElementById('exampleInputPassword1');
    if(password.value==="altafalam"){
        return true;
    }
    else{
        document.getElementById("invalidPassword").innerHTML="Incorrect credentials";
        return false;
    }
}
