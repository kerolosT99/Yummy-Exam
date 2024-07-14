export class Categories {
    constructor() {

    }
    async fetchCategories() {
        const url = `https://www.themealdb.com/api/json/v1/1/categories.php`

        try {
            const response = await fetch(url)
            const categories = await response.json();
            console.log(categories);
            return categories;
        }
        catch (error) {
            console.log("Error fetching categories:", error);
            throw error;
        }
    }
   
}