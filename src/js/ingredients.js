export class Ingredients {
    constructor() {

    }
    async fetchIngredients(ingredient = 'list', filter = 'list') {
        const url = `https://www.themealdb.com/api/json/v1/1/${filter}.php?i=${ingredient}`
        try {
            const response = await fetch(url)
            const ingredients = await response.json()
            console.log(ingredients);
            return ingredients
        }
        catch (e) {
            console.log("Error fetching ingredients:", e);
            throw (e)
        }
    }
}