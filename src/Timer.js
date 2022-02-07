import React, { useState, useEffect } from "react";
import "./styles.css";

const Timer = () => {
    
  const [workTime, setWorkTime] = useState(1500);
  const [workTime_minute, setWorkTime_minute] = useState("25");
  const [workTime_second, setWorkTime_second] = useState("00");
  const [breakTime, setBreakTime] = useState(300);
  const [breakTime_minute, setBreakTime_minute] = useState("05");
  const [breakTime_second, setBreakTime_second] = useState("00");
  const [second, setSecond] = useState(workTime_second);
  const [minute, setMinute] = useState(workTime_minute);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(workTime);
  const [session, setSession] = useState("work");
  const [endTimer, setEndTimer] = useState(false);

  useEffect(() => {
    let intervalId;

    counter < 20 ? setEndTimer(true) : setEndTimer(false);

    if(counter < 0){
        if(session === "work"){
            setCounter(breakTime);
            setSession("break");
            window.alert("C'est l'heure de prendre une pause!");
        }else{
            setCounter(workTime);
            setSession("work");
            window.alert("Au travail!")
        }
    }
    else{
        if (isActive) {
        intervalId = setInterval(() => {
            console.log(counter);
            let time = format(counter);
            setSecond(time[1]);
            setMinute(time[0]);
            setCounter((counter) => counter - 1);
        }, 1000);
    }
} return () => clearInterval(intervalId);
}, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(workTime);
    setSecond(workTime_second);
    setMinute(workTime_minute);
    setSession("work");
  }

  function format(time){
    const secondCounter = time % 60;
    const minuteCounter = Math.floor(time / 60);
    let computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
    let computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
    return [computedMinute, computedSecond];
  }

  function updateWorkTime(time){
      if(time>0){
        setWorkTime(time);
        let newtime = format(time);
        setWorkTime_minute(newtime[0]);
        setWorkTime_second(newtime[1]);
        if(session === "work"){
           setIsActive(false);
           setMinute(newtime[0]);
           setSecond(newtime[1]);
           setCounter(time);
        }
      }
    }

  function updateBreakTime(time){
    if(time>0){
    setBreakTime(time);
    let newtime = format(time);
    setBreakTime_minute(newtime[0]);
    setBreakTime_second(newtime[1]);
    if(session === "break"){
        setIsActive(false);
        setMinute(newtime[0]);
        setSecond(newtime[1]);
        setCounter(time);
    }
   }
  }

  return (
    <div className={session}>
        <h1 class="title">{session === "work" ? "Work Session" : "Break Session"}</h1>
        <div className={endTimer ? "time colorRed" : "time"}>
            <span class="minute">{minute}</span>
            <span>:</span>
            <span class="second">{second}</span>
        </div>
        <div class="buttons">
            <button onClick={() => setIsActive(!isActive)} class="start">{isActive ? "Pause" : "Start"}</button>
            <button onClick={() => stopTimer()} class="reset">Reset</button>
        </div>
        <div class="wrap">
        <div>
            <h2>Work Timer</h2>
            <div class="parametre">
                <div class="vertical">
                    <button onClick={() => updateWorkTime(workTime - 60)} class="add">v</button>
                    <button onClick={() => updateWorkTime(workTime + 60)} class="add">^</button>
                </div>
                <h2>{workTime_minute} : {workTime_second}</h2>
                <div class="vertical">
                    <button onClick={() => updateWorkTime(workTime - 1)} class="add">v</button>
                    <button onClick={() => updateWorkTime(workTime + 1)} class="add">^</button>
                 </div>
            </div>
        </div>
        <div>
            <h2>Break Timer</h2>
            <div class="parametre">
                <div class="vertical">
                    <button onClick={() => updateBreakTime(breakTime - 60)} class="add">v</button>
                    <button onClick={() => updateBreakTime(breakTime + 60)} class="add">^</button>
                </div>
                <h2>{breakTime_minute} : {breakTime_second}</h2>
                <div class="vertical">
                    <button onClick={() => updateBreakTime(breakTime - 1)} class="add">v</button>
                    <button onClick={() => updateBreakTime(breakTime + 1)} class="add">^</button>
                 </div>
            </div>
        </div>
        </div>

    </div>
  );
};

export default Timer;
