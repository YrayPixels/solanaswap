import React, { useState } from 'react'

export default function TimerCount() {

    const [time, setTimeVar] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    //Function to update countdown timer
    function updateCountdownTimer(targetDate) {
        //Get the current time
        var now = new Date().getTime();

        // Calculate the remaining time
        var distance = targetDate - now;

        // Calculate hours, minutes, and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeVar({
            days: days,
            hours: hours,
            seconds: seconds,
            minutes: minutes,
        })
    }
    // Function to start countdown
    function startCountdown() {
        // Get the launch date string (example format: "March 17, 2024 12:00:00")
        var launchDateString = "May 17, 2024 12:00:00";
        var targetDate = new Date(launchDateString).getTime();

        // Update the countdown timer every second
        var countdownInterval = setInterval(function () {
            updateCountdownTimer(targetDate);
        }, 1000);
    }
    // Start the countdown when the page loads
    startCountdown();
    return (
        <div id="timerDiv" className='d-flex col-lg-6 align-items-center  justify-content-between m-auto timerDiv'>
            <div className='singleArm'>
                <p>{time.days}</p>
                <span>Days</span>
            </div>
            <div>
                <p>{time.hours}</p>
                <span>Hours</span>
            </div>
            <div>
                <p>{time.minutes}</p>
                <span>Minutes</span>
            </div>
            <div>
                <p>{time.seconds}</p>
                <span>Seconds</span>
            </div>
        </div>
    )
}
