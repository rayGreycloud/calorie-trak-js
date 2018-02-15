// Storage controller 
// Todo

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
      { id: 0, name: 'Strawberry Waffle', calories: 600 },
      { id: 1, name: 'Vegetable Soup', calories: 400 },
      { id: 2, name: 'Chicken with Rice', calories: 800 }    
    ],
    currentItem: null,
    totalCalories: 0
  }
  // Public methods
  return {
    logData: () => data
  }
  
})();

// UI controller 
const UICtrl = (() => {
  
  // Public methods
  return {
    
  }
})();

// App controller
const App = ((ItemCtrl, UICtrl) => {
  // Public methods
  return {
    init: () => { console.log('Hey Handsome')}
  }
  
})(ItemCtrl, UICtrl);

// Initializing app 
App.init();
