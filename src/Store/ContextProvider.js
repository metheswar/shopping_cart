
import React, { useEffect, useState } from 'react';
import Context from './Context';

const ContextProvider = (props) => {
    const [isAdminChecked, setIsAdminChecked] = useState(false);
    const [isUserChecked, setIsUserChecked] = useState(false);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [color, setColor] = useState('');
    const [file, setFile] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems] = useState([])
    
    const [editedProduct, setEditedProduct] = useState({});

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            try {
                const parsedProducts = JSON.parse(storedProducts);
                setProducts(parsedProducts);
            } catch (error) {
                console.error('Error parsing products from local storage:', error);
            }
        }
        const storedCartItems = localStorage.getItem('cartItems')
        if(storedCartItems){
            try{
                const parsedCartItems = JSON.parse(storedCartItems)
                setCartItems(parsedCartItems)
            }catch(error){
                console.error(error)
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <Context.Provider value={{
            isAdminChecked,
            setIsAdminChecked,
            isUserChecked,
            setIsUserChecked,
            name,
            setName,
            gender,
            setGender,
            quantity,
            setQuantity,
            price,
            setPrice,
            currency,
            setCurrency,
            color,
            setColor,
            file,
            setFile,
            products,
            setProducts,
            cartItems,
            setCartItems,
            editedProduct, 
            setEditedProduct
        }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
