import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formConstants'
  
  class SurveyForm extends Component {
    renderFields() {
      return _.map(FIELDS, ({ label, name }) => {
        return (
          <Field
            key={name}
            component={SurveyField}
            type="text"
            label={label}
            name={name}
          />
        )
      })
    }
  
    render() {
      return (
        <div className='container'>
                <form style={{marginTop: '50px'}} onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className='red btn left'>
                        CANCEL
                    </Link>
                    <button className="btn right"type="submit">
                        NEXT 
                        <i className='material-icons right'>arrow_forward</i>
                    </button>
                </form>
        </div>
      );
    }
  }
  
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '')

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value'
    }
  });
  return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)
  