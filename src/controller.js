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
      const updatedBurger = new Burger(burgerForm.dataset.id, burgerForm[0].value, burgerForm[1].value, arrayOfIngredientIds);
      updatedBurger.update()
      updatedBurger.renderUpdatedBurger()
      // document.querySelector(`.burger-image-${updatedBurger.id}`).remove()
      // updatedBurger.renderBurgerImage()
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
  }

  renderBurgerForm(){
    const burgerFormContainer = document.getElementById('burger-form')

    const burgerForm = document.createElement('form')
    burgerForm.dataset.id = ''

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
  }

  collectIngredientsIdIntoArray() {
    const burgerDisplayDiv = document.querySelector('.burger-display');
    let ingredientsArray = [];

    burgerDisplayDiv.childNodes.forEach(ingredientElement => {
      ingredientsArray.push(parseInt((ingredientElement.id).split("image-")[1]))
    })

    return ingredientsArray
  }


}
