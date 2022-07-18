import React, { Component } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { connect } from 'react-redux'
import { fetchSurveys } from '../../actions'

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurveys()
    }

    renderChart(survey){
        if(survey.yes === 0 && survey.no === 0){
            return <PieChart
            startAngle={90}
            radius={40}
            label={({dataEntry}) => 'NO DATA'}
            animate
            reveal
            labelPosition={0}
            labelStyle={(index) => ({
                fill: '#ffffff',
                fontSize: '8px',
                fontFamily: 'sans-serif',
              })}
            data={[
                { title: 'No Data', value: "100", color: '#8a7ce7' },
            ]}
        />
        }else{
            return <PieChart
            key={survey._id}
            startAngle={90} paddingAngle={1}
            lineWidth={50} 
            radius={40}
            label={({dataEntry}) => (dataEntry.value)? Math.floor((dataEntry.value/(survey.yes+survey.no))*100) + '%' : ''}
            animate
            reveal
            labelPosition={75}
            labelStyle={(index) => ({
                fill: '#ffffff',
                fontSize: '6px',
                fontFamily: 'sans-serif',
              })}
            data={[
                { title: 'Yes', value: survey.yes, color: '#6552e3' },
                { title: 'No', value: survey.no, color: '#8a7ce7' },
            ]}
        />
        }
    }

    renderSurveys() {
        return this.props.surveys.map(survey => {
            return(
                <div className='survey-card'>
                <div className="card darken-1" key={survey._id} style={{marginTop: '20px'}}>
                    <div className="card-content">
                        <span className='card-title'>{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
 
                        <p className='right'>
                            SENT ON: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>

                    </div>
        
        
                   
                    <div className='card-action'>
                        <a>YES: {survey.yes}</a>
                        <a>NO: {survey.no}</a>
                    </div>
                </div>
                    <div className='piechart'>
                        {this.renderChart(survey)}
                    </div>
                </div>
            )
        })
    }

    render(){
        return(
            <div className='container'>
                {this.renderSurveys()}
            </div>
        )
    }
}

const mapStateToProps = ({ surveys }) => {
    return { surveys }
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList)