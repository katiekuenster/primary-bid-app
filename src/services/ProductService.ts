const baseURL = 'https://fakestoreapi.com/products';

const getCategories = async () => {
    return fetch(`${baseURL}/categories`)
        .then(res => res.json());
}

const getProductsByCategory = async (category: string) => {
    return fetch(`${baseURL}/category/${category}`)
        .then(res => res.json());
}

const ProductService = {
    getCategories,
    getProductsByCategory
};

export default ProductService;