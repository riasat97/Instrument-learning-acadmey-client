import Aos from 'aos';
import { useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Fade, Slide,Zoom } from "react-awesome-reveal";

const TopSlider = () => {

    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    const slides = [
        {
            text: 'Welcome to ILA',
            imageUrl: 'https://i.ibb.co/NFTyJTD/music-school-template-in-hand-drawn-cartoon-flat-illustration-playing-various-musical-instruments-le.jpg',
        },
        {
            text: 'Learn Guitar',
            imageUrl: 'https://i.ibb.co/1TRWBDj/wp5075902.jpg',
        },
        {
            text: 'Rock Drums',
            imageUrl: 'https://i.ibb.co/F3pVdhR/drummer-boy-cartoon-illustration-vector.jpg',
        },
        {
            text: 'Love Playing Keyboard',
            imageUrl: 'https://i.ibb.co/wW3P9zx/Psico-Ayuda-Infantil-Beneficios-de-la-m-sica-en-el-desarrollo-infantil-1280x720.jpg',
        },
        // Add more slides as needed
    ];

    return (
        <AwesomeSlider data-aos="fade-up" data-aos-anchor-placement="top-center" className="mt-5 h-screen rounded-lg">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center bg-center "
                    style={{ backgroundImage: `url(${slide.imageUrl})`, borderRadius: '10px' }}
                >
                    <div className="text-white text-center">
                        <Zoom delay={1e3} cascade damping={1e-1}>
                            <h2 className="text-5xl font-bold text-black">{slide.text}</h2>
                        </Zoom>
                    
                        <button className="btn btn-warning mt-8 bg-active">Get Started</button>

                    </div>
                </div>
            ))}
        </AwesomeSlider>
    );
};

export default TopSlider;