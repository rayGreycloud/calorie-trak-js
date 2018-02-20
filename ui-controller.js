// UI controller 
const UICtrl = (() => {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    backBtn: '.back-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    clearBtn: '.clear-btn',
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
      // Insert item into UI
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);    
    },
    updateListItem: (updatedItem) => {
      // Get items from DOM
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Convert node list into array (to facilitate iteration)
      listItems = Array.from(listItems);
      // Iterate over items 
      listItems.forEach(listItem => {
        // Get item id
        const listItemId = listItem.getAttribute('id');
        // Check if item id matches update item id 
        if (listItemId === `item-${updatedItem.id}`) {
          // Inject updated item into li 
          document.querySelector(`#${listItemId}`).innerHTML = `
            <strong>${updatedItem.name}</strong> - <em>${updatedItem.calories} calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil fa-lg"></i>
            </a>
          `;
        }
      });
    },
    deleteListItem: (id) => {
      // Create element #id from item id 
      const itemId = `#item-${id}`;
      // Get item node 
      const item = document.querySelector(itemId);
      // Remove node 
      item.remove();
    },
    removeItems: () => {
      // Get node list of items 
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Convert into array 
      listItems = Array.from(listItems);
      // Iterate array 
      listItems.forEach(item => {
        item.remove();
      });
    },
    getSelectors: () => UISelectors,    
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
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
    }
  }
})();
