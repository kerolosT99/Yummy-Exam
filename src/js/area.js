export class Areas {
    constructor() {

    }
    async fetchAreas(area = 'list', filter = 'list') {
        const url = `https://www.themealdb.com/api/json/v1/1/${filter}.php?a=${area}`
        try {
            const response = await fetch(url)
            const areas = await response.json()
            console.log(areas);
            return areas
        }
        catch (e) {
            console.log("Error fetching areas:", e);
            throw (e)
        }
    }
}