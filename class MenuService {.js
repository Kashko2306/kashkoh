class MenuService {
    constructor() {
      this.menu = [];
      this.categories = [];
    }
  
    // Управление меню
    addDish(dish) {
      this.menu.push(dish);
      this.updateCategories(dish.category);
      return dish;
    }
  
    removeDish(dishId) {
      const index = this.menu.findIndex(dish => dish.id === dishId);
      if (index !== -1) {
        const removedDish = this.menu.splice(index, 1)[0];
        this.updateCategories(removedDish.category);
        return removedDish;
      }
      return null;
    }
  
    updateDish(dishId, updates) {
      const dish = this.menu.find(d => d.id === dishId);
      if (dish) {
        Object.assign(dish, updates);
        this.updateCategories(dish.category);
        return dish;
      }
      return null;
    }
  
    getDishes(categoryId) {
      if (categoryId) {
        return this.menu.filter(dish => dish.category === categoryId);
      }
      return this.menu;
    }
  
    // Управление категориями
    addCategory(category) {
      this.categories.push(category);
      return category;
    }
  
    removeCategory(categoryId) {
      const index = this.categories.findIndex(cat => cat.id === categoryId);
      if (index !== -1) {
        return this.categories.splice(index, 1)[0];
      }
      return null;
    }
  
    updateCategory(categoryId, updates) {
      const category = this.categories.find(cat => cat.id === categoryId);
      if (category) {
        Object.assign(category, updates);
        return category;
      }
      return null;
    }
  
    getCategories() {
      return this.categories;
    }
  
    // Вспомогательный метод
    updateCategories(categoryId) {
      if (!this.categories.some(cat => cat.id === categoryId)) {
        this.addCategory({ id: categoryId, name: `Category ${categoryId}` });
      }
    }
  }
  
  // Пример использования
  const menuService = new MenuService();
  
  // Добавление блюд
  const dish1 = menuService.addDish({ id: 1, name: 'Spaghetti Bolognese', category: 1, price: 12.99 });
  const dish2 = menuService.addDish({ id: 2, name: 'Grilled Salmon', category: 2, price: 18.50 });
  
  // Получение списка блюд
  console.log(menuService.getDishes()); // [dish1, dish2]
  console.log(menuService.getDishes(1)); // [dish1]
  
  // Обновление блюда
  menuService.updateDish(dish1.id, { price: 14.99 });
  
  // Удаление блюда
  menuService.removeDish(dish2.id);
  
  // Управление категориями
  menuService.addCategory({ id: 3, name: 'Desserts' });
  menuService.updateCategory(3, { name: 'Sweet Treats' });
  menuService.removeCategory(2);