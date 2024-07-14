import { MealDetails } from "./meal-details.js"
import { Categories } from "./categories.js"
import { CategoriesMeals } from "./category-meals.js"
import { Areas } from "./area.js"
import { Ingredients } from "./ingredients.js"
import { SearchMeal } from "./search-meal.js"
export class UIDisplay {
    constructor(mealsList) {
        this.homePageDisplay(mealsList)
        this.documentEventListeners(mealsList)


    }
    documentEventListeners(mealsList) {
        $('.links ul li').click(() => {
            this.closeNavTab()
        })
        $('.logo').click(() => {
            this.homePageDisplay(mealsList)
            this.closeNavTab()
            this.hideSearchBars()
            $('.contact-us').addClass('d-none')
            $('.MealDetails').addClass('d-none')
            $('.HomePage').removeClass('d-none')
        })

        $('#search').click(() => {
            $('.searchBars').removeClass('d-none')
            $('.contact-us').addClass('d-none')
            $('.searchBars input').val("")
            $('.home-meals').html(' ')
        })
        $('#category').click(() => {
            this.categoriesFetch()
            this.hideSearchBars()
            $('.contact-us').addClass('d-none')
            $('.MealDetails').addClass('d-none')
            $('.HomePage').removeClass('d-none')
        })
        $('#area').click(() => {
            this.areasFetch()
            this.hideSearchBars()
            $('.contact-us').addClass('d-none')

            $('.MealDetails').addClass('d-none')
            $('.HomePage').removeClass('d-none')
        })
        $('#ingredients').click(() => {
            this.ingredientsFetch()
            this.hideSearchBars()
            $('.contact-us').addClass('d-none')
            $('.MealDetails').addClass('d-none')
            $('.HomePage').removeClass('d-none')
        })
        $('#searchLetter').on('input', () => {
            if ($('#searchLetter').val() != "") {
                let letter = $('#searchLetter').val();
                this.searchMealByLetter(letter)
            }

        })
        $('#searchName').on('input', () => {
            let name = $('#searchName').val()
            this.searchMealByName(name)
        })
        $('#contact').click(() => {
            $('.contact-us').removeClass('d-none')
            $('.home-meals').html('')
            $('.contact-us input').val('')
        })
        // ^=======>Contact form
        $('.contact-us input').on('input', (e) => {
            const isValid = this.Validation(e);

            if (isValid) {
                $(e.target).next().removeClass('d-block').addClass('d-none');
            } else {
                $(e.target).next().removeClass('d-none').addClass('d-block');
            }

            const allInputsValid = $('.contact-us input').toArray().every(input => this.Validation({ target: input }));
            $('.sbmtButton').toggleClass('disabled', !allInputsValid);
        });
    }
    // ^===========>Loading screen
    showLoadingScreen() {
        $('#loadingScreen').removeClass('d-none');
    }

    hideLoadingScreen() {
        $('#loadingScreen').addClass('d-none');
    }

    // ^=========>Initial page display
    homePageDisplay(mealsList) {
        let homeBox = ``
        const maxItems = Math.min(20, mealsList.meals.length);
        for (let i = 0; i < maxItems; i++) {
            homeBox += ` <div class="col-md-3 g-4">
            <div id="${mealsList.meals[i].idMeal}" class="meal pointer position-relative overflow-hidden rounded-2"><img class="img-fluid" src="${mealsList.meals[i].strMealThumb}">
            <div class="layer position-absolute d-flex align-items-center p-2">
                    <h3>${mealsList.meals[i].strMeal}</h3>
                </div></div>
                
            </div>`
        }
        $('.home-meals').html(homeBox);

        $('.meal').click((e) => {
            this.closeNavTab()
            let mealID = $(e.currentTarget).attr('id');
            this.mealDetailsDisplay(mealID)
        })
        this.mealHover()
    }
    // ^=========>Hiding search bars
    hideSearchBars() {
        $('.searchBars').addClass('d-none')
    }
    // ^========>Close SideNav tab
    closeNavTab() {
        let navTabWidth = $('.nav-tab').outerWidth()
        let navLinksHeight = $('.links ul').outerHeight()
        if ($('.SideNav').css('left') === `0px`) {
            $('.close-icon').addClass('d-none')
            $('.open-icon').removeClass('d-none')
            $('.SideNav').animate({ left: `-${navTabWidth}px` })
            $('.links li').animate({ top: `${navLinksHeight}px` })
        }
        else { return }
    }
    // ^===========>Hovering on meals
    mealHover() {
        $(document).ready(() => {
            this.itemHover('meal')
        })
    }
    categoryHover() {
        $(document).ready(() => {
            this.itemHover('category')
        })
    }
    itemHover(itemName) {
        $(document).ready(function () {
            $(`.${itemName}`).mouseenter((e) => {

                $(e.currentTarget).find('.layer').stop().animate({ top: 0 }, 350)
            })
            $(`.${itemName}`).mouseleave((e) => {
                let itemHeight = $(e.currentTarget).outerHeight()
                $(e.currentTarget).find('.layer').stop().animate({ top: itemHeight }, 350)

            })
        })

    }
    // ^========>Meal Details 
    async mealDetailsDisplay(mealID) {
        this.showLoadingScreen()
        const mealDetailsInstance = new MealDetails(mealID)
        const mealDetails = await mealDetailsInstance.fetchMealDetails()
        this.hideLoadingScreen()
        $('.HomePage').addClass('d-none')
        $('.MealDetails').removeClass('d-none').addClass('d-block')
        let displayDetails = mealDetails.meals[0]
        $(`.details-image`).attr('src', `${displayDetails.strMealThumb}`)
        $('.details-title').html(displayDetails.strMeal)
        $('.details-paragraph').html(displayDetails.strInstructions)
        $('.details-area').html(displayDetails.strArea)
        $('.details-category').html(displayDetails.strCategory)
        $('.details-video').attr('href', `${displayDetails.strYoutube}`)
        $('.details-source').attr('href', `${displayDetails.strSource}`)
        if (displayDetails.strTags) {
            let displayTags = displayDetails.strTags.split(",")
            let tagsBox = ``
            for (let i = 0; i < displayTags.length; i++) {
                tagsBox += `<li class="alert alert-danger m-2 p-1">${displayTags[i]}</li>`
            }
            $('.details-tags').html(
                tagsBox
            )
        }
        let ingredientsBox = ``
        const ingredients = [];
        const measures = []
        Object.entries(displayDetails).forEach(([key, value]) => {
            if (key.includes('strIngredient') && value != '' && value != ' ') {
                ingredients.push(value);
            }
        });
        Object.entries(displayDetails).forEach(([key, value]) => {
            if (key.includes('strMeasure') && value != '' && value != ' ') {
                measures.push(value);
            }
        });
        for (let i = 0; i < ingredients.length; i++) {
            ingredientsBox += `<li class="alert alert-info m-2 p-1">${measures[i]} ${ingredients[i]}</li>`
        }
        this.closeNavTab()
        $('.details-recipes').html(ingredientsBox)
        $('.close-details').click((e) => {
            this.closeNavTab()
            $('.MealDetails').addClass('d-none')
            $('.HomePage').removeClass('d-none')
        })
    }
    // ^=======>Categories Display
    async categoriesFetch() {
        this.showLoadingScreen()
        const categoriesInstance = new Categories()
        const categories = await categoriesInstance.fetchCategories()
        this.hideLoadingScreen()
        this.categoriesDisplay(categories)
    }
    categoriesDisplay(categoriesList) {
        let homeBox = ``
        for (let i = 0; i < categoriesList.categories.length; i++) {
            homeBox += ` <div class="col-md-3 g-4">
            <div id="${categoriesList.categories[i].strCategory}" class="category pointer position-relative overflow-hidden rounded-2"><img class="img-fluid" src="${categoriesList.categories[i].strCategoryThumb}">
               <div class="layer position-absolute d-flex flex-column align-items-center p-2 text-center">
                    <h3>${categoriesList.categories[i].strCategory}</h3>
                    <p>${categoriesList.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
                </div>       
            </div>`
        }
        $('.home-meals').html(homeBox);

        $('.category').click((e) => {
            this.closeNavTab()
            let categoryName = $(e.currentTarget).attr('id');
            this.categoryMeals(categoryName)
            this.closeNavTab()

        })
        this.categoryHover()
    }
    async categoryMeals(categoryName) {
        const categoryMealsInstance = new CategoriesMeals()
        const categoryMeals = await categoryMealsInstance.fetchCategories(categoryName)
        this.homePageDisplay(categoryMeals)
    }
    // !==========>I was able to make a single API class for fetching areas list and filter rather than making an additional file like I did in categories, if I've time I'll do the same for categories fetching.
    // ^==========>Areas display
    async areasFetch() {
        this.showLoadingScreen()
        const areasInstance = new Areas()
        const areas = await areasInstance.fetchAreas()
        this.hideLoadingScreen()
        this.areasDisplay(areas)
    }
    areasDisplay(areasList) {
        let homeBox = ``
        for (let i = 0; i < areasList.meals.length; i++) {
            homeBox += `<div class="col-md-3 g-4">
            <div id="${areasList.meals[i].strArea}"class="area text-white text-center pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${areasList.meals[i].strArea}</h3>
            </div>
        </div>`
        }
        $('.home-meals').html(homeBox);
        $('.area').click((e) => {
            this.closeNavTab()
            this.areasMeals($(e.currentTarget).attr('id'))
        })
    }
    async areasMeals(area) {
        this.showLoadingScreen()
        const areaMealsInstance = new Areas()
        const areaMeals = await areaMealsInstance.fetchAreas(area, 'filter')
        this.hideLoadingScreen()
        console.log(areaMeals);
        this.homePageDisplay(areaMeals)
    }
    // ^=========>Ingredients Display
    async ingredientsFetch() {
        this.showLoadingScreen()
        let ingredientsInstance = new Ingredients()
        let ingredientsList = await ingredientsInstance.fetchIngredients()
        this.hideLoadingScreen()
        this.ingredientsDisplay(ingredientsList)
    }
    ingredientsDisplay(ingredientsList) {
        let homeBox = ``
        let maxNumber = Math.min(20, ingredientsList.meals.length)
        console.log(maxNumber);
        for (let i = 0; i < maxNumber; i++) {
            homeBox += `<div class="col-md-3 g-4">
            <div id="${ingredientsList.meals[i].strIngredient}"class="ingredient text-white text-center pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredientsList.meals[i].strIngredient}</h3>
                <p>${ingredientsList.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>`
        }
        $('.home-meals').html(homeBox);
        $('.ingredient').click((e) => {
            this.closeNavTab()
            this.ingredientsMeals($(e.currentTarget).attr('id'))

        })
    }
    async ingredientsMeals(ingredient) {
        this.showLoadingScreen()
        let ingredientsMealsInstance = new Ingredients()
        let ingredientsMealsList = await ingredientsMealsInstance.fetchIngredients(ingredient, 'filter')
        this.hideLoadingScreen()
        this.homePageDisplay(ingredientsMealsList)
    }

    // ^======>Search display
    async searchMealByLetter(letter) {
        this.showLoadingScreen()
        const searchLetterInstance = new SearchMeal()
        const searchLetter = await searchLetterInstance.fetchMealBySearch('f', letter)
        this.hideLoadingScreen()
        this.homePageDisplay(searchLetter)
    }
    async searchMealByName(name) {
        this.showLoadingScreen()
        const searchNameInstance = new SearchMeal()
        const searchName = await searchNameInstance.fetchMealBySearch('s', name)
        this.hideLoadingScreen()
        this.homePageDisplay(searchName)
    }

    // ^==========>Contact us form Validation
    Validation(e) {
        const regex = {
            nameInput: /^[a-z0-9_-]{3,15}$/,
            emailInput: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/,
            phoneInput: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            ageInput: /^(1[0-9]|[2-9][0-9]|100)$/,
            passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        };

        const inputId = $(e.target).attr('id');
        const inputValue = $(e.target).val().trim();

        let isValid = true;

        // Handle specific input validations
        if (inputId === 'repasswordInput') {
            const passwordValue = $('#passwordInput').val().trim();
            isValid = (inputValue === passwordValue);
        } else {
            isValid = regex[inputId].test(inputValue);
        }

        // Toggle alert message visibility
        if (isValid) {
            $(e.target).next().removeClass('d-block').addClass('d-none');
        } else {
            $(e.target).next().removeClass('d-none').addClass('d-block');
        }

        return isValid;
    }


}