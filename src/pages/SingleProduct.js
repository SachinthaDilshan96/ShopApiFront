import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const SingleProduct = () =>{
    const params = useParams();
    const [product,setProduct] = useState(null);
    const getProductById = ()=>{
        fetch(`http://localhost:8080/products/${params.id}`)
            .then((response)=>{
                return response.json();
            }).then((data)=>{
                setProduct(data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getProductById()
    },[])
    return(
        <>
            {product&&
            <div>
                <h1>{product.name}</h1>
                <p>{product.price} LKR</p>
                <p>{product.qty}</p>
            </div>}
        </>
    )
}
export default SingleProduct;
