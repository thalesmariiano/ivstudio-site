const form     = document.querySelector("form")
const nextForm = document.querySelector("#next-form")
const inputs   = document.querySelectorAll(".inputs")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emptyRegex = /^(?!\s*$).+/;
var validAmount  = 0
var blockButton = false

inputs.forEach(i => {
	i.addEventListener("blur", () => verifyInput(i))
	i.addEventListener("input", () => onInputListener(i))
})

function onInputListener(i){
	if(i.nodeName == "TEXTAREA"){
		if(i.scrollHeight > i.offsetHeight){
			i.rows += 1
		}
		window.addEventListener("keydown", e => {
			if(e.code == "Backspace"){
				if(i.scrollHeight < i.offsetHeight){
					i.rows -= 1
				}
			}
		})
	}
		
	verifyInput(i)

	if(validAmount == inputs.length){
		console.log("teste")
		blockButton = false

		nextForm.classList.remove("opacity-30", "cursor-default")
		nextForm.classList.add("cursor-pointer", "opacity-100")
	}
}

function verifyInput(input){
	const warnText = input.parentNode.parentNode.parentNode.children[1]
	const warnIcon = input.parentNode.children[0]

	if(input.value == "" || input.value == " "){
		warnText.classList.remove("opacity-0")
		warnIcon.classList.remove("opacity-0")
		warnIcon.src = "arquivos/images/invalid.png"

		input.dataset.valid = "false"
	}else{
		warnText.classList.add("opacity-0")

		if(input.type == "email"){
			if(emailRegex.test(input.value)){
				input.dataset.valid = "true"
				warnIcon.src = "arquivos/images/valid.png"
			}else{
				input.dataset.valid = "false"
				warnIcon.src = "arquivos/images/invalid.png"
			}
		}else{
			input.dataset.valid = "true"
			warnIcon.classList.remove("opacity-0")
			warnIcon.src = "arquivos/images/valid.png"
		}
	}
}

nextForm.addEventListener("click", () => {
	if(!blockButton){
		inputs.forEach(i => {
			verifyInput(i)
			const isValid = i.dataset.valid == "true"
			if(isValid) validAmount++
		})

		if(validAmount == inputs.length){
			form.submit()
		}else{
			blockButton = true
			nextForm.classList.add("opacity-30", "cursor-default")
			nextForm.classList.remove("cursor-pointer")
		}
	}
})

form.addEventListener("submit", e => e.preventDefault())
