export const BASE_URL = "http://feedback.meridiantdigital.com/api/";

export const API_URL = {
    LOGIN: "users/Login",
    SIGN_UP: "users/Signup",
    GET_ALL_RESTAURANT: "Restaurants/GetAllRestaurants",
    POST_REVIEW: "Restaurants/PostFeedback",
    FOLLOW_USER: "users/Postfollower",
    UNFOLOW_USER: "users/Removefollower",
    SEARCH_RESTAURANTS: "Restaurants/SearchRestuarants",
    GET_RESTAURANT_BY_FAMOUS: "Restaurants/GetAllFamous",
    POST_RESTAURANT: "Restaurants/PostRestuarant",
    GET_SINGLE_RESTAURANT_BY_ID: "Restaurants/GetSingleRestaurant?restuarantId=",//60db01629cc7e846b862bb99"
    GET_FOLLOW_STATUS: "users/GetfollowerStatus?userid=", //60d37da249803a54a061585e&followerid=60d37da249803a54a061585e
    GET_USER_PROFILE: "users/GetUserProfile?userId=", //60db07df6ab6f05390bd3fad
}

export const USER_INFO = "USER_INFO"
export const USER_ID = "USER_ID"
