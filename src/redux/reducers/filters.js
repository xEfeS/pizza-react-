const SET_SORT_BY = 'SET_SORT_BY';
const SET_CATEGORY = 'SET_CATEGORY';

const initialState = {
    category: null,
    sortBy: 'popular',
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case  SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
    }
    return state
}


export const setSortBy = (name) => ({
        type: SET_SORT_BY,
        payload: name
    }
)

export const setCategory = (index) => ({
    type: SET_CATEGORY,
    payload: index
})

export default filtersReducer