class StorageController {
  constructor(storage = []) {
    this.storage = storage;
  }

  addToStorage (task) {
    this.storage.push(task);
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
    return this.storage.filter((task) => (task.category === category));
  }
}

export default StorageController;