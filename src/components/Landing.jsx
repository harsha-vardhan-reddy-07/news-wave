import React, { useEffect, useState } from 'react'
import useMeasure from "react-use-measure";
import { useTrail, animated } from "@react-spring/web";

import '../styles/landing.css';

import NewsImg from '../images/newsPaper.png'
import CardImg from '../images/landing_card_img.png'
import { useNavigate } from 'react-router-dom';

const Landing = () => {

    const fast = { tension: 1000, friction: 30 };
    const slow = { mass: 30, tension: 50, friction: 30 };
    const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

    const initX = (window.innerWidth)*0.15;
    const initY = (window.innerHeight)*0.9;
    const [trail, api] = useTrail(3, (i) => ({
        xy: [initX, initY],
        config: i === 0 ? fast : slow
      }));
      const [ref, { left, top }] = useMeasure();
    
      const handleMouseMove = (e) => {
        api.start({ xy: [e.clientX - left, e.clientY - top] });
      };


      const [showCard, setShowCard] = useState(false);

      useEffect(()=>{
        console.log(window.innerWidth);
        setTimeout(()=>{
            setShowCard(true);
        }, 6000)

      },[]);


      const navigate = useNavigate();


  return (
    <div className="landingPage">
        <div className="news-paper-animation">
            <img className='newsPaper-img' src={NewsImg} alt=' ' />
        </div>

        {showCard && (

            <div className="landingCard">
                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                    <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
                    <feColorMatrix
                        // in="blur"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
                    />
                    </filter>
                </svg>
                <div ref={ref} className="animatedCircle" onMouseMove={handleMouseMove}>
                    {trail.map((props, index) => (
                    <animated.div key={index} style={{ transform: props.xy.to(trans) }} />
                    ))}
                </div>
                

                <div className="landing-card">

                    <h3 className='card-logo' >NewsWave</h3>

                    <div className="landing-card-content">
                        <div>
                            <h1>Welcome</h1>
                            <h2>to the <span>NewsWave</span>!!</h2>
                            <h4>Ride the Tides of Information and Surf the Latest Stories</h4>
                            <button onClick={()=> navigate('/home')} >Enter now</button>
                        </div>
                        <img src={CardImg} alt=""  />
                    </div>

                </div>


            </div>
        )}

    </div>
  )
}

export default Landing