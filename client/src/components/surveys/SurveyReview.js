import React from 'react'
import { connect } from 'react-redux'
import FIELDS from './formConstants'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SurveyReview = ({ onCancel, formValues, submitSurvey, credits, history }) =>{
    const reviewFields = _.map(FIELDS, field =>{
        return(
            <div style={{margin:'20px'}} key={field.name}>
                
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })


    return(
        <div className='container'>
            <h5 className='center' style={{margin:'30px'}}>Survey Confirmation</h5>
            {reviewFields}
            <div className='button-group' style={{marginTop: '50px'}}>
                <button className='btn left' onClick={onCancel}>
                    BACK
                </button>
                <button className='green btn right' onClick={()=> {
                    if(credits===0){
                        toast("Not enough Credits");
                    }else{
                        submitSurvey(formValues, history)
                    }
                }}>
                    SEND SURVEY
                    <i className='material-icons right'>email</i>
                </button>
            </div>
            <ToastContainer />    
        </div>
    )
}

function mapStateToProps({ auth, form }){
    return{
        credits: auth.credits,
        formValues: form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))

