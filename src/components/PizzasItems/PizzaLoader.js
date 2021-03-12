import React from "react"
import ContentLoader from "react-content-loader"

const PizzaLoader = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#e4e2e2"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="140" r="140" />
        <rect x="0" y="326" rx="21" ry="21" width="276" height="76" />
        <rect x="0" y="427" rx="5" ry="5" width="87" height="26" />
        <rect x="132" y="417" rx="25" ry="25" width="141" height="41" />
        <rect x="0" y="290" rx="0" ry="0" width="279" height="22" />
    </ContentLoader>
)

export default PizzaLoader