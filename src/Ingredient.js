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

    div.appendChild(ingredientButton)
    ingredientUl.appendChild(div)
  }
}

Ingredient.all = []
