import {useEffect, useState} from "react";
import axios from "axios";

const Checkout =()=>{
    const [products,setProducts] = useState(null);
    const [orderProducts,setOrderProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [tax,setTax] = useState(0);
    const  getProducts =async ()=>{
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);
    }

    const createOrder =async ()=>{
        const productIds = orderProducts.map(obj=>obj.id);
        const data = {
            "products":productIds
        }
        const response = await axios.post("http://localhost:8080/orders",data);
        if (response.status===201){
            setOrderProducts([]);
            setTotal(0);
            setTax(0);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    useEffect(()=>{
        setTax(total*0.15);
    },[total])
    return(
        <>
            <div className={"container-fluid"}>
                <h1>Checkout</h1>
                 <div className={"row"}>
                     <div className={"col-md-6"}>
                         <h2>Products</h2>
                         {products&& products.map(product=>
                             <div className={"product-box px-2 py-2"} key={product.id}>
                                 <p>{product.name} - {product.price}</p>
                                 <button onClick={()=>{
                                       setOrderProducts([...orderProducts,product]);
                                       setTotal(total+product.price);
                                 }} className={"btn btn-sm btn-primary"}>Add to Order</button>
                             </div>)}
                     </div>
                     <div className={"col-md-6"}>
                         <h2>Order</h2>
                         <table className={"w-100"}>
                             <thead>
                             <tr>
                                 <th>Product Id</th>
                                 <th>Product Name</th>
                                 <th>Price</th>
                             </tr>
                             </thead>
                             <tbody>
                             {orderProducts.map((product)=>(
                                 <tr key={product.id}>
                                     <td>{product.id}</td>
                                     <td>{product.name}</td>
                                     <td>{product.price}</td>
                                 </tr>
                             ))}
                             </tbody>
                             <thead>
                             <tr>
                                 <th colSpan={2}>
                                     Total
                                 </th>
                                 <th>
                                     {total}
                                 </th>
                             </tr>
                             </thead>
                             <thead>
                             <tr>
                                 <th colSpan={2}>
                                     Tax
                                 </th>
                                 <th>
                                     {tax}
                                 </th>
                             </tr>
                             </thead>
                         </table>
                         <button className={"btn btn-secondary"} onClick={createOrder}>Complete Order</button>
                     </div>
                 </div>
            </div>
        </>
    )
}

export default Checkout;
