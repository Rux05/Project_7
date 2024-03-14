// {
let works = []
const sectionProjects = document.querySelector(".gallery")
const filters = document.querySelector(".filters")

// Afficher projets


async function fetchProjects () {
	await fetch('http://localhost:5678/api/works')
	.then(projects => projects.json())
	.then(body => {
		console.log(body)
		works = body
	})
	.catch((error) => console.log(error))
}

async function displayProjects() {
	await fetchProjects()
	for(let work of works) {
		console.log(work)
		let figure = document.createElement("figure")
		figure.setAttribute("data-category", work.categoryId)
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		let figcaption = document.createElement("figcaption")
		figcaption.innerText = work.title
		figure.appendChild(imageElement)
		figure.appendChild(figcaption)
		sectionProjects.appendChild(figure)
		// const projectElement = document.createElement("title");
		// sectionProjects.appendChild(imageUrl);
		// imageUrl.appendChild(projectElement);
	}
	
}	
displayProjects()

// Trier par categorie

let categories = document.querySelector(".filters")
// filters.addEventListener("click", function () {
	
// 	displayCategories()
// });

async function fetchCategories() {
	await fetch('http://localhost:5678/api/categories')
	.then(categories => categories.json())
	.then(body => {
		console.log(body)
		categories = body
	})
	.catch((error) => console.log(error))
	// let arr = [0];
	// arr.unshift(1, 2, 3);
	// console.table(arr);
}


// [1, 2, 3, 4, 5, 6]

// const arr = [0];
// arr.unshift([tous])

// arr.unshift(1, 2, 3);
// console.table(arr);

async function displayCategories() {
	await fetchCategories()
	console.log(categories)
	categories.unshift({id:0, name:"Tous"})
	console.log(categories)
	// for(let i=0; i<categories.length; i++) {
	// 	console.log(i)		
	// }
	for(let category of categories) {
		let button = document.createElement("button")
		button.textContent = category.name
		button.setAttribute("data-category", category.id)
		filters.appendChild(button)
		button.addEventListener("click", function(event) {
			console.log(event)
			filterByCategory(event.target.getAttribute("data-category"))
		})
	}
	// if (data-category === data.categoryId) {
	// 	// console.log(data-category)
	// 	console.log(work.categoryId)
	// }
	
}	
displayCategories()

// && esperluette
async function filterByCategory(eventId) {
	console.log(eventId)
	let figures = document.querySelectorAll(".gallery figure")
	for(let figure of figures) {
		figure.classList.remove("hidden")
		if(eventId !== figure.getAttribute("data-category") && Number(eventId) !== 0) {
			figure.classList.toggle("hidden")
		}
	}
}