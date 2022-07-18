import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Payments from './Payments'

class Header extends Component {

    state = {
        toggle: false
    }

    toggleHandler = () => {
        this.setState({toggle: !this.state.toggle})
    }

    renderContent() {
        switch(this.props.auth){
            case null:
                return 'Processing...'
            case false:
                return <li><a href='/auth/google' className='center google'><i className="fa-brands fa-google"></i>  LOGIN WITH GOOGLE</a></li>
            default:
                return([
                    <li key="1"><Payments /></li>,
                    <li key="2" style={{ margin:'0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="3"><a href='/api/logout'>Logout</a></li>
                ])
        }
    }

    render() {
        console.log("HEADER")
        console.log(this.props)
        return(
            <nav>
                <div className='nav-wrapper'>
                    <div className='container'>
                        <Link to={this.props.auth? '/surveys':'/'} className='left brand-logo'>
                            SURVEYIN
                        </Link>
                        <ul className='right login-button'> 
                         <i className="material-icons burger" onClick={this.toggleHandler}>menu</i>
                         {
                            this.state.toggle? 
                                <div className='nav-items'>
                                    {this.renderContent()}
                                </div>
                                :
                                null
                         }
                                <div className='desk-items'>
                                    {this.renderContent()}
                                </div>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Header)