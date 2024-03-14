// fetch('http://localhost:5678/api/users/login', { 
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // body: '{"commentaire": "Top produit !"}'
//     }); 


function login(){
    let email = document.forms["form"]["email"].value;
    let password = document.forms["form"]["password"].value;
    if (email == "admin@example.com" && password == "12345") {
        alert("Login Successful!");
    } else{
        alert("The email or password you entered is wrong!");
        return false;
    }
}  

fetch("https://example.com/profile", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch