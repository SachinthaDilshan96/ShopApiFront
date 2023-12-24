import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import NavBar from "./components/NavBar";

const Home = () =>{
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [name,setName] = useState(null);
    const [price,setPrice] = useState(null);
    const [qty,setqty] = useState(null);
    const [categoryId,setCategory]  = useState(null);

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
    const getCategories = () =>{
        fetch("http://localhost:8080/categories")
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setCategories(data);
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const handleName = (event)=>{
        setName(event.target.value);
    }

    const handlePrice = (event)=>{
        setPrice(event.target.value);
    }

    const handleQty = (event)=>{
        setqty(event.target.value);
    }

    const handleCategory = (event)=>{
        setCategory(event.target.value);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        let data = {
            "name":name,
            "price":price,
            "qty":qty,
            "categoryId":categoryId
        }
        fetch("http://localhost:8080/products",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            setProducts([...products,data]);
            setPrice(null);
            setName(null);
            setProducts(null);
            setqty(null);
            setCategory(null);

        }).catch((error)=>{
            console.log(error);
        })

    }

    useEffect(() => {
       getProducts();
       getCategories();
    }, []);

    return(
        <>
          <NavBar/>
            <ol>
                {products&& products.map((product)=>
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>)}
            </ol>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                    <input type={"text"} required onChange={handleName}/>
                </div>
                <div>
                    <label>Product Price</label>
                    <input type={"text"} required onChange={handlePrice}/>
                </div>
                <div>
                    <label>Product Qty</label>
                    <input type={"text"} required onChange={handleQty}/>
                </div>
                <div>
                    <label>Category</label>
                    <select required onChange={handleCategory}>
                        <option>Please select</option>
                        {categories&& categories.map((cat)=>
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>)}
                    </select>

                </div>
                <button className={"btn btn-primary"} type={"submit"}>Save Product</button>
            </form>
        </>
    )
}

export default Home;
