export class SearchMeal {
    constructor() {

    }

    async fetchMealBySearch(searchType = 's', searchMeal = '') {
        // Search type with S for search by name, search with F for first letter search.
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?${searchType}=${searchMeal}`
        try {
            const response = await fetch(url)
            const searchMeal = await response.json()
            console.log(searchMeal);
            return searchMeal
        }
        catch (e) {
            console.log(`Couldn't search for meal:`, e);
            throw e
        }
    }
}