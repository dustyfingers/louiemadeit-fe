import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminMenu = ({ history }) => {
    return (
        <>
            <li className="nav-item">
                <span className="nav-link" onClick={() => history.push(`/upload-track`)}>new track</span>
            </li>
            <li className="nav-item">
                <span className="nav-link" onClick={() => history.push(`/upload-pack`)}>new pack</span>
            </li>
        </>
    )
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
})

export default connect(mapStateToProps)(withRouter(AdminMenu))