import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Categories = ()=>{
    const params = useParams();
    const [category,setCategory] = useState(null);
    const [products,setProducts] = useState(null);
    const getCategory =()=>{
        fetch(`http://localhost:8080/categories/${params.id}`)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setCategory(data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    const getProductsByCategory =()=>{
        fetch(`http://localhost:8080/categories/${params.id}/products`)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setProducts(data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    useEffect(() => {
       getCategory();
       getProductsByCategory()
    }, []);

    return(
        <>
            {category&&<h1>{category.name}</h1>}
            <ul>
                {products&& products.map((product)=>
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>)}
            </ul>
        </>
    )
}

export default Categories;
