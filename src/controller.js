class Controller {
  constructor() {

  }

  getAllIngredients() {
    fetch(`http://localhost:3000/ingredients`)
    .then(res => res.json())
    .then(json => {
      json.forEach((ingredient) => {
        let ingredientInstance = new Ingredient(ingredient.id, ingredient.name, ingredient.image_url)
        ingredientInstance.render()
      })
    })
  }

  getAllBurgers() {
    fetch(`http://localhost:3000/burgers`)
    .then(res => res.json())
    .then(json => {
      json.forEach((burger) => {
        let burgerInstance = new Burger(burger.id, burger.name, burger.owner_name)
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
        let newBurger = new Burger(burger.id, burger.name, burger.owner_name)
        newBurger.render()
      })
  }

  handleBurgerSubmit(e){
    e.preventDefault()
    const burgerForm = e.target
    if (burgerForm.dataset.id != '') {
      const updatedBurger = new Burger(burgerForm.dataset.id, burgerForm[0].value, burgerForm[1].value);
      updatedBurger.update();
      burgerForm.dataset.id = '';
    } else {
      const newBurgerData = {
        name: burgerForm[0].value,
        owner_name: burgerForm[1].value
      }

      this.createBurger(newBurgerData)
    }
    burgerForm.reset();
  }

  renderBurgerForm(){
    const burgerFormContainer = document.getElementById('burger-form')

    const burgerForm = document.createElement('form')
    burgerForm.dataset.id = ''
    // add a dataset.id value of = ''

    const burgerNameInput = document.createElement('input')
    burgerNameInput.id = `burger-name-input`
    burgerNameInput.placeholder = 'Burger Name...'

    const burgerOwnerInput = document.createElement('input')
    burgerOwnerInput.id = `burger-creator-input`
    burgerOwnerInput.placeholder = 'Creator Name...'

    const burgerCreateButton = document.createElement('button')
    burgerCreateButton.id = 'submit-button'
    burgerCreateButton.innerText = 'Create Burger'

    burgerForm.appendChild(burgerNameInput)
    burgerForm.appendChild(burgerOwnerInput)
    burgerForm.appendChild(burgerCreateButton)
    burgerFormContainer.appendChild(burgerForm)

    burgerForm.addEventListener('submit', this.handleBurgerSubmit.bind(this))
    // burgerForm.addEventListener('submit', () => {  this.handleBurgerSubmit()})
  }




}
