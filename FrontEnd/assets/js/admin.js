let token = localStorage.getItem('token')
let adminBar = document.getElementById('admin-bar')
let modal = null
let portfolio = document.getElementById('portfolio')

if (token) {
    adminBar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="p-mode-edition">Mode edition</p>`
    portfolio.innerHTML = `<p class="projets-mode-edition">Mes projets</p><i class="fa-regular fa-pen-to-square"></i><a href="#modal" class="p-mode-edition">modifier</a>`
}


const modeEdition = function(e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('js-modal-stop').addEventListener('click', stopPropagation)
}

document.querySelector('.p-mode-edition').addEventListener('click', modeEdition)

// modeEdition()

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('admin-bar').forEach(a => {
    a.addEventListener('click', modeEdition)
        
})

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

// let modal = document.getElementById('modal')

// modeEdition.addEventListener('click', function(event) {
//     event.preventDefault();
//     modal.setAttribute('aria-hidden', 'false')
//     showModeEdition()
// }) 

// function showModeEdition() {
    
// }

