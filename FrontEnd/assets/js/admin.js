let token = localStorage.getItem('token')
let adminBar = document.getElementById('admin-bar')
let modal = document.getElementById('modal')
let galleryEdit = document.getElementById('gallery-edit')
let logoutLink = document.getElementById('logout-link')
let modalClose = document.querySelector('.js-modal-close')
//c'est au mauvais endroit. Tu récupérais le titre et non la galerie
// const modalGalleryPhoto = document.getElementById("title-modal")
//il faut le mettre dans la galerie en récupérant la classe que tu as mise. En récupérant par la classe, tu auras un tableau. Il faut donc aller chercher le premier élément
const modalGalleryPhoto = document.getElementsByClassName("modal-gallery")[0]


function modeEdition(e) {
    e.preventDefault()
    modal.classList.toggle('hidden')
    document.body.classList.toggle('modal-open')
    console.log('modalOuvert')
    // const target = document.querySelector(e.target.getAttribute('href'))
    // target.style.display = null
    // target.removeAttribute('aria-hidden')
    // target.setAttribute('aria-modal', 'true')
    // modal = target
    // modal.addEventListener('click', closeModal)
    // modal.querySelector('js-modal-close').addEventListener('click', closeModal)
    // modal.querySelector('js-modal-stop').addEventListener('click', stopPropagation)
}

function modalPartTwo(e) {
    e.preventDefault()
    const modalPartOne = document.querySelector('.part-one');
    modalPartOne.classList.add('hidden');
    const modalPartTwo = document.querySelector('.part-two');
    modalPartTwo.classList.remove('hidden');
    document.body.classList.toggle('modal-open')
    console.log('modalOuvertPartTwo')
}

if (token) {
    adminBar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="p-mode-edition">Mode edition</p>`
    galleryEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="gallery-mode-edition">modifier</p>`
    // portfolio.innerHTML = `<p class="projets-mode-edition">Mes projets</p><i class="fa-regular fa-pen-to-square"></i><p id="#modal" class="p-mode-edition">modifier</p>`
    logoutLink.innerHTML = `<a href="#" id="logout">logout</a>`
    let logout = document.getElementById('logout')
    logout.addEventListener('click', function(event) {
        localStorage.removeItem('token')
        window.location.reload()
    })
    filters.style.display = 'none'
    //il vaut mieux le faire sur "gallery-adit" pour rendre l'ensemble cliquable
    document.querySelector('#gallery-edit').addEventListener('click', function(event) {
        modeEdition(event)
    })
    // document.querySelector('.gallery-mode-edition').addEventListener('click', function(event) {
    //     modeEdition(event)
    // })
    document.querySelector('#addPhotoButton').addEventListener('click', function(event) {
        modalPartTwo(event)
    })
    modalClose.addEventListener('click', function(event) {
        modal.classList.toggle('hidden')
    })
    modalClose.addEventListener('click', function(event) {
        modalPartTwo.classList.toggle('hidden')
    })
    document.querySelector('.fa-arrow-left').addEventListener('click', function(event) {
        modeEdition(event)
    })
}

async function displayModalProjects() {
    await fetchProjects()
    for(let work of works) {
		console.log(work)
		let figure = document.createElement("figure")
		figure.setAttribute("data-category", work.categoryId)
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		figure.appendChild(imageElement)
		modalGalleryPhoto.appendChild(figure)
        modalGalleryPhoto.classList.toggle('modal-gallery')
	}	
}	
displayModalProjects()   




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

