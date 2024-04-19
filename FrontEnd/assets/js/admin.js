let token = localStorage.getItem('token')
let adminBar = document.getElementById('admin-bar')
let modal = document.getElementById('modal')
let galleryEdit = document.getElementById('gallery-edit')
let logoutLink = document.getElementById('logout-link')
let modalClose = document.querySelector('.js-modal-close')
let modalClose2 = document.querySelector('.js-modal-close2')
const modalGalleryPhoto = document.getElementsByClassName("modal-gallery")[0]
const modalPartOne = document.querySelector('.part-one');
const modalPartTwo = document.querySelector('.part-two');
let projetsBar = document.querySelector('.projets-bar')



function modeEdition(e) {
    e.preventDefault()
    modal.classList.toggle('hidden')
    document.body.classList.toggle('modal-open')
    console.log('modalOuvert')
}


if (token) {
    adminBar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="p-mode-edition">Mode edition</p>`
    galleryEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p class="gallery-mode-edition">modifier</p>`
    // portfolio.innerHTML = `<p class="projets-mode-edition">Mes projets</p><i class="fa-regular fa-pen-to-square"></i><p id="#modal" class="p-mode-edition">modifier</p>`
    projetsBar.classList.add("logged-in")
    logoutLink.innerHTML = `<a href="#" id="logout">logout</a>`
    let logout = document.getElementById('logout')
    logout.addEventListener('click', function(event) {
        localStorage.removeItem('token')
        window.location.reload()
    })
    filters.style.display = 'none'
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
    modalClose2.addEventListener('click', function(event) {
        modal.classList.toggle('hidden')
        modalPartOne.classList.toggle('hidden')
        modalPartTwo.classList.toggle('hidden')
    })
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
                        // const projectToDelete = document.querySelector(`.modal-gallery figure[data-category="${workId}"]`);
                        // if (projectToDelete) {
                        //     projectToDelete.remove();
                        //     console.log("Item deleted")
                        // }
                        displayProjects()
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

let formAddProject = document.getElementById("formAddProject")
let errorMsgImage = document.querySelector('.error-msg-image')
let errorMsgTitle = document.querySelector('.error-msg-title')
let titleRegex = /^[a-zA-Z'-À-ÖØ-öø-ÿ\s!?.,:;()]+$/;
let errorMsgCategory = document.querySelector('.error-msg-category')
let inputImage = document.getElementById("image")
let inputTitle = document.getElementById("title")
let inputCategory = document.getElementById("select-category")
let submitButtonModal2 = document.querySelector('.submit-button-modal2')
const imageFile = inputImage.files[0];
const allowedTypes = ["image/jpeg", "image/png"];
const maxSize = 4 * 1024 * 1024; // 4 MB

function checkFieldValidity() {
    if(inputTitle.value === '' && inputImage.files.length < 0 && inputCategory.value === '') {
        submitButtonModal2.disabled = true
    } else {
        submitButtonModal2.disabled = false
    }
}
inputTitle.addEventListener('input', checkFieldValidity())
inputImage.addEventListener('input', checkFieldValidity())
inputCategory.addEventListener('input', checkFieldValidity())

formAddProject.addEventListener("submit", function(e) {
    e.preventDefault();
    // Reset error msgs
    errorMsgImage.innerText = "";
    errorMsgTitle.innerText = "";
    errorMsgCategory.innerText = "";
    //gérer les champs du formulaire pour savoir s'ils sont remplis
    if (inputImage.files[0] === "") {
        errorMsgImage.innerText = "Veuillez télécharger une image";
        // return; // Stops sending the demand to server 
    } else {
        // const imageFile = inputImage.files[0];
        // const allowedTypes = ["image/jpeg", "image/png"];
        // const maxSize = 4 * 1024 * 1024; // 4 MB

        // Verify image type + size
        // if (imageFile && !allowedTypes.includes(imageFile.type)) { // if image type is not included in allowedTypes
        //     errorMsgImage.innerText = "L'image doit être de type JPG ou PNG.";
        // } else if (imageFile && imageFile.size > maxSize) {
        //     errorMsgImage.innerText = "L'image ne doit pas dépasser 4 Mo.";
        // } else {
        //     errorMsgImage.innerText = ""; // Reset error msg
        //     errorMsgTitle.innerText = ""; 
        //     errorMsgCategory.innerText = "";
        //     formAddProject.reset();
        // }
    }
    if (inputTitle.value === "") {
        errorMsgTitle.innerText = "Le champ titre ne doit pas etre vide"
    } else if (titleRegex.test(title.value)===false){
        errorMsgTitle.innerText = "Le titre n'est pas valide"
    } 
    if (inputCategory.value === "") {
        errorMsgCategory.innerText = "Veuillez choisir une catégorie"
    } else {
        errorMsgCategory.innerText = ""; // Reset error msg
        // document.querySelector('.submit-button-modal2').classList.add('submit-button-active');
    }
    //faire l'appel API
    if (inputImage.files[0] !== "" && inputTitle.value !== "" && inputCategory.value !== "") { 
        // formAddProject.classList.add('submit-button-active');
        // document.querySelector('.submit-button-modal2').classList.add('submit-button-active');
        const formData = new FormData
        formData.append('title', inputTitle.value)
        formData.append('image', inputImage.files[0])
        formData.append('category', inputCategory.value)
        // let data = {
        //     image: inputImage.files[0],
        //     title: inputTitle.value,
        //     category: inputCategory.value
        // }
        fetch('http://localhost:5678/api/works', { 
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body: formData,
        })
        .then((response)=> {
                if (response.ok) { 
                    displayProjects()
                    displayModalProjects()
                    closeModal()
                }
        })
        .catch((error) => {
            console.log(error);
        })
            // } else if (response.status === 400) {
            //         formAddProject.innerText = "Bad Request" 
            //         // errorMsgCategory.innerText = "Bad Request"
            //     } else if (response.status === 401) {
            //         formAddProject.innerText = "Unauthorized"
            //         // errorMsgCategory.innerText = "Unauthorized"
            //     } else {
            //         // formAddProject.innerText = "Unexpected Error"
            //         throw new Error('Unexpected Error')
            // }
            //     })
            
    };

        // .then((response)=> {
        //     if (response.ok) {
        //         modalGalleryPhoto.innerHTML = '';
        //         let newFigure = document.createElement("figure");
        //         newFigure.setAttribute("data-category", work.categoryId);

        //         const newImageElement = document.createElement('img');
        //         newImageElement.src = work.imageUrl;

        //         let newIcon = document.createElement("i");
        //         newIcon.classList.add('fa-solid', 'fa-trash-can');
        //         newIcon.addEventListener('click', function(event) {
        //             deleteProject(data.id);
        //         });

        //         newFigure.appendChild(newImageElement);
        //         newFigure.appendChild(newIcon);

        //         modalGalleryPhoto.appendChild(newFigure);
        //         // Add project in main gallery (index)
        //         let projectFigure = newFigure.cloneNode(true); // Clone element & adds it in main gallery
        //         sectionProjects.appendChild(projectFigure);
            
        //         let newFigcaption = document.createElement("figcaption");
        //         newFigcaption.innerText = work.title;
                
        //         displayProjects()
        //         displayModalProjects()
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        // } else if (response.status === 400) {
        //         formAddProject.innerText = "Bad Request" 
        //         // errorMsgCategory.innerText = "Bad Request"
        //     } else if (response.status === 401) {
        //         formAddProject.innerText = "Unauthorized"
        //         // errorMsgCategory.innerText = "Unauthorized"
        //     } else {
        //         // formAddProject.innerText = "Unexpected Error"
        //         throw new Error('Unexpected Error')
        // }
        //     })
        // .catch((error)=> { 
        //     console.log(error) 
        // }
    });

    
image.addEventListener('change', function(event) {
    const file = event.target.files[0]
    const imagePreview = document.querySelector('.image-preview')
    if(file) {
        const fileReader = new FileReader()
        fileReader.onload = function(e) {
            imagePreview.src = e.target.result
            imagePreview.classList.remove('hidden')
            document.getElementById('ajouter-photo').classList.add('hidden');
            document.querySelector('.p-modal2').classList.add('hidden'); 
            document.querySelector('.fa-mountain-sun').classList.add('hidden');
        }
        fileReader.readAsDataURL(file)
    } else {
        imagePreview.src = "";
        imagePreview.classList.add('hidden');
        document.getElementById('ajouter-photo').classList.remove('hidden');
        document.querySelector('.p-modal2').classList.remove('hidden');
    }
})    

document.querySelector('.fa-arrow-left').addEventListener('click', function(event) {
    // modeEdition(event)
    modalPartOne.classList.toggle('hidden')
    modalPartTwo.classList.toggle('hidden')
    document.getElementById('formAddProject').reset(); 
    document.querySelector('.image-preview').src = "";
    document.querySelector('.fa-mountain-sun').classList.toggle('hidden');
    document.getElementById('ajouter-photo').classList.toggle('hidden');
    document.querySelector('.p-modal2').classList.toggle('hidden');
})

const closeModal = function (e) {
    modal.classList.toggle('hidden')
    if (modalPartOne.classList.contains('hidden')) {
        modalPartOne.classList.toggle('hidden')
        modalPartTwo.classList.toggle('hidden')
    }
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

const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', function() {
    // closeModal();
    modal.classList.toggle('hidden');
    modalPartOne.classList.toggle('hidden');
    modalPartTwo.classList.toggle('hidden');
});

modal.addEventListener('click', function(event) {
    event.stopPropagation(); 
});

async function selectCategory() {
    await fetchCategories()
    console.log(categories)
    let select = document.getElementById('select-category')
    for(let category of categories) {
        select.innerHTML += `<option value="${category.id}">${category.name}</option>`
    }
}
selectCategory()
