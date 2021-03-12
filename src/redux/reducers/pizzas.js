import axios from "axios"

const SET_PIZZAS = 'SET_PIZZAS';
const SET_LOADED = 'SET_LOADED';

const initialState = {
    items: [],
    isLoaded: false
}

const pizzasReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PIZZAS:
            return {
                ...state,
                items: action.payload,
                isLoaded: true
            }
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.payload,
            }
    }
    return state
}


export const setItems = (items) => ({
        type: SET_PIZZAS,
        payload: items
    }
)

export const setLoaded = (payload) => ({
    type: SET_LOADED,
    payload
})


export const fetchItems = (category, sortBy) => dispatch => {
    dispatch(setLoaded(false))
    axios.get(`/pizzas?${category !== null ? `category=${category}` : ''
        }&_sort=${sortBy}`,
    ).then(({data}) => {
        // console.log(data);
        dispatch(setItems(data))
    })
}




export default pizzasReducer