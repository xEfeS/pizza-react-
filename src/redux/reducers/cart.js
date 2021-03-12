const ADD_PIZZA_CART = 'ADD_PIZZA_CART'
const PLUS_CART_ITEM = 'PLUS_CART_ITEM'
const MINUS_CART_ITEM = 'MINUS_CART_ITEM'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

function getSumProperties(arr, property) {
    return arr.reduce((prev, curr) => prev + curr[property], 0);
}

function addCartItem(item) {
    item.count++;
    item.totalPrice = item.count * item.price;
}

function subCartItem(item) {
    item.count--;
    item.totalPrice = item.count * item.price;
}

function addPizza(allPizzas, currPizza) {
    for (let i = 0; i < allPizzas.length; i++) {
        if (
            allPizzas[i].type === currPizza.type &&
            allPizzas[i].size === currPizza.size
        ) {
            addCartItem(allPizzas[i]);
            return allPizzas;
        }
    }
    allPizzas.push(currPizza);
    return allPizzas;
}

function deletePizza(allItems, id, index) {
    const {items} = allItems[id];
    const {count} = items[index];
    allItems[id].totalCount -= count;
    items.splice(index, 1);
    if (!items.length) {
        delete allItems[id];
    }

    return allItems;
}

const cartReducer = (state = initialState, action) => {
    const allItems = JSON.parse(JSON.stringify(state.items));
    switch (action.type) {
        case ADD_PIZZA_CART: {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : addPizza(state.items[action.payload.id].items, action.payload);

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalCount: getSumProperties(currentPizzaItems, "count"),
                },
            };

            return {
                ...state,
                items: newItems,
                totalCount: state.totalCount + action.payload.count,
                totalPrice: state.totalPrice + action.payload.totalPrice,
            };
        }
        case PLUS_CART_ITEM: {
            const {id, index} = action.payload;
            const currPizzas = allItems[id].items[index];
            addCartItem(currPizzas);
            allItems[id].totalCount++;

            return {
                ...state,
                items: allItems,
                totalCount: state.totalCount + 1,
                totalPrice: state.totalPrice + currPizzas.price,
            };
        }
        case MINUS_CART_ITEM: {
            const {id, index} = action.payload;
            const currPizzas = allItems[id].items[index];
            if (currPizzas.count > 1) {
                subCartItem(currPizzas);
                allItems[id].totalCount--;

                return {
                    ...state,
                    items: allItems,
                    totalCount: state.totalCount - 1,
                    totalPrice: state.totalPrice - currPizzas.price,
                };
            }
            return {
                ...state,
            };
        }
        case REMOVE_CART_ITEM: {
            const {id, index} = action.payload;
            const {count, totalPrice} = state.items[id].items[index];

            const updatedItems = deletePizza(
                allItems,
                action.payload.id,
                action.payload.index
            );

            return {
                ...state,
                items: updatedItems,
                totalCount: state.totalCount - count,
                totalPrice: state.totalPrice - totalPrice,
            };
        }
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
};


export const addPizzaToCart = (obj) => ({
    type: ADD_PIZZA_CART,
    payload: obj,
});

export const plusItem = (obj) => ({
    type: PLUS_CART_ITEM,
    payload: obj,
});

export const minusItem = (obj) => ({
    type: MINUS_CART_ITEM,
    payload: obj,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const removeCartItem = (obj) => ({
    type: REMOVE_CART_ITEM,
    payload: obj,
});


export default cartReducer;