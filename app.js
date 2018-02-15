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
    getItems: () => data.items,
    logData: () => data
  }
  
})();

// UI controller 
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list'
  }
  
  // Public methods
  return {
    populateItemList: items => {
      let html = '';
      // Create li for each item
      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}</strong> - <em>${item.calories} calories</em>
          <a href="#" class="edit-item secondary-content">
            <i class="fa fa-pencil"></i>
          </a>
        </li>
        `;
      });

      // Insert list items into DOM
      document.querySelector(UISelectors.itemList).innerHTML = html; 
    }
  }
})();

// App controller
const App = ((ItemCtrl, UICtrl) => {
  // Public methods
  return {
    init: () => { 
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Populate list with items
      UICtrl.populateItemList(items);  
    }
  }
  
})(ItemCtrl, UICtrl);

// Initializing app 
App.init();
