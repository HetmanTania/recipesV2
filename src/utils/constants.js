import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

export const MAIN_URL = 'https://api.spoonacular.com/recipes/';
export const INGREDIENTS_URL = 'https://spoonacular.com/cdn/ingredients';

export const API_KEY = process.env.VUE_APP_API_KEYv2;

export const MEAL_TYPES = {
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
    userInput: {
        'invalid-name': 'The username must contain from 3 to 10 characters of the Latin alphabet',
        'invalid-email': 'The mailing address must contain from 3 to 10 characters of the Latin alphabet in the format example@example.com',
        'invalid-password': 'The password must contain symbols and/or numbers',
    },
    password: {
        'auth/wrong-password': 'Your password is incorrect',
        'empty-password': 'Enter your password',
    },
    email: {
        'auth/user-not-found': 'User with this email was not found',
        'auth/invalid-email': 'Your email is incorrect',
        'auth/email-already-in-use' : 'Email already in use',
        'empty-email': 'Enter your email',
    },
    globalError: {
        'auth/user-disabled': 'The user account has been disabled by the administrator',
        'auth/too-many-requests': 'There were too many failed login attempts. Temporary login ban',
        'auth/internal-error': 'Firebase internal server error',
    },
    defaultError: {
        'default': 'An error occurred, please try later'
    }
}

gsap.registerPlugin(CustomEase);

