class Ingredient {
  constructor(id, name, image_url) {
    this.id = id
    this.name = name
    this.image_url = image_url
    Ingredient.all.push(this)
  }

  render(){
    let ingredientUl = document.getElementById('ingredients-list')

    let div = document.createElement('div')
    div.id = `ingredient-${this.id}`

    let ingredientButton = document.createElement('button')
    ingredientButton.innerText = this.name
    ingredientButton.classList.add('btn')
    ingredientButton.classList.add('btn-primary')
    ingredientButton.classList.add('ingr-buttons')

    ingredientButton.addEventListener('click', () => this.renderIngredientToDisplay())

    div.appendChild(ingredientButton)
    ingredientUl.appendChild(div)
  }

  renderIngredientToDisplay() {
    const burgerDisplayDiv = document.querySelector('.burger-display')

    if (burgerDisplayDiv.children.length < 10) {
      const ingredientImage = document.createElement('img')
      ingredientImage.src = this.image_url
      ingredientImage.id = `ingredient-image-${this.id}`
      ingredientImage.classList.add(`ingr-placement-${burgerDisplayDiv.children.length}`)
      ingredientImage.addEventListener('click', () => this.removeIngredient())

      burgerDisplayDiv.appendChild(ingredientImage)
    } else {
      const modal = document.getElementById('max-ingredients-error-modal')
      modal.classList.add("show")
      modal.classList.add("block")

      const xBtn = document.getElementById('exit-max-ingr-modal')
      xBtn.addEventListener('click', () => {
        modal.classList.remove("show")
        modal.classList.remove("block")
      })
    }
  }

  removeIngredient() {
    const burgerDisplayDiv = document.querySelector(`.burger-display`)

    if (burgerDisplayDiv.lastChild) {
      burgerDisplayDiv.lastChild.remove()
	  }
  }
}

Ingredient.all = []
