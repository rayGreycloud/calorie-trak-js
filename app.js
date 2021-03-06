// App controller
const App = ((UICtrl, StorageCtrl, ItemCtrl) => {
  // Load event listeners 
  const loadEventListeners = () => {
    // Get UI selectors 
    const UISelectors = UICtrl.getSelectors();
    
    // Disable submit on enter keypress 
    document.addEventListener('keypress', (e) => {
      // Check if enter key pressed 
      if (e.keyCode === 13 || e.which ===13) {
        e.preventDefault();
        return false;
      }
    });
  
    // Add item event 
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    
    // Edit icon click event 
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    
    // Update item event 
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);  
      
    // Delete item event 
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);  
    
    // Clear all items event 
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);  
      
    // Back button event 
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);    
  }
  
  // Add item submit 
  const itemAddSubmit = (e) => {
    // Get form input 
    const input = UICtrl.getItemInput();
    // check inputs 
    if (input.name !== '' && input.calories !== '') {
      // Add item 
      const newItem = ItemCtrl.addItem(input.name, input.calories); 
      // Add to localStorage 
      StorageCtrl.storeItem(newItem);
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
  const itemEditClick = (e) => {
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
  
  // Update item submit 
  const itemUpdateSubmit = (e) => {
    // Get item input 
    const { name, calories } = UICtrl.getItemInput();
    // Update item in data structure with input
    const updatedItem = ItemCtrl.updateItem(name, calories);
    // Update in ls 
    StorageCtrl.updateItem(updatedItem);
    // Update item in UI 
    UICtrl.updateListItem(updatedItem);
    // Get total calories 
    const totalCalories = ItemCtrl.getTotalCalories();
    // Update total calories display 
    UICtrl.showTotalCalories(totalCalories);
    // Reset inputs 
    UICtrl.clearEditState();    
    // Reset current item 
    ItemCtrl.setCurrentItem(null);
    
    e.preventDefault();
  }
  
  // Delete item submit 
  const itemDeleteSubmit = (e) => {
    // Get current item 
    const currentItem = ItemCtrl.getCurrentItem();
    // Delete item from data structure 
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from ls 
    StorageCtrl.deleteItem(currentItem.id);
    // Delete item from UI 
    UICtrl.deleteListItem(currentItem.id);
    // Get total calories 
    const totalCalories = ItemCtrl.getTotalCalories();
    // Update total calories display 
    UICtrl.showTotalCalories(totalCalories);
    // Reset inputs 
    UICtrl.clearEditState();    
    // Reset current item 
    ItemCtrl.setCurrentItem(null);    
    
    e.preventDefault();
  }
  
  // Clear all items event 
  const clearAllItemsClick = (e) => {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Clear items from ls 
    StorageCtrl.clearItems();
    // Get total calories     
    const totalCalories = ItemCtrl.getTotalCalories();
    // Update total calories display 
    UICtrl.showTotalCalories(totalCalories);    
    // Remove all items from UI 
    UICtrl.removeItems();
    // Hide UL 
    UICtrl.hideList();
    // Reset inputs 
    UICtrl.clearEditState();    
    // Reset current item 
    ItemCtrl.setCurrentItem(null);        
    
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
  
})(UICtrl, StorageCtrl, ItemCtrl);

// Initializing app 
App.init();
