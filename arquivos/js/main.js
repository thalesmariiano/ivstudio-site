const form     = document.querySelector("form")
const nextForm = document.querySelector("#next-form")
const inputs   = document.querySelectorAll(".inputs")

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var validAmount  = 0

inputs.forEach(i => {
	i.addEventListener("blur", () => verifyInput())	
	i.addEventListener("input", () => verifyInput())
})

function verifyInput(){
	inputs.forEach(input => {
		const warnText = input.parentNode.parentNode.parentNode.children[1]
		const warnIcon = input.parentNode.children[0]

		if(input.value == "" || input.value == " "){
			warnText.classList.remove("opacity-0")
			warnIcon.classList.remove("opacity-0")
			warnIcon.src = "arquivos/images/invalid.png"

			input.dataset.valid = "false"
		}else{
			warnText.classList.add("opacity-0")
			warnIcon.src = "arquivos/images/valid.png"

			if(input.type == "email"){
				if(emailRegex.test(input.value)){
					input.dataset.valid = "true"
				}else{
					input.dataset.valid = "false"
				}
			}else{
				input.dataset.valid = "true"
			}
		}
	})
}

nextForm.addEventListener("click", e => {
	verifyInput()

	inputs.forEach(i => {
		const isValid = i.dataset.valid == "true"
		if(isValid) validAmount++
	})

	if(validAmount == inputs.length){
		form.submit()
	}
})
