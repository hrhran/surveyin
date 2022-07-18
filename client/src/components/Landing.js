import React from 'react'

const Landing = () => {
    return(
        <div className="landing">
            <div className='landing-container'>
                <div className='landing-title'>
                    SURVEYS MADE <span className='easier'>EASIER</span>
                </div>
                <div className='landing-para'>
                    <p> Surveyin helps you get feedback from your target users easily.</p>
                </div>
                <div className='landing-button'>
                    
                    <a href='/auth/google' className='btn'>LOGIN WITH GOOGLE</a>
                </div>
            </div>
        </div>
    )
}

export default Landing