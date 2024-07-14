import { HomeMeals } from "./home-meals.js";
const showMeals = new HomeMeals();


// ^=========>Handling side-nav tab
let navTabWidth = $('.nav-tab').outerWidth()
let navLinksHeight = $('.links ul').outerHeight()
$(document).ready(function () {
    $('.SideNav').css('left', `-${navTabWidth}px`)
    $('.links li').css('top', `${navLinksHeight}px`)
})

$('.open-icon').click(function () {
    $('.open-icon').addClass('d-none')
    $('.close-icon').removeClass('d-none')
    $('.SideNav').animate({ left: 0 })
    $('.links li').animate({ top: 0 }, 600)
})
$('.close-icon').click(function () {
    $('.close-icon').addClass('d-none')
    $('.open-icon').removeClass('d-none')
    $('.SideNav').animate({ left: `-${navTabWidth}px` },)
    $('.links li').animate({ top: `${navLinksHeight}px` })
})

// ^============>Handling letter search
$('#searchLetter').on('input', () => {
    $('#searchLetter').val($('#searchLetter').val().substring(0, 1))
}) 
