import React from 'react';
import Footer from '../components/Home/Footer';
import { useNavigate } from 'react-router-dom';




export default function Home() {
    const navigate = useNavigate();
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='text-center'>
                Pet Vet Landing Page
                <br />
                <button className='px-4 py-2 m-2 text-primary bg-secondary rounded-full ' onClick={() => navigate("/dashboard")}>Go to dashboard</button>
            </div>
            {/* <header className="px-5 py-6 sm:px-13  md:px-16 lg:px-19 xl:px-22 xxl:px-25 bg-[#161616] fixed top-0 w-full bg-opacity-97 shadow-md z-50">
                <Header />
            </header> */}
            {/* 
            <main className="min-h-[calc(100vh-8rem)]">

                <section id='home'>
                    <LandingPage />
                </section>

                <section>
                    <TokenSale />
                </section>

                <section>
                    <PolicyEcosystem />
                </section>

                <section>
                    <ICOToken />
                </section>


                <section>
                    <TokenomicsChart />
                </section>

                <section>
                    <LightPaper />
                </section>

                <section>
                    <OurTeam />
                </section>

            </main> */}

            <footer className="block mt-8 mb-0 bg-[#161616]">
                <Footer />
            </footer>
        </div>
    );
}
