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
