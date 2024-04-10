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
const modalPartOne = document.querySelector('.part-one');
const modalPartTwo = document.querySelector('.part-two');


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

// function modalPartTwo(e) {
//     e.preventDefault()
//     const modalPartOne = document.querySelector('.part-one');
//     modalPartOne.classList.add('hidden');
//     const modalPartTwo = document.querySelector('.part-two');
//     modalPartTwo.classList.remove('hidden');
//     document.body.classList.toggle('modal-open')
//     console.log('modalOuvertPartTwo')
// }

if (token) {
    adminBar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="p-mode-edition">Mode edition</p>`
    galleryEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="gallery-mode-edition">modifier</p>`
    // portfolio.innerHTML = `<p class="projets-mode-edition">Mes projets</p><i class="fa-regular fa-pen-to-square"></i><p id="#modal" class="p-mode-edition">modifier</p>`
    // document.body.classList.add("logged-in")
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
        // modalPartTwo(event)
        modalPartOne.classList.toggle('hidden')
        modalPartTwo.classList.toggle('hidden')
    })
    modalClose.addEventListener('click', function(event) {
        modal.classList.toggle('hidden')
    })
    // modalClose.addEventListener('click', function(event) {
    //     modalPartTwo.classList.toggle('hidden')
    // })
    document.querySelector('.fa-arrow-left').addEventListener('click', function(event) {
        // modeEdition(event)
        modalPartOne.classList.toggle('hidden')
        modalPartTwo.classList.toggle('hidden')
    })
    // document.querySelector('#addPhotoButton2').addEventListener('click', function(event) {
    //     window.open('./assets/images', '_blank')
    //     addImages();
    // })
}



async function displayModalProjects() {
    modalGalleryPhoto.innerHTML = '';  // Curăță conținutul existent din containerul de proiecte
    await fetchProjects()
    for(let work of works) {
		console.log(work)
		let figure = document.createElement("figure")
		figure.setAttribute("data-category", work.categoryId)
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
        let icon = document.createElement("i")
        icon.classList.add('fa-solid','fa-trash-can')
        icon.addEventListener('click', function(event) {
            deleteProject(work.id)
        })
		figure.appendChild(imageElement)
        figure.appendChild(icon)
		modalGalleryPhoto.appendChild(figure)
	}	
}	
displayModalProjects()   



async function deleteProject(workId) {
    console.log(workId)
    try{
        await fetch(`http://localhost:5678/api/works/${workId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        const projectToDelete = document.querySelector(`.modal-gallery figure[data-category="${workId}"]`);
                        if (projectToDelete) {
                            projectToDelete.remove();
                            console.log("Item deleted")
                        }
                        displayModalProjects()
                    } else {
                        throw new Error("Unauthorized")
                    }
                })
                .catch((error) => {
                    console.error('Error in deleting project', error);
                });
    } catch (error) {
        console.error('Error in deleting project', error);
    }
}

function addImages() {
    const ImagesInFolder = window.open('./assets/images', '_blank')
    imagesInFolder.forEach(image => {
        image.addEventListener('click', function(event) {
            const title = image.title
            const categoryId = image.category.id
            document.querySelector('#uploadForm input[name="title"]').value = title;
            document.querySelector('#uploadForm select[name="category"]').value = categoryId;
        });
    });
}





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

async function selectCategory() {
    await fetchCategories()
    console.log(categories)
    let select = document.getElementById('select-category')
    for(let category of categories) {
        select.innerHTML += `<option value="${category.id}">${category.name}</option>`
    }
}
selectCategory()

// let modal = document.getElementById('modal')

// modeEdition.addEventListener('click', function(event) {
//     event.preventDefault();
//     modal.setAttribute('aria-hidden', 'false')
//     showModeEdition()
// }) 

// function showModeEdition() {
    
// }

