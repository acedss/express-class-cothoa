function checkPass(){
    var pass = document.getElementById("password").value;
    var retype = document.getElementById("retype").value;
    var error = document.getElementById("retype_error");
    if (pass != retype){
        error.innerHTML = "Passwords do not match!";
        return false; // prevent form submission
    } else {
        error.innerHTML = "";
        return true; // allow form submission
    }
}