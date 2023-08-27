
const form         = document.querySelector("form")
const formPercent  = document.querySelector("#form-percent")
const nextForm     = document.querySelector("#next-form")
const inputs       = document.querySelectorAll(".inputs")

const emailRegex   = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var validAmount    = 0
var blockSubmit    = false

const openDrawer      = document.querySelector("#open-drawer-btn")
const closeDrawer     = document.querySelector("#close-drawer-btn")
const drawerContainer = document.querySelector("#drawer-container")
const drawer          = document.querySelector("#drawer")


openDrawer.addEventListener('click', () => {
	addAnimation(drawerContainer, "animate__fadeIn")
	addAnimation(drawer, "animate__slideInRight")
})

closeDrawer.addEventListener('click', () => {
	removeAnimation(drawerContainer, "animate__fadeOut")
	removeAnimation(drawer, "animate__slideOutRight")
})

drawerContainer.addEventListener('click', () => {
	removeAnimation(drawerContainer, "animate__fadeOut")
	removeAnimation(drawer, "animate__slideOutRight")	
})

const controller = new ScrollMagic.Controller()

const header        = document.querySelector("#header")
const logo          = document.querySelector("#logo")
const homeLink      = document.querySelector("#home-link")
const sobreLink     = document.querySelector("#sobre-link")
const projetosLink  = document.querySelector("#projetos-link")
const contatoLink   = document.querySelector("#contato-link")

const header_scene = new ScrollMagic.Scene({triggerElement: "#inicio", duration: "60%"})
	  header_scene.on("enter leave", e => {
	  	if(e.type === "leave"){

	  		header.classList.remove("pt-16")
	  		header.classList.add("py-8")
	  		header.style.backgroundColor = "#000"

	  		logo.classList.add("w-40")
	  		logo.classList.remove("w-64")

	  		homeLink.classList.remove("text-3xl")
	  		sobreLink.classList.remove("text-3xl")
	  		projetosLink.classList.remove("text-3xl")
	  		contatoLink.classList.remove("text-3xl")

	  		homeLink.classList.add("text-2xl")
	  		sobreLink.classList.add("text-2xl")
	  		projetosLink.classList.add("text-2xl")
	  		contatoLink.classList.add("text-2xl")

	  	}else{
	  		header.classList.add("pt-16")
	  		header.classList.remove("py-8")
	  		header.style.backgroundColor = ""

	  		logo.classList.remove("w-40")
	  		logo.classList.add("w-64")

	  		homeLink.classList.add("text-3xl")
	  		sobreLink.classList.add("text-3xl")
	  		projetosLink.classList.add("text-3xl")
	  		contatoLink.classList.add("text-3xl")

	  		homeLink.classList.remove("text-2xl")
	  		sobreLink.classList.remove("text-2xl")
	  		projetosLink.classList.remove("text-2xl")
	  		contatoLink.classList.remove("text-2xl")
	  	}
	  })
	  header_scene.addTo(controller)

const inicio_scene = new ScrollMagic.Scene({triggerElement: "#inicio", duration: "90%"})
	  inicio_scene.setClassToggle("#home-link", "link-selected")
	  inicio_scene.offset(90)
	  inicio_scene.addTo(controller)

const sobre_scene = new ScrollMagic.Scene({triggerElement: "#sobre", duration: "90%"})
	  sobre_scene.setClassToggle("#sobre-link", "link-selected")
	  sobre_scene.offset(90)
	  sobre_scene.addTo(controller)

const projetosHeight = document.querySelector("#projetos").clientHeight
const projetos_scene = new ScrollMagic.Scene({triggerElement: "#projetos", duration: projetosHeight + 200})
	  projetos_scene.setClassToggle("#projetos-link", "link-selected")
	  projetos_scene.offset(-110)
	  projetos_scene.addTo(controller)

const contato_scene = new ScrollMagic.Scene({triggerElement: "#contato", duration: "90%"})
	  contato_scene.setClassToggle("#contato-link", "link-selected")
	  contato_scene.offset(-30)
	  contato_scene.addTo(controller)


inputs.forEach(i => {
	i.addEventListener("blur", onBlurListener)
	i.addEventListener("input", onInputListener)
})

const validarEmail = input => input.value !== "" || input.value !== " " ? emailRegex.test(input.value) : false
const validarInput = input => input.value == "" || input.value == " "

function onBlurListener(e){
	const input = e.target

	switch(input.type){
		case "email":
			showWarn(input, validarEmail(input))
			break
		case "checkbox":

			break
		case "radio":

			break
		default:
			showWarn(input, !validarInput(input))
			break
	}
}

function onInputListener(e){
	const input = e.target

	if(input.nodeName == "TEXTAREA"){
		if(input.scrollHeight > input.offsetHeight){
			input.rows += 1
		}
		window.addEventListener("keydown", e => {
			if(e.code == "Backspace"){
				if(input.scrollHeight < input.offsetHeight){
					input.rows -= 1
				}
			}
		})
	}

	switch(input.type){
		case "email":
			showWarn(input, validarEmail(input))
			break
		case "checkbox":

			break
		case "radio":

			break
		default:
			showWarn(input, !validarInput(input))
			break
	}

	if(!validarInput(input) && input.dataset.valid == "false"){
		input.dataset.valid = "true"
		validAmount++

		if(validAmount == inputs.length){
			blockSubmit = false

			nextForm.classList.remove("opacity-30", "cursor-default")
			nextForm.classList.add("cursor-pointer", "opacity-100")
		}
	}
}

function showWarn(input, isValid){
	const warnText = input.parentNode.parentNode.parentNode.children[1]
	const warnIcon = input.parentNode.children[0]
	
	if(input.type == "checkbox" || input.type == "radio"){
		const warnIconCheckbox = input.parentNode.parentNode.parentNode.parentNode.children[0]
		const warnTextCheckbox = input.parentNode.parentNode.parentNode.parentNode.parentNode.children[2]

		if(isValid){
			warnIconCheckbox.classList.remove("opacity-0")
			warnTextCheckbox.classList.add("opacity-0")
			warnIconCheckbox.src = "arquivos/images/valid.png"
		}else{
			warnTextCheckbox.classList.remove("opacity-0")
			warnIconCheckbox.classList.remove("opacity-0")
			warnIconCheckbox.src = "arquivos/images/invalid.png"
		}
	}else{
		if(isValid){
			warnIcon.classList.remove("opacity-0")
			warnText.classList.add("opacity-0")
			warnIcon.src = "arquivos/images/valid.png"
		}else{
			warnText.classList.remove("opacity-0")
			warnIcon.classList.remove("opacity-0")
			warnIcon.src = "arquivos/images/invalid.png"
		}
	}
	
}

function validarForm(input){
	const isValid = !validarInput(input)

	switch(input.type){
		case "email":
			const isValidEmail = validarEmail(input)

			if(isValidEmail && input.dataset.valid == "false"){
				showWarn(input, isValidEmail)
				input.dataset.valid = "true"
				validAmount++
			}else{
				input.dataset.valid = "false"
				showWarn(input, isValidEmail)
			}
			break
		case "checkbox":

			break
		case "radio":

			break
		default:
			if(isValid && input.dataset.valid == "false"){
				showWarn(input, isValid)
				input.dataset.valid = "true"
				validAmount++
			}else{
				input.dataset.valid = "false"
				showWarn(input, isValid)
			}
			break
	}
}

nextForm.addEventListener("click", () => {
	if(!blockSubmit){
		inputs.forEach(i => {
			validarForm(i)
		})

		if(validAmount == inputs.length){

		}else{
			blockSubmit = true
			nextForm.classList.add("opacity-30", "cursor-default")
			nextForm.classList.remove("cursor-pointer")
		}
	}else{

	}
})

form.addEventListener("submit", e => e.preventDefault())
