import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import VendorLogin from '../components/forms/VendorLogin'
import VendorRegister from '../components/forms/VendorRegister'
import { AddFirm } from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setshowFirm] = useState(false)
  const [showProduct, setShowProduuct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [showLogOut, setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(true)

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken')
    if (loginToken) {
      setShowLogOut(true)
    }

  }, [])

  useEffect(() => {
    const firmName = localStorage.getItem('firmName')
    if (firmName) {
      setShowFirmTitle(false)
    }
  }, [])

  const logOutHandler = () => {
    confirm("Are you sure want to logout?")
    localStorage.removeItem("loginToken")
    localStorage.removeItem("firmId")
    localStorage.removeItem("firmName")
    setShowLogOut(false)
    setShowFirmTitle(true)
  }

  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setshowFirm(false)
    setShowProduuct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setshowFirm(false)
    setShowProduuct(false)
    setShowWelcome(false)
    setShowAllProducts(false)

  }
  const showFirmHandler = () => {
    if (showLogOut) {
      setshowFirm(true)
      setShowLogin(false)
      setShowRegister(false)
      setShowProduuct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }
    else {
      alert('please Login')
      setShowLogin(true)
    }

  }
  const showProductHandler = () => {
    if (showLogOut) {
      setShowProduuct(true)
      setshowFirm(false)
      setShowLogin(false)
      setShowRegister(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }
    else {
      alert('please Login')
      setShowLogin(true)
    }

  }
  const showWelcomeHandler = () => {
    setShowProduuct(false)
    setshowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(true)
    setShowAllProducts(false)

  }
  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowProduuct(false)
      setshowFirm(false)
      setShowLogin(false)
      setShowRegister(false)
      setShowWelcome(false)
      setShowAllProducts(true)
    }
    else {
      alert('please Login')
      setShowLogin(true)
    }

  }
  return (
    <>
      <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut} logOutHandler={logOutHandler} />
        <div className="collectionSection">
          <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle} />
          {showLogin && <VendorLogin showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <VendorRegister showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
        </div>
      </section>
    </>
  )
}

export default LandingPage