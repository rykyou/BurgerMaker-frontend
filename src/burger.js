class Burger {
  constructor(id, name, owner_name) {
    this.id = id
    this.name = name
    this.owner_name = owner_name
    Burger.all.push(this)
  }

  render(){
    let burgersUl = document.getElementById('burgers-list')
    let burgerDiv = document.createElement('div')
    burgerDiv.id = `burger-${this.id}`

    let burgerTag = document.createElement('h2')
    burgerTag.innerText = this.name

    let ownerTag = document.createElement('h4')
    ownerTag.innerText = this.owner_name

    burgerDiv.appendChild(burgerTag)
    burgerDiv.appendChild(ownerTag)
    burgersUl.appendChild(burgerDiv)
  }
}

Burger.all = []
