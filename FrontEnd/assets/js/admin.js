let token = localStorage.getItem('token')
let adminBar = document.getElementById('admin-bar')

if (token) {
    adminBar.innerHTML = `<i></i><p>Bar Admin</p>`
}