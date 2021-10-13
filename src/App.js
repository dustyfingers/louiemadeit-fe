import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { ToastsContainer, ToastsStore } from 'react-toasts'

import Menu from './components/Menu/Menu'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import StorePage from './pages/StorePage'
import SignInAndSignUpPage from './pages/SignInAndSignUpPage'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/protected/CheckoutPage/CheckoutPage'
import PurchaseCompletedPage from './pages/protected/PurchaseCompletedPage'
import CustomerProfilePage from './pages/protected/CustomerProfilePage'
import TrackUploadPage from './pages/protected/admin/TrackUploadPage'
import PackUploadPage from './pages/protected/admin/PackUploadPage'
import { setCurrentUser } from './redux/user/user-actions'
import { apiLink } from './env'
import './styles/global/App.scss'
import { setCartFull } from './redux/cart/cart-actions'

axios.defaults.withCredentials = true

const App = ({ dispatch, currentUser }) => {
    const handleUserCheck = async () => {
        try {
            let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`)
            if (user && !currentUser) dispatch(setCurrentUser(user))
        } catch (error) {
            ToastsStore.error("There was an error connecting to the server!")
        }
    }

    const handleCartCheck = () => {
        let localCart = localStorage.getItem('louiemadeit_cart')
        if (localCart) dispatch(setCartFull(JSON.parse(localCart)))
        else localStorage.setItem('louiemadeit_cart', JSON.stringify([]))
    }

    useEffect(() => { 
        handleUserCheck()
        handleCartCheck()
     }, [])

    return (
        <div className="position-relative">
            <Menu />
            <div className="page-container container d-flex flex-column align-items-center justify-content-center">
                <Switch>
                    <Route exact path="/" component={StorePage} />
                    <Route path="/sign-in" component={SignInAndSignUpPage} />
                    <Route path="/cart" component={CartPage} />
                    <ProtectedRoute path="/checkout" user={currentUser} redirectTo="/sign-in" component={CheckoutPage} />
                    <ProtectedRoute path="/purchase-completed" user={currentUser} redirectTo="/sign-in" component={PurchaseCompletedPage} />
                    <ProtectedRoute path="/user/:user_id" user={currentUser} redirectTo="/sign-in" component={CustomerProfilePage} />
                    <ProtectedRoute path="/upload-track" user={currentUser} redirectTo="/sign-in" component={TrackUploadPage} adminOnly />
                    <ProtectedRoute path="/upload-pack" user={currentUser} redirectTo="/sign-in" component={PackUploadPage} adminOnly />
                </Switch>
            </div>
            <ToastsContainer store={ToastsStore} classNames='toast' />
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App)