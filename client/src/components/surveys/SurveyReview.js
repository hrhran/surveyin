import React from 'react'
import { connect } from 'react-redux'
import FIELDS from './formConstants'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import * as actions from '../../actions'

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) =>{
    const reviewFields = _.map(FIELDS, field =>{
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })
    return(
        <div className='container'>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className='btn left' onClick={onCancel}>
                BACK
            </button>
            <button className='green btn right' onClick={()=> submitSurvey(formValues, history)}>
                SEND SURVEY
                <i className='material-icons right'>email</i>
            </button>
        </div>
    )
}

function mapStateToProps({ form }){
    return{
        formValues: form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))

