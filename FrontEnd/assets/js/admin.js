let token = localStorage.getItem('token')
let adminBar = document.getElementById('admin-bar')
let modal = null

if (token) {
    adminBar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="mode-edition">Mode edition</p>`
}

const modeEdition = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = none
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('admin-bar').forEach(a => {
    a.addEventListener('click', modeEdition)
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
        }
})

window.addEventListener('keydown', function(e) {

})

// let modal = document.getElementById('modal')

// modeEdition.addEventListener('click', function(event) {
//     event.preventDefault();
//     modal.setAttribute('aria-hidden', 'false')
//     showModeEdition()
// }) 

// function showModeEdition() {
    
// }

