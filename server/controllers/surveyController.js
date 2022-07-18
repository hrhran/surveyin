const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const Survey = require('../models/Survey')
const Mailer = require('../config/Mailer')
const surveyTemplate = require('../helpers/surveyTemplate')

const getSurvey = async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
        .select({ recipients: false })
        .sort({dateSent: -1})
    res.send(surveys)
}

const createSurvey = async (req, res) => {
    const { title, subject, body, recipients } = req.body
    
    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
    })

    const mailer = new Mailer(survey, surveyTemplate(survey))
    try{
        await mailer.send()
        await survey.save()
        req.user.credits -=1;
        const user = await req.user.save()
        res.send(user)
    }catch(err){
        res.status(422).send(err)
    }
}

const listenSendgrid = (req, res) => {
    console.log(req.body)
    const p = new Path('/api/surveys/:surveyId/:choice')
    const events = _.chain(req.body)
        .map(({ email, url}) => {
            if(url){
                const match = p.test(new URL(url).pathname)
                if(match){
                    return { email, surveyId: match.surveyId, choice: match.choice}
                }
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false}
                }
            }, {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec()
        })
        .value()
}

const thankUser = (req, res) => {
    res.send("Thanks for voting")
}


module.exports = {
    getSurvey,
    createSurvey,
    listenSendgrid,
    thankUser
}