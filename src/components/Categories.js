import React from 'react';

const Categories = React.memo(({activeCategory,items, onClickCategories}) => {

        return (
            <div className="categories">
                <ul>
                    <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategories(null)}>Все</li>
                    {items &&
                    items.map((item, index) => (
                        <li className={activeCategory === index ? 'active' : ''}
                            onClick={() => onClickCategories(index)}
                            key={`${item}_${index}`}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
)

export default Categories;
