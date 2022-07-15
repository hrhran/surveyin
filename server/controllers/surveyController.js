const Survey = require('../models/Survey')
const Mailer = require('../config/Mailer')
const surveyTemplate = require('../helpers/surveyTemplate')

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

module.exports = {
    createSurvey,
}