export class CategoriesMeals {
    constructor() {

    }
    async fetchCategories(catName) {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`

        try {
            const response = await fetch(url)
            const categoryMeals = await response.json();
            console.log(categoryMeals);
            return categoryMeals;
        }
        catch (error) {
            console.log("Error fetching meals:", error);
            throw error;
        }
    }

}