// Home page meals API module 
import { UIDisplay } from "./ui-display.js";
export class HomeMeals {
    constructor() {
        this.loadMeals()
    }
    async fetchHomeMeals() {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
        try {
            const response = await fetch(url)
            const homeMeals = await response.json();
            console.log(homeMeals);
            return homeMeals;
        }
        catch (error) {
            console.log("Error fetching meals:", error);
            throw error;
        }
    }

    async loadMeals() {

        $('#loadingScreen').removeClass('d-none');
        const mealsList = await this.fetchHomeMeals()
        const mealsDisplay = new UIDisplay(mealsList)
        $('#loadingScreen').addClass('d-none');
    }
}