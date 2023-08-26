
const addAnimation = (element, animation) => {
	element.classList.remove("hidden")
	element.classList.add(animation, "animate__animated")
	element.addEventListener("animationend", endAnimation)

	function endAnimation(){
		element.classList.remove(animation, "animate__animated")
		element.removeEventListener("animationend", endAnimation)
	}
}

const removeAnimation = (element, animation) => {
	element.classList.add(animation, "animate__animated")
	element.addEventListener("animationend", endAnimation)

	function endAnimation(){
		element.classList.add("hidden")
		element.classList.remove(animation, "animate__animated")
		element.removeEventListener("animationend", endAnimation)
	}
}