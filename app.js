// App controller
const App = ((ItemCtrl, UICtrl) => {
  // Load event listeners 
  const loadEventListeners = () => {
    // Get UI selectors 
    const UISelectors = UICtrl.getSelectors();
  
    // Add item event 
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    
    // Edit icon click event 
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
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
  
  // Click edit item
  const itemEditClick = function (e) {

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
