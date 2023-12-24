import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const NavBar = ()=>{
    const [categories,setCategories] = useState(null);
    const getCategories =()=>{
        fetch(`http://localhost:8080/categories`)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                setCategories(data);
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    useEffect(() => {
        getCategories()
    }, []);

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {categories&& categories.map((cat)=>
                                <li key={cat.id} value={cat.id}>
                                    <Link to={`/categories/${cat.id}`} className="nav-link active">{cat.name}</Link>
                                </li>)}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;
