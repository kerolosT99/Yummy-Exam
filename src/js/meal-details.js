
export class MealDetails {
    constructor(mealID) {
        this.mealID = mealID;
    }

    async fetchMealDetails() {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.mealID}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch meal details');
            }
            const mealDetails = await response.json();
            console.log(mealDetails);
            return mealDetails;
        } catch (error) {
            throw new Error('Error fetching meal details:', error);
        }
    }
}
