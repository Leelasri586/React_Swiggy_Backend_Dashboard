import React, { useState } from 'react'
import { API_URL } from '../../helpers/ApiPath'

const AddProduct = () => {

    const [productName, setProductName] =  useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory]= useState([])
    const [bestSeller, setBestSeller] = useState(false)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));

        } else {
            setCategory([...category, value])
        }
    }

    const handlbestSeller = (event)=>{
        const value = event.target.value === 'true'
        setBestSeller(value)
    }
    const handleImageUpload = (event)=>{
        const selectedImage = event.target.files[0]
        console.log(selectedImage)
        setImage(selectedImage)
    }

    const handleAddProduct = async(e)=>{
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken')
            const firmId = localStorage.getItem('firmId')

            if(!loginToken || firmId){
                console.error("User not Authenticated")
            }
            const formData = new FormData();
            formData.append('productName', productName)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', image)

            category.forEach((value) => {
                formData.append('category', value)
            })

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method:'POST',
                body:formData
            })
            const data = await response.json()

            if(response.ok){
                alert('Product added successfully')
            }
            setProductName("")
            setPrice("")
            setCategory([])
            setBestSeller(false)
            setImage(null)
            setDescription("")
        } catch (error) {
            console.error(data.message)
            alert('Failed to add Product')
        }
    }
  return (
    <div className='firmSection'>
            <form className="tableForm" onSubmit={handleAddProduct}>
                <h3>Add Product</h3>
                <label>Product Name</label>
                <input type="text"  value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                <label>Price</label>
                <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                {/* <label>Category</label>
                <input type="text" /> */}
                <div className="checkInp">
                    <label>Category</label>
                    <div className="inputsContainer">
                    <div className="checkBoxContainer">
                        <label>Veg</label>
                        <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                    </div>
                    <div className="checkBoxContainer">
                        <label>Non-Veg</label>
                        <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
                    </div>
                    </div>
                </div>
                {/* <label>BestSeller</label>
                <input type="text" /> */}
                <div className="checkInp">
                    <label>BestSeller</label>
                    <div className="inputsContainer">
                    <div className="checkBoxContainer">
                        <label>Yes</label>
                        <input type="radio" value="true" checked= {bestSeller===true} onChange={handlbestSeller}/>
                    </div>
                    <div className="checkBoxContainer">
                        <label>No</label>
                        <input type="radio" value="false" checked= {bestSeller===false} onChange={handlbestSeller}/>
                    </div>
                    </div>
                </div>
                <label>Description</label>
                <input type="text" onChange={(e)=>setDescription(e.target.value)}/>
                <label>Firm Image</label>
                <input type="file" onChange={handleImageUpload}/>
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>
            </form>

        </div>
  )
}

export default AddProduct