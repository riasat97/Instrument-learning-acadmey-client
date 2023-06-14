import React, { useEffect, useState } from 'react';
import Spiner from '../../Shared/Spiner';
import LazyLoad from 'react-lazy-load';
import Stats from './Stats';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useTitle from '../../utilities/useTitle';
import { Link } from 'react-router-dom';
import PopularClasses from './PopularClasses';
import PopularInstructors from './PopularInstructors';
import TopSlider from './TopSlider';

const Home = () => {
    let [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    useTitle();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
        setLoading(false)
    }, []);

    //setLoading(false)

    return (
        <div className='max-w-7xl mx-auto px-10'>
            <Spiner loading={loading}></Spiner>
            <LazyLoad height={750} offset={192}>
            <TopSlider></TopSlider>
            </LazyLoad>
            <div className="divider my-4 md:mt-28 mb-10 text-2xl md:text-5xl font-extrabold">Popular Classes</div>
            <PopularClasses></PopularClasses>

            <div className="divider my-4 md:my-14 text-2xl md:text-5xl font-extrabold">Popular Instructors</div>
            <PopularInstructors></PopularInstructors>

            <div className="divider mt-24 text-5xl font-extrabold">Stats</div>
            <Stats></Stats>
        </div>
    );
};

export default Home;