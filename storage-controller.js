// Storage Controller 
const StorageCtrl = (() => {
  // Public methods 
  return {
    
    // My refactored version 
    storeItem: (newItem) => {
      // Get what's in ls 
      const itemsLS = localStorage.getItem('items');
      // Set items to empty array or ls items 
      const items = itemsLS === null ? [] : JSON.parse(itemsLS);
      // Add new item to local array
      items.push(newItem);
      // Stringify and set in ls 
      localStorage.setItem('items', JSON.stringify(items));
    }, 
    getItems: () => {
      // Get what's in ls 
      const itemsLS = localStorage.getItem('items');
      // return items or empty array 
      return itemsLS === null ? [] : JSON.parse(itemsLS);
    },
    
    // // Instructor version 
    // storeItem: (newItem) => {
    //   // Initialize working variable 
    //   let items;      
    //   // Check for stored items 
    //   if (localStorage.getItem('items') === null) {
    //       items = [];
    //     // If empty, add new item to local array
    //     items.push(newItem);
    //     // Stringify and set in ls 
    //     localStorage.setItem('items', JSON.stringify(items));
    //   } else {
    //     // If existing, get items from ls 
    //     items = JSON.parse(localStorage.getItem('items'));
    //     // Add item 
    //     items.push(newItem);
    //     // Stringify and set in ls 
    //     localStorage.setItem('items', JSON.stringify(items));         
    //   }    
    // },
    // getItems: () => {
    //   let items;
    // 
    //   if (localStorage.getItem('items') === null) {
    //     items = [];
    //   } else {
    //     items = JSON.parse(localStorage.getItem('items'));
    //   }
    //   return items;
    // }
    
  }  // return
})();

