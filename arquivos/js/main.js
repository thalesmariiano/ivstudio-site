
const form         = document.querySelector("form")
const part1        = document.querySelector("#part-1")
// const part2        = document.querySelector("#part-2")
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

function validarForm(i){
	const isValid = !validarInput(i)

	if(i.type == "email"){
		const isValidEmail = validarEmail(i)

		if(isValidEmail && i.dataset.valid == "false"){
			showWarn(i, isValidEmail)
			i.dataset.valid = "true"
			validAmount++
		}else{
			i.dataset.valid = "false"
			showWarn(i, isValidEmail)
		}
	}else{
		if(isValid && i.dataset.valid == "false"){
			showWarn(i, isValid)
			i.dataset.valid = "true"
			validAmount++
		}else{
			i.dataset.valid = "false"
			showWarn(i, isValid)
		}
	}
}

nextForm.addEventListener("click", () => {
	if(!blockSubmit){
		inputs.forEach(i => {
			validarForm(i)
		})

		if(validAmount == inputs.length){
			part1.classList.add("hidden")
			formPercent.innerHTML = "67% Concluido"
			form.innerHTML = `
				<div id="part-2" class="space-y-10">
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Qual o nome da empresa?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Por que a empresa tem esse <br> nome? O que ele significa pra você?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Defina resumidamente do que <br> se trata sua empresa.</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Qual o momento atual da sua empresa?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Qual o público alvo da sua empresa?</p>
						<div class="relative">
							<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
							<div class="flex gap-x-10 ml-2">
								<div>
									<label class="flex gap-x-3">
										<input type="checkbox" name="homens">
										<p class="font-bold font-montserrat">Homens</p>
									</label>
									<label class="flex gap-x-3">
										<input type="checkbox" name="mulheres">
										<p class="font-bold font-montserrat">Mulheres</p>
									</label>
								</div>
								<div>
									<label class="flex gap-x-3">
										<input type="checkbox" name="criancas">
										<p class="font-bold font-montserrat">Crianças</p>
									</label>
									<label class="flex gap-x-3">
										<input type="checkbox" name="jovens">
										<p class="font-bold font-montserrat">Jovens</p>
									</label>
								</div>
								<div>
									<label class="flex gap-x-3">
										<input type="checkbox" name="adults">
										<p class="font-bold font-montserrat">Adultos</p>
									</label>
									<label class="flex gap-x-3">
										<input type="checkbox" name="terceira-idade">
										<p class="font-bold font-montserrat">Terceira Idade</p>
									</label>
								</div>
							</div>
						</div>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Descreva as características do <br> seu público?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat font-">Qual é a faixa de renda <br> predominante do seu público-alvo?</p>
						<div class="relative">
							<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">

							<div class="ml-2">
								<label class="flex gap-x-3">
									<input type="checkbox" name="adults">
									<p class="font-montserrat"><span class="font-bold">Classe A:</span> Renda mensal superior a R$ 22 mil</p>
								</label>
								<label class="flex gap-x-3">
									<input type="checkbox" name="terceira-idade">
									<p class="font-montserrat"><span class="font-bold">Classe B:</span> Renda mensal entre R$ 7,1 mil e R$ 22 mil</p>
								</label>
								<label class="flex gap-x-3">
									<input type="checkbox" name="adults">
									<p class="font-montserrat"><span class="font-bold">Classe C:</span> Renda mensal entre R$ 2,9 mil e R$ 7,1 mil</p>
								</label>
								<label class="flex gap-x-3">
									<input type="checkbox" name="terceira-idade">
									<p class="font-montserrat"><span class="font-bold">Classe D:</span> Renda mensal até R$ 2,9 mil</p>
								</label>
								<label class="flex gap-x-3">
									<input type="checkbox" name="terceira-idade">
									<p class="font-montserrat"><span class="font-bold">Classe E:</span> Renda mensal inferior a R$ 2,9 mil</p>
								</label>
							</div>
						</div>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">Há quanto tempo sua <br> empresa existe?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">Quais produtos ou serviços sua <br> empresa oferece?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">O que faz sua empresa ser especial?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">Sua empresa tem algum slogan?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">Sua empresa tem concorrentes? <br> Quem são? Fale um pouco <br> sobre eles se achar necessário. <br> Coloque nomes e links. </p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">Seus concorrentes oferecem algo <br> que sua empresa não oferece?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
					<div class="relative">
						<label>
							<p class="ml-1 mb-4 font-black text-2xl leading-7 font-montserrat">Quais os objetivos, visões e valores <br> da sua empresa?</p>
							<div class="relative">
								<img class="absolute top-3 -left-5 w-3 opacity-0" src="arquivos/images/invalid.png">
								<textarea class="inputs w-[30rem] resize-none font-montserrat text-sm text-neutral-200 focus:text-white py-1 pl-5 bg-transparent border-2 border-white rounded-2xl" type="text" rows="1" name="full-name" data-valid="false"></textarea>
							</div>
						</label>
						<p class="ml-2 mt-1 text-xs text-red-500 select-none opacity-0">Resposta obrigatória!</p>
					</div>
				</div>
			`
		}else{
			blockSubmit = true
			nextForm.classList.add("opacity-30", "cursor-default")
			nextForm.classList.remove("cursor-pointer")
		}
	}else{

	}
})

form.addEventListener("submit", e => e.preventDefault())
