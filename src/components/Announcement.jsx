import React, { useState } from 'react';
import background from "../assets/img/Screenshot.png";

const Announcement = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: ''
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        if (formData.fullName.trim() && formData.phone.trim() && formData.email.trim()) {
            setShowModal(true); 
            setFormData({ fullName: '', phone: '', email: '' });
        } else {
            alert("Խնդրում ենք լրացնել բոլոր դաշտերը։");
        }
    };

    return (
        <div
            className="w-full flex items-center justify-center relative"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh' 
            }}
        >
            <div className="bg-opacity-70 p-6 md:p-16 m-4 md:m-24 rounded-lg shadow-lg w-11/12 md:w-3/4 max-w-6xl border-2 border-white text-white bg-black/50 backdrop-blur-sm">
            
                <h2 className="text-center text-2xl md:text-4xl font-bold mb-4">
                    <span className="inline-block border-b-2 border-white pb-2 px-2 md:px-4">
                        ՏԵՂԱԴՐԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈւՆ
                    </span>
                </h2>
                <p className="text-center text-base md:text-lg mb-6 md:mb-8">
                    Մուտքագրեք ձեր տվյալները նշված դաշտերում և մենք կկապվենք ձեզ հետ։
                </p>
                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full md:flex-1 md:min-w-[200px] p-3 border border-gray-600 rounded-md bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Անուն Ազգանուն"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full md:flex-1 md:min-w-[200px] p-3 border border-gray-600 rounded-md bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Հեռախոսահամար"
                    />
                    <input
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full md:flex-1 md:min-w-[200px] p-3 border border-gray-600 rounded-md bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Էլ. հասցե"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full md:w-auto px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                    >
                        Ուղարկել
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-2xl max-w-md w-full text-center transform transition-all scale-100">
                        <div className="mb-4">
                            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">Շնորհակալություն</h3>
                        <p className="text-base md:text-lg text-gray-600 mb-6">Ձեր հայտը ընդունված է</p>

                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 w-full md:w-auto"
                        >
                            Փակել
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Announcement;