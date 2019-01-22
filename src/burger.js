class Burger {
  constructor(id, name, owner_name) {
    this.id = id
    this.name = name
    this.owner_name = owner_name
    Burger.all.push(this)
  }

  render(){
    const burgersUl = document.getElementById('burgers-list')
    const burgerDiv = document.createElement('div')
    burgerDiv.id = `burger-${this.id}`

    const burgerTag = document.createElement('h2')
    burgerTag.innerText = this.name

    const ownerTag = document.createElement('h4')
    ownerTag.innerText = this.owner_name

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit Burger'
    editButton.addEventListener('click', () => this.handleEditBurgerButton())

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete Burger'

    deleteButton.addEventListener('click', () => this.handleDeleteButton(this.id))

    burgerDiv.appendChild(burgerTag)
    burgerDiv.appendChild(ownerTag)
    burgerDiv.appendChild(editButton)
    burgerDiv.appendChild(deleteButton)

    burgersUl.appendChild(burgerDiv)

  }

  handleEditBurgerButton(){
    const burgerForm = document.querySelector('form')
    burgerForm.dataset.id = this.id

    const burgerDiv = document.querySelector(`#burger-${this.id}`)

    const burgerNameInput = document.querySelector('#burger-name-input')
    burgerNameInput.value = burgerDiv.children[0].innerText

    const burgerOwnerInput = document.querySelector('#burger-creator-input')
    burgerOwnerInput.value = burgerDiv.children[1].innerText

    const submitButton = document.querySelector('#submit-button')
    submitButton.innerText = 'Save Burger'
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
        let updatedBurger = new Burger(burger.id, burger.name, burger.owner_name)
        updatedBurger.renderUpdatedBurger()
      })
  }

  renderUpdatedBurger() {
    const burgerDiv = document.querySelector(`#burger-${this.id}`)
    burgerDiv.children[0].innerText = this.name
    burgerDiv.children[1].innerText = this.owner_name

    const submitButton = document.querySelector('#submit-button')
    submitButton.innerText = 'Create Burger'

    const burgerForm = document.querySelector('form')
    burgerForm.dataset.id = ''
  }

  handleDeleteButton(id){
    fetch(`http://localhost:3000/burgers/${id}`, {
      method: 'DELETE'
    }).then(document.querySelector(`#burger-${id}`).remove())
  }
}

Burger.all = []
