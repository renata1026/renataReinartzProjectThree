import {useEffect, useState } from 'react';
//import axios//
import axios from 'axios';//pulled from Node modules folder
// import Form from "./components/Form";
import Form from './Form';
import Footer from './Footer';
import Header from './Header';
import importImg from '../images/productNotFound.png';
import Loader from './Loader';
import Navbar from './Navbar';
import Results from './Results';


const Makeup = () => {
    //products are a variable containing our pieces of products
    //setProducts is a function to update products
    //use state is setup for products
    const [products, setProducts] = useState([]);
    //Use state is set to filtered products. Filtered products will be rendered to the page.
    const [filteredProducts,setFilteredProducts] = useState([]);
    //Use state is set to userChoiceProduct.
    const [userChoiceProduct, setUserChoiceProduct] = useState("");
    //Use state is set to userChoicePrice.
    const [userChoicePrice, setUserChoicePrice] = useState("");
    //Use state is set to userQuery.
    const [userQuery,setUserQuery] = useState("");
    
    const [userChoicePriceQuery, setUserChoicePriceQuery] = useState("");
    //We are setting the default state of loading to true
    const [loading, setLoading] = useState(true);
    //We are setting the default state of formError to false
    const[formError,setFormError] = useState(false);

    const handleFormChange = (event) => {
        setUserChoiceProduct(event.target.value)
    }
    // Creating a handlePriceChange function that will update the user price choice state based on their selection
    const handlePriceChange = (event) =>{
        setUserChoicePrice(event.target.value)
    }
    //handleFormSubmit function will prevent the form from refreshing
    const handleFormSubmit = (event) => {
        event.preventDefault()
        setUserQuery(userChoiceProduct)
        setUserChoicePriceQuery(userChoicePrice)
    }
    // hook into the inital/first render of APP 
    useEffect(() => {
        //API request
        axios({
            url: "https://makeup-api.herokuapp.com/api/v1/products.json",
            })
            .then(response => {
                setProducts(response.data);//all products will be rendered
                setFilteredProducts(response.data);//filtered products will be      
                 //rendered.
                //loading is set to false so it will stop loading once products are loaded on the page
                setLoading(false)
                setFormError(false);
            })
            .catch(error => setFormError(true)) // sets an error if the API returns and error
            
    }, [])
    // created a useEffect to store the filtered products which will return the product type
    useEffect(()=> {
        const filteredNewProducts = products.filter((product) => {
            return product.product_type === userQuery
        })
        setFilteredProducts(filteredNewProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userQuery])
    
     //created a filter for the price range $1-10, $10-$15, and $15-25
    const displayProducts = 
        filteredProducts.filter((price) => {
            return (
                // filter prices based on selected drop down menu
                (userChoicePriceQuery === "1-10") ?
                    parseInt(price.price) > 1 && parseInt(price.price) < 10 :

                (userChoicePriceQuery === "10-15") ?
                    parseInt(price.price) > 11 && parseInt(price.price) <= 14 :

                (userChoicePriceQuery === "15-25") ?
                    parseInt(price.price) > 15 : parseInt(price.price) > 15
            )        
            //filtering the products to 20 per page
            }).slice(0, 20)
    
    return (
                <>
                <Navbar />
                <Header />
                <div className="wrapper">
                    {/* passing the props from makeup AKA parent to the form AKA child */}
                    <Form handleFormChange={handleFormChange}
                    handlePriceChange={handlePriceChange}
                    handleFormSubmit={handleFormSubmit}
                    userChoiceProduct={userChoiceProduct}
                    userChoicePrice={userChoicePrice}
                    />
                    <Results
                    formError={formError}
                    />
                    {/* <Form /> */}
                    {/* if page is loading then return loader if loading is complete than return products */}
                    {loading
                        ? < Loader />
                    : <div className="products">
                        {/* filter the price  */}
                        {displayProducts.length === 0 ? <img src={importImg} id="notFound"alt='import'></img> : <>{
                            displayProducts.map((product,index) => (
                                //will load selections from the API
                                <div key={product.id}
                                    className="product-container">
                                    <img src={`https://${product.api_featured_image}`} alt=""></img>
                                    <p className="name">{product.name}</p>
                                    <p className="price">PRICE:${Number(product.price).toFixed(2)}</p>
                                    <div className="buttons">
                                        <button className="addToCartBttn" id={index}>Add to Cart</button>
                                    </div>
                                </div>

                            ))
                        }</>}
                        
                    </div>
                    }
                </div>
                <Footer />
                </>
            
        );
};


export default Makeup;
