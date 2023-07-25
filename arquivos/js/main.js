const form     = document.querySelector("form")
const nextForm = document.querySelector("#next-form")
const inputs   = document.querySelectorAll(".inputs")
const inputErrors = []

inputs.forEach(i => {
	i.addEventListener("blur", () => verifyInput())	
	i.addEventListener("input", () => verifyInput())
})

function verifyInput(){
	inputs.forEach(input => {
		const warnText = input.parentNode.parentNode.children[1]

		if(input.value == "" || input.value == " "){
			warnText.classList.remove("opacity-0")
		}else{
			warnText.classList.add("opacity-0")
		}
	})
}

nextForm.addEventListener("click", e => {
	verifyInput()
})
