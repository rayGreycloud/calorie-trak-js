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

// UI controller 
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    backBtn: '.back-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
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
    addListItem: (item) => {
      // Show the list 
      document.querySelector(UISelectors.itemList).style.display = 'block';      
      // Create li element 
      const li = document.createElement('li');
      // Add class 
      li.className = 'collection-item';
      // Add Id 
      li.id = `item-${item.id}`;
      // Add HTML 
      li.innerHTML = `
        <strong>${item.name}</strong> - <em>${item.calories} calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil fa-lg"></i>
        </a>
      `;
      // Insert item 
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);    
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories; 
      UICtrl.showEditState();
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: totalCalories => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = 'inline';      
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';      
      document.querySelector(UISelectors.updateBtn).style.display = 'none';      
      document.querySelector(UISelectors.backBtn).style.display = 'none';      
    },
    showEditState: () => {
      document.querySelector(UISelectors.addBtn).style.display = 'none';      
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';      
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';      
      document.querySelector(UISelectors.backBtn).style.display = 'inline';      
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
    
    // Edit icon click event 
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
  }
  
  // Add item submit 
  const itemAddSubmit = (e) => {
    // Get form input 
    const input = UICtrl.getItemInput();
    // check inputs 
    if (input.name !== '' && input.calories !== '') {
      // Add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories); 
      // Add item to UI list
      UICtrl.addListItem(newItem);
      // Get total calories 
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total to UI
      UICtrl.showTotalCalories(totalCalories);
      // Clear fields 
      UICtrl.clearInput();
    }
    
    e.preventDefault();
  }
  
  // Update item submit 
  const itemUpdateSubmit = function (e) {

    if (e.target.classList.contains("edit-item")) {
      // Get list item-id 
      const listId = e.target.parentNode.parentNode.id;
      // Break into array
      const listIdArr = listId.split('-');
      // Get id number
      const id = parseInt(listIdArr[1]);
      // Get item 
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set item as current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to form 
      UICtrl.addItemToForm();
    }
  
  e.preventDefault();  
  }
  
  // Public methods
  return {
    init: () => { 
      // Clear edit state 
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Check for items - hide list if none 
      if (items.length === 0) {
        UICtrl.hideList();
      } else {  
      // Populate list with items
      UICtrl.populateItemList(items);  
      }

      // Get total calories 
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total to UI
      UICtrl.showTotalCalories(totalCalories);    
      
      // Load event listeners 
      loadEventListeners();
    }
  }
  
})(ItemCtrl, UICtrl);

// Initializing app 
App.init();
