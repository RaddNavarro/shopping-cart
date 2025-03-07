export const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
}

export const Products = [
    {
        id: 1,
        category: 'men',
        productName: 'New Balance Men`s 608 V5 Casual Comfort Cross Trainer',
        productPrice: 50.05,
        description: 'ABZORB midsole cushioning aids in absorbing forceful impacts',
        productImage: require('../database/images/men/newbalance1.png'),
        productImageList: [
            require('../database/images/men/newbalance1.png'),
            require('../database/images/men/newbalance2.png'),
            require('../database/images/men/newbalance3.png')
        ],
        quantity: 1

    },
    {
        id: 2,
        category: 'men',
        productName: 'adidas Men`s VL Court 3.0 Sneaker',
        productPrice: 57.67,
        description: 'Men`s leather sneakers with skateboarding style',
        productImage: require('../database/images/men/adidasMen1.png'),
        productImageList: [
            require('../database/images/men/adidasMen1.png'),
            require('../database/images/men/adidasMen2.png'),
            require('../database/images/men/adidasMen3.png'),
            require('../database/images/men/adidasMen4.png'),
            require('../database/images/men/adidasMen5.png')
        ],
        quantity: 1

    },
    {
        id: 3,
        category: 'women',
        productName: 'adidas Women`s VL Court 3.0 Sneaker',
        productPrice: 74.05,
        description: 'SUEDE UPPER: Soft suede upper for a classic footwear look and feel',
        productImage: require('../database/images/women/adidas1.png'),
        productImageList: [
            require('../database/images/women/adidas1.png'),
            require('../database/images/women/adidas2.png'),
            require('../database/images/women/adidas3.png'),
            require('../database/images/women/adidas4.png'),
            require('../database/images/women/adidas5.png')
        ],
        quantity: 1

    },
    {
        id: 4,
        category: 'women',
        productName: 'Skechers Women`s Hands Free Slip-ins Summits Dazzling Haze Sneaker',
        productPrice: 49.68,
        description: 'Exclusive Heel Pillow holds your foot securely in place',
        productImage: require('../database/images/women/sketchers1.png'),
        productImageList: [
            require('../database/images/women/sketchers1.png'),
            require('../database/images/women/sketchers2.png'),
            require('../database/images/women/sketchers3.png')
        ],
        quantity: 1

    },
    {
        id: 5,
        category: 'women',
        productName: 'Skechers Women`s Hands Free Slip-Ins Go Walk Flex-Relish Sneaker',
        productPrice: 49.68,
        description: 'Lightweight, responsive ULTRA GO cushioning',
        productImage: require('../database/images/women/sketchers2-1.png'),
        productImageList: [
            require('../database/images/women/sketchers2-1.png'),
            require('../database/images/women/sketchers2-2.png'),
            require('../database/images/women/sketchers2-3.png')
        ],
        quantity: 1

    }
]