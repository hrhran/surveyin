import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
    createSession = async () => {
        const res = await axios.post('/api/stripe', {
            email: this.props.auth.email
        })
        console.log(res)
        window.location.replace(res.data.url)
    }

    render() {
        return (
                <button className='btn' onClick = {this.createSession}>
                    Add Credit
                </button>
            )
    }
} 

const mapStateToProps = (state) => {
    return {auth: state.auth}
}

export default connect(mapStateToProps, actions)(Payments)