class Burger {
  constructor(id, name, owner_name, ingredients) {
    this.id = id
    this.name = name
    this.owner_name = owner_name
    this.ingredients = ingredients
    Burger.all.push(this)
  }

  render(){
    const burgersUl = document.querySelector('.burgers-list')
    const burgerDiv = document.createElement('div')
    burgerDiv.id = `burger-${this.id}`
    burgerDiv.classList.add('col-2')
    burgerDiv.classList.add('burger-card')

    const burgerTag = document.createElement('h5')
    burgerTag.innerText = this.name

    const ownerTag = document.createElement('h5')
    ownerTag.innerText = this.owner_name

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit Burger'
    editButton.addEventListener('click', () => this.handleEditBurgerButton())

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete Burger'

    deleteButton.addEventListener('click', () => this.handleDeleteButton(this.id))

    burgerDiv.appendChild(burgerTag)
    burgerDiv.appendChild(ownerTag)

    if (this.ingredients) {
      burgerDiv.appendChild(this.renderBurgerImage())
    }

    burgerDiv.appendChild(editButton)
    burgerDiv.appendChild(deleteButton)

    burgersUl.appendChild(burgerDiv)

  }

  update() {
    fetch(`http://localhost:3000/burgers/${this.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this)
    }).then(res => res.json())
      .then(burger => {
        let updatedBurger = new Burger(burger.id, burger.name, burger.owner_name, burger.ingredients)
        updatedBurger.renderUpdatedBurger()
      })
  }

  renderUpdatedBurger() {
    const burgerDiv = document.querySelector(`#burger-${this.id}`)
    burgerDiv.children[0].innerText = this.name
    burgerDiv.children[1].innerText = this.owner_name

    const burgerImgDiv = document.querySelector(`.burger-image-${this.id}`)

    while (burgerImgDiv.firstChild) {
    	burgerImgDiv.removeChild(burgerImgDiv.firstChild);
	  }

    burgerImgDiv.appendChild(this.renderBurgerImage())

    const submitButton = document.querySelector('#submit-button')
    submitButton.innerText = 'Create Burger'

    const burgerForm = document.querySelector('form')
    burgerForm.dataset.id = ''

    const burgerDisplayDiv = document.querySelector('.burger-display')
    while (burgerDisplayDiv.firstChild) {
    	burgerDisplayDiv.removeChild(burgerDisplayDiv.firstChild);
	  }
  }

  renderBurgerImage() {
    const div = document.createElement('div')

    div.classList.add(`burger-image-${this.id}`)

    this.ingredients.forEach(ingredient => {
      if (ingredient.toFixed) {
        ingredient = Ingredient.all.find(ing => ing.id === ingredient)
      }
      const image = document.createElement('img')
      image.classList.add('ingredient-image')

      image.src = ingredient.image_url

      div.appendChild(image)
    })
    return div
  }

  handleEditBurgerButton(){
    const burgerForm = document.querySelector('form')
    burgerForm.dataset.id = this.id

    const burgerDiv = document.querySelector(`#burger-${this.id}`)

    const burgerNameInput = document.querySelector('#burger-name-input')
    burgerNameInput.value = burgerDiv.children[0].innerText

    const burgerOwnerInput = document.querySelector('#burger-creator-input')
    burgerOwnerInput.value = burgerDiv.children[1].innerText

    const burgerDisplayDiv = document.querySelector('.burger-display')
    this.ingredients.forEach((ingredient) => {
      const ingredientInstance = new Ingredient(ingredient.id, ingredient.name, ingredient.image_url)
      ingredientInstance.renderIngredientToDisplay()
    })

    const submitButton = document.querySelector('#submit-button')
    submitButton.innerText = 'Save Burger'
  }

  handleDeleteButton(id){
    fetch(`http://localhost:3000/burgers/${id}`, {
      method: 'DELETE'
    }).then(document.querySelector(`#burger-${id}`).remove())
  }
}

Burger.all = []
