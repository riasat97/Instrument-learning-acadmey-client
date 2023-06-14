import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
const Stats = () => {
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
          easing: 'ease-in-out',
        });
      }, []);

      const [viaAxios] = useAxios();
      const { data: stats = {}, refetch } = useQuery(['app-stats'], async () => {
          const res = await viaAxios.get(`app-stats`)
          return res.data;
      });  

    return (
        <div  data-aos="fade-down" data-aos-anchor-placement="top-center" className="stats shadow my-16 flex flex-col md:flex-row justify-center">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Total System Users</div>
                <div className="stat-value">{stats.users}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div className="stat-title">Total Classes</div>
                <div className="stat-value">{stats.classes}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="stat-title">Total Orders</div>
                <div className="stat-value">{stats.orders}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value">${stats.revenue}</div>
            </div>
        </div>
    );
};

export default Stats;