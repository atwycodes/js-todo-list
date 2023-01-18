class StorageController {
  constructor() {
    this.storage = [];
  }

  addToStorage (todo) {
    this.storage.push(todo);
  }

  removeFromStorage (criteria) {
    this.storage.forEach((object, index) => {
      if (index === criteria) {
        this.storage.splice(index,1);
      }
    });
  }

  printStorage () {
    console.table(this.storage);
  }

  filterCategory(category) {
    return this.storage.filter((todo) => (todo.category === category));
  }
}

export default StorageController;