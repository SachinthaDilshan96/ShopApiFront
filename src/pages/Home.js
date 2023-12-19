import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Home = () =>{
    const [products, setProducts] = useState(null);
    const getProducts = ()=>{
        fetch("http://localhost:8080/products")
            .then((response)=> {
                return response.json()
            })
            .then((data)=>{
                setProducts(data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    useEffect(() => {
       getProducts()
    }, []);

    return(
        <>
            <h1>Home</h1>
            <ul>
                <li>
                    <Link to={"/products"}>Products</Link>
                </li>
            </ul>
            <ol>
                {products&& products.map((product)=>
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>)}
            </ol>
            <form>
                <div>
                    <label>Product Name</label>
                    <input type={"text"} required/>
                </div>
                <div>
                    <label>Product Price</label>
                    <input type={"text"} required/>
                </div>
                <div>
                    <label>Product Qty</label>
                    <input type={"text"} required/>
                </div>
                <div>
                    <label>Category</label>
                    <select required>
                        <option>Please select</option>
                    </select>
                </div>
                <button type={"submit"}>Save Product</button>
            </form>
        </>
    )
}

export default Home;
