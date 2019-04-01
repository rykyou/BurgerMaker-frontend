class Controller {
  constructor() {
  }

  getAllIngredients() {
    fetch(`http://localhost:3000/ingredients`)
    .then(res => res.json())
    .then(json => {

      const h2 = document.createElement('h2')
      h2.innerText = 'Choose your ingredients:'
      document.querySelector('.ingredients-list-container').insertBefore(h2, document.querySelector('.ingredients-list-container').children[0])

      json.forEach((ingredient) => {
        let ingredientInstance = new Ingredient(ingredient.id, ingredient.name, ingredient.image_url)
        ingredientInstance.render()
      })

      //// CLEAR & DONE BUTTONS ////
      let clearButton = document.createElement('button')
      clearButton.innerText = "Clear"
      clearButton.classList.add('btn')
      clearButton.addEventListener('click', () => this.clearAllIngredients())

      let doneButton = document.createElement('button')
      doneButton.innerText = "Done"
      doneButton.classList.add('btn')
      doneButton.addEventListener('click', () => this.renderBurgerFormModal())

      let divTwoButtonsContainer = document.createElement('div')
      divTwoButtonsContainer.classList.add('two-buttons-container')
      divTwoButtonsContainer.appendChild(clearButton)
      divTwoButtonsContainer.appendChild(doneButton)
      document.querySelector('.ingredients-list-container').appendChild(divTwoButtonsContainer)
    })
  }

  getAllBurgers() {
    fetch(`http://localhost:3000/burgers`)
    .then(res => res.json())
    .then(json => {
      const h2 = document.createElement('h2')
      h2.innerText = 'Burger Creations:'

      document.querySelector('.burgers-list-container ').insertBefore(h2, document.querySelector('.burgers-list-container ').children[0])

      json.forEach((burger) => {

        let burgerInstance = new Burger(burger.id, burger.name, burger.owner_name, burger.ingredients)
        burgerInstance.render()
      })
    })
  }

  createBurger(burgerObj) {
    fetch(`http://localhost:3000/burgers`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(burgerObj)
    }).then(res => res.json())
      .then(burger => {
        let newBurger = new Burger(burger.id, burger.name, burger.owner_name, burger.ingredients)
        newBurger.render()
      })
  }

  handleBurgerSubmit(e){
    e.preventDefault()

    const burgerForm = e.target
    if (burgerForm.dataset.id != '') {

      const arrayOfIngredientIds = this.collectIngredientsIdIntoArray()
      const updatedBurger = new Burger(parseInt(burgerForm.dataset.id), burgerForm[0].value, burgerForm[1].value, arrayOfIngredientIds);
      updatedBurger.update()
      burgerForm.dataset.id = '';

    } else {
      const burgerName = burgerForm[0].value
      const burgerCreatorName = burgerForm[1].value
      const burgerIngredientsIds = this.collectIngredientsIdIntoArray()

      if (burgerName != '' && burgerCreatorName != '' && burgerIngredientsIds.length > 0) {

        const newBurgerData = {
          burger: {
            name: burgerName,
            owner_name: burgerCreatorName,
            ingredients: burgerIngredientsIds
          }
        }
        this.createBurger(newBurgerData)
        document.querySelector('.burger-display').innerHTML = ''
      }
    }
    burgerForm.reset();
    // burgerForm.parentElement.classList.add('hidden')
    const modal = document.getElementById('burger-form-modal')
    modal.classList.remove("show")
    modal.classList.remove("block")
  }

  collectIngredientsIdIntoArray() {
    const burgerDisplayDiv = document.querySelector('.burger-display');
    let ingredientsArray = [];

    burgerDisplayDiv.childNodes.forEach(ingredientElement => {
      ingredientsArray.push(parseInt((ingredientElement.id).split("image-")[1]))
    })

    return ingredientsArray
  }

  renderOnlyDisplay(){
    const display = document.querySelector('.burger-display')
    display.classList.add('d-flex')
    display.classList.add('justify-content-center')
    display.id = 'welcome-display'

    const div = document.createElement('div')

    const burgerGif = document.createElement('img')
    burgerGif.src = 'images/burger-logo.gif'

    div.appendChild(burgerGif)
    display.appendChild(div)

    div.addEventListener('click', () => {this.removeHiddenProperties()})
  }

  removeHiddenProperties(){
    const display = document.querySelector('.burger-display')
    display.removeAttribute('id')

    while (display.firstChild) {
    	display.removeChild(display.firstChild)
	  }

    document.querySelector('.ingredients-list-container').classList.remove('hidden')
    document.querySelector('.burgers-list-container').classList.remove('hidden')
  }

  clearAllIngredients() {
    const burgerDisplayDiv = document.querySelector(`.burger-display`)
    while (burgerDisplayDiv.firstChild) {
      burgerDisplayDiv.removeChild(burgerDisplayDiv.firstChild);
    }
  }

  renderBurgerFormModal() {
    const burgerDisplayDiv = document.querySelector(`.burger-display`)

    if (burgerDisplayDiv.childElementCount === 0) {
      const modal = document.getElementById('no-ingredients-error-modal')
      modal.classList.add("show")
      modal.classList.add("block")

      const xBtn = document.getElementById('exit-no-ingr-modal')
      xBtn.addEventListener('click', () => {
        modal.classList.remove("show")
        modal.classList.remove("block")
      })
    } else {
      const modal = document.getElementById('burger-form-modal')
      modal.classList.add("show")
      modal.classList.add("block")

      const burgerForm = document.getElementById('burger-form')

      burgerForm.addEventListener('submit', this.handleBurgerSubmit.bind(this))

      const xBtn = document.getElementById('exit-burger-form-modal')
      xBtn.addEventListener('click', () => {
        modal.classList.remove("show")
        modal.classList.remove("block")
      })
    }
  }

}
