export const MAIN_URL = 'https://api.spoonacular.com/recipes/';
export const INGREDIENTS_URL = 'https://spoonacular.com/cdn/ingredients';

console.log( process.env, ' process.env.');
export const API_KEY = process.env.VUE_APP_API_KEY;

export const MEALTYPES = {
    'main course': {
        title: "Main Course",
        value: 'main course'
    },
    'side dish': {
        title: "Side Dish",
        value: 'ide dish'
    },
    'appetizer': {
        title: "Appetizer",
        value: 'appetizer'
    },
    'salad': {
        title: "Salad",
        value: 'salad'
    },
    'soup': {
        title: "Soup",
        value: 'soup'
    },
    'snack': {
        title: "Snack",
        value: 'snack'
    },
    'dessert': {
        title: "Dessert",
        value: 'dessert'
    },
    'breakfast': {
        title: "Breakfast",
        value: 'breakfast'
    },
    'sauce': {
        title: "Sauce",
        value: 'sauce'
    },
    'drink': {
        title: "Drink",
        value: 'drink'
    },
}

export const ERRORS_APP = {
    'auth/email-already-in-use' : 'Email already in use'
}