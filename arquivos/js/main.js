const form     = document.querySelector("form")
const nextForm = document.querySelector("#next-form")
const inputs   = document.querySelectorAll(".inputs")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var validAmount  = 0
var blockButton = false

inputs.forEach(i => {
	i.addEventListener("blur", onBlurListener)
	i.addEventListener("input", onInputListener)
})

function onBlurListener(e){
	const input = e.target

	if(input.type == "email"){
		showWarn(input, validarEmail(input))
	}else{
		showWarn(input, !validarInput(input))
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

	if(input.type == "email"){
		showWarn(input, validarEmail(input))
	}else{
		showWarn(input, !validarInput(input))
	}


	// if(validAmount == inputs.length){
	// 	blockButton = false

	// 	nextForm.classList.remove("opacity-30", "cursor-default")
	// 	nextForm.classList.add("cursor-pointer", "opacity-100")
	// }
}

const validarEmail = input => input.value !== "" || input.value !== " " ? emailRegex.test(input.value) : false
const validarInput = input => input.value == "" || input.value == " "

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

nextForm.addEventListener("click", () => {
	// if(!blockButton){
	// 	inputs.forEach(i => {
	// 		verifyInput(i)
	// 		const isValid = i.dataset.valid == "true"
	// 		if(isValid) validAmount++
	// 	})

	// 	if(validAmount == inputs.length){
	// 		form.submit()
	// 	}else{
	// 		blockButton = true
	// 		nextForm.classList.add("opacity-30", "cursor-default")
	// 		nextForm.classList.remove("cursor-pointer")
	// 	}
	// }
})

form.addEventListener("submit", e => e.preventDefault())
