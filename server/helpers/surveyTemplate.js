module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>This a survey from Surveyin!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="https://hariharan.xyz/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="https://hariharan.xyz/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `
}