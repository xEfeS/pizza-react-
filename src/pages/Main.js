import React, {useCallback, useEffect} from 'react';
import {Categories, SortPopup, PizzasItems, PizzaLoader} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory,setSortBy} from "../redux/reducers/filters";
import {fetchItems} from "../redux/reducers/pizzas";
import {addPizzaToCart} from "../redux/reducers/cart";


const categories = ['Новинки','Мясные', 'Вегетарианская', 'Пироги']
const sortItems = [
    {name: 'Популярности', type: 'popular'},
    {name: 'Цене', type: 'price'}
]

const Main = () => {
    const dispatch = useDispatch()
    const items = useSelector((state) => state.pizzas.items)
    const cartItems = useSelector((state) => state.cart.items)
    const isLoaded = useSelector((state) => state.pizzas.isLoaded)
    const {category, sortBy} = useSelector((state) => state.filters)
console.log(items)
    useEffect(() => {
        dispatch(fetchItems(category,sortBy))
    }, [category, sortBy])

    const selectCategory = useCallback((index) => {
        dispatch(setCategory(index))
    }, [])

    const selectSortType = useCallback((type) => {
        dispatch(setSortBy(type))
    }, [])

    const handleAddPizzaToCart = obj =>{
        dispatch(addPizzaToCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategories={selectCategory}
                    items={categories}
                />
                <SortPopup activeSortType={sortBy} items={sortItems} onClickSortType={selectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                        <PizzasItems clickAddPizzaToCart={handleAddPizzaToCart} key={obj.id}
                                     addedCart={cartItems[obj.id] && cartItems[obj.id].totalCount} {...obj}/>))
                    : /*Array(12).fill(0).map((_, index) => <PizzaLoader key={index}/>)*/
                    Array.from(Array(12), (x, index) => <PizzaLoader key={index}/>)
                }
            </div>
        </div>
    );
};

export default Main;
