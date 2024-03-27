


// function login(){
//     let email = document.forms["form"]["email"].value;
//     let password = document.forms["form"]["password"].value;
//     if (email == "admin@example.com" && password == "12345") {
//         alert("Login Successful!");
//     } else{
//         alert("The email or password you entered is wrong!");
//         return false;
//     }
// }  

// fetch("https://example.com/profile", {
//       method: "POST", // or 'PUT'
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
// )}
//     https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
let form = document.querySelector('.login-form')
let email = document.getElementById('email')
let password = document.getElementById('password')
let errorMsgEmail = document.querySelector('.error-msg-email')
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
let authenticationError = document.querySelector('.authentication-error')
let errorMsgPassword = document.querySelector('.error-msg-password')
let passwordRegex = /^(?=.*[a-z0-9])(?=.*[A-Z0-9])(?=.*\d).{6,}$/

// let adminEmail = "admin@sophiebluel.com";
// let adminPassword = "adminpass";

// localStorage.setItem("email", "admin@sophiebluel.com")
// let adminEmail = localStorage.getItem("email")
// localStorage.setItem("password", "adminpass")
// let adminPassword = localStorage.getItem("adminpass")

function login(){
    form.addEventListener('submit', function(event) {
        console.log(form, email, password)
    event.preventDefault(); // Prevent form submission
    if (email.value === "") {
        // console.log('Le champ email est vide');
        // alert("Le champ email est vide");
        errorMsgEmail.innerText = "Le champ email ne doit pas etre vide"
    } else if (emailRegex.test(email.value)===false){
        errorMsgEmail.innerText = "L' email n'est pas valide"
    } 
    console.log(password)
    if (password.value === "") {
        // console.log('Le champ password est vide');
        // alert("Le champ password est vide");
        errorMsgPassword.innerText = "Le champ password ne doit pas etre vide"
    } else if (passwordRegex.test(password.value)===false) {
        errorMsgPassword.innerText = "Password n'est pas valide"
    } else {
        errorMsgPassword.innerText = ""; // Resetarea mesajului de eroare
    }
    
    
    if (email.value !== "" && password.value !== "") { 
        let data = {
            email: email.value,
            password: password.value
        }
        fetch('http://localhost:5678/api/users/login', { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then((response)=> {
            if (response.ok) {
                response.json()
                .then((datas)=> {
                    console.log(datas)
                    let token = datas.token
                    localStorage.setItem("token", token)
                    window.location.href = "index.html"
                })
            } else if (response.status === 404) {
                authenticationError.innerText = "User not Found" // to complete
            } else {
                authenticationError.innerText = "Authentication failed"
            
        }
            })
        .catch((error)=> console.log(error))
        // alert("Connected");
        // return true;  //sends the form if email and pass are correct
        // window.location.href = "index.html";  //create page admin.html?
        // return false; // Împiedică trimiterea formularului
    } 
    // else {
    //     alert ("User not found");
    //     return false;
    // }
});
}
login()
