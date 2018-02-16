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
    logData: () => data
  }
  
})();

// UI controller 
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: () => UISelectors
  }
})();

// App controller
const App = ((ItemCtrl, UICtrl) => {
  // Load event listeners 
  const loadEventListeners = () => {
    // Get UI selectors 
    const UISelectors = UICtrl.getSelectors();
  
    // Add item event 
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }
  
  // Add item submit 
  const itemAddSubmit = (e) => {
    // Get form input 
    const input = UICtrl.getItemInput();
    // check inputs 
    if (input.name !== '' && input.calories !== '') {
      // Add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories);  
    }
    
    e.preventDefault();
  }
  
  // Public methods
  return {
    init: () => { 
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Populate list with items
      UICtrl.populateItemList(items);  
      
      // Load event listeners 
      loadEventListeners();
    }
  }
  
})(ItemCtrl, UICtrl);

// Initializing app 
App.init();
