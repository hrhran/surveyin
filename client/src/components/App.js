import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'


class App extends Component {
    constructor(props){
        super(props)
        console.log("CONSTRUCTOR")
        console.log(props)
    }

    componentDidMount(){
        this.props.fetchUser()
    }

    render(){
        return(
            <div>
               <BrowserRouter basename={'surveyin'}>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component ={SurveyNew} />
                    </div>
               </BrowserRouter>
            </div>
        )
    }
}

const random = (state) =>{
    console.log("MAPSTATETOPROPS")
    console.log(state)
    return {state}
}

export default connect(random, actions)(App)