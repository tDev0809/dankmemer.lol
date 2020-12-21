import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default function AgeRequired(props) {
    
    const [selectedDay, setSelectedDay] = useState(new Date());
    const history = useHistory();

    const verifyAge = () => {
        if((Math.round(((new Date().getTime() - new Date(selectedDay).getTime()) / 1000) / (60 * 60 * 24)) / 365.25).toFixed() >= 21) return props.checkAge(false);
        else history.push('/')
    }

	return (
		<div id="store-prompt">
			<div id="store-prompt-content">
				<h1 id="store-prompt-content-title">Hold on.</h1>
				<div id="store-prompt-content-body">
					<p className="store-prompt-content-message">Before you go any further, we need to verify you are of legal age to access the following page.</p>
					<DayPickerInput  onDayChange={(day) => setSelectedDay(day)} />
				</div>
                <span to="/" id="store-prompt-content-button" onClick={verifyAge}>Verify age</span>
				<Link to="/" id="store-prompt-content-button-small">Go home</Link>
			</div>
		</div>
	)
}
