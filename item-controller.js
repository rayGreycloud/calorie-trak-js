// Item controller 
const ItemCtrl = (() => {
  // Constructor 
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  
  // State 
  const data = {
    items: [
      // { id: 0, name: 'Strawberry Waffle', calories: 600 },
      // { id: 1, name: 'Vegetable Soup', calories: 400 },
      // { id: 2, name: 'Chicken with Rice', calories: 800 }    
    ],
    currentItem: null,
    totalCalories: 0
  }
  // Public methods
  return {
    getItems: () => data.items,
    addItem: (name, calories) => {
      // const ID = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;
      
      let ID;
      // Create ID 
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      // Calories to num 
      calories = parseInt(calories);
      
      // Create new item 
      newItem = new Item(ID, name, calories);
      
      // Add to items array 
      data.items.push(newItem);
      
      return newItem;
    },
    getItemById: (id) => {
      let found = null;
      
      // loop thru items 
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      
      return found;
    },
    setCurrentItem: (item) => {
      data.currentItem = item;
    },
    getCurrentItem: () => data.currentItem,
    getTotalCalories: () => {
      let total = 0;
      // Loop thru items and total calories
      data.items.forEach(item => {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;
      // return total 
      return data.totalCalories;
    },
    logData: () => data
  }
  
})();
