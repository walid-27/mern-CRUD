import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import "./update.css";
function UpdatePrdct() {
  //from satates
      const [title, setTitle] = useState("");
      const [price, setPrice] = useState("");
      const [description, seteDscription] = useState("");
      const [image, setImage] = useState(null);
  //product selected
    const [select,setSelect]= useState(null);  
  //search products 
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");


  async function productss(){
   const res = await axios("http://localhost:8000/products");
   setProducts(res.data);
  }
 

useEffect(() => {
    productss();
  }, []);

const filterPrdct = products.filter((product)=>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  //open edit
  const handleEdit = (product)=>{
    setSelect(product);
    setTitle(product.title);
    setPrice(product.price);
    seteDscription(product.description)
    setImage(null);
  }

  // update
  const handleUpdate = async(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description)
    if(image)
      formData.append("image", image);
  

  const res = await axios.patch(`http://localhost:8000/products/${select._id}`,
    formData,
    {headers: {"Content-Type": "multipart/form-data"}}
  )
  
  setProducts(
    products.map((p)=>
      p._id === select._id ? res.data : p
    )
  )
  setSelect(null)

}
  return (
    <div>
      <div className="searchProuduct">
            <form className="search"
            onSubmit={(e)=> e.preventDefault()}>
               <input type="text" 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
                /> 
               <button type='submit'>
                <span className="material-symbols-rounded">search</span>
               </button>
            </form>
      </div>

      <div className="products">
        {filterPrdct.map((product)=>(
            <div key={product._id} className="product">
                <img src={`http://localhost:8000${product.image}`} alt="" />
            
              <div className="prct">
          <h3>{product.title}</h3>
            <p>{product.price} $</p>
            <p>{product.description}</p>
            </div>
            
            <button  onClick={()=> handleEdit(product)}>edit Your products</button>
          </div>
         ) )

        }
      </div>


      <div className="form-update">
        {select &&  (<form action=""
            onSubmit={handleUpdate}>
              <input type="file" 
              onChange={(e)=> setImage(e.target.files[0])}
              />
              <input type="text" 
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)}
              />
              <input type="number" 
                value={price}
                onChange={(e)=> setPrice(e.target.value)}
              />
              <textarea 
                value={description}
                onChange={(e)=> seteDscription(e.target.value)}
              ></textarea>
              <button type='submit' >update</button>
        </form>)}
      </div>
    </div>
    
  )
}

export default UpdatePrdct
