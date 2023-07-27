
const form         = document.querySelector("form")
const formPercent  = document.querySelector("#form-percent")
const nextForm     = document.querySelector("#next-form")
const inputs       = document.querySelectorAll(".inputs")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var validAmount  = 0
var blockSubmit = false

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
