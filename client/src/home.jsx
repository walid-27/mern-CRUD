
import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useEffect, useState } from 'react'
function Home() {
  const [Products, setProducts] = useState([])


    useEffect(()=>{     
      async function getProducts(){
        try{ 
          const res = await axios.get("http://localhost:8000/products")
          console.log(res.data)
          setProducts(res.data)  
            }catch(err){
              console.log(err)
            }
          }
      getProducts()
    }, [])
  

  return (
    <>
    <nav>
      <h1>Product</h1>
      <ul>
        <li>
          <Link to="/add-product">Add product</Link>
        </li>
        <li>
          <Link to="/update-product">Update a product</Link>
        </li>
        <li>
          <Link to="/delete-product">Delete a product</Link>
        </li>
      </ul>
    </nav>

    <section>
       {[...Products].reverse().map((product) => (
            <div className="item" key={product._id}>
              {product.image && (
                <img src={`http://localhost:8000${product.image}`} alt={product.title} />
              )}
              <div className="data_prdct">
                <h2>{product.title}</h2>
                <h4>{product.price} $</h4>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
    </section>
    </>
  )
}

export default Home
