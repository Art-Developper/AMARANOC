import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- Ավելացվել է այս տողը
import Card from './DisocountCard';

export default function Discounts() {
    // State-եր տվյալները պահելու համար
    const [selectedPrice, setSelectedPrice] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const [bookingStep, setBookingStep] = useState(1);       
    const [formData, setFormData] = useState({               
        recipientName: '',
        phoneNumber: ''
    });

    const discounts = [
        {
            percent: "-15%",
            title: "2 կամ ավել ամրագրումի օրերի դեպքում",
            desc: "Ստացեք 5-15% զեղչ կախված ամրագրումի 3- hg մինիմում 20 օր:",
            img: "https://amaranoc.am/images/raffle/special-discounts-image.jpg",
        },
        {
            percent: "-10%",
            title: "Անձնական Reel-ի հրապարակման դեպքում",
            desc: "Կիսվել մեր հյուրանոցում ձեր արձակուրդի օրերից՝ նշելով amaranoc.am և ստացեք 10% զեղչ:",
            img: "https://amaranoc.am/images/raffle/special-discounts-image.jpg",
        },
        {
            percent: "-5%",
            title: "2-րդ այցելության դեպքում",
            desc: "Վերադարձի դեպքում ստացեք 5% զեղչ 3-րդ ամրագրումի դեպքում:",
            img: "https://amaranoc.am/images/raffle/special-discounts-image.jpg",
        },
    ];

    const prices = ["50,000 ֏", "60,000 ֏", "70,000 ֏", "80,000 ֏", "90,000 ֏", "100,000 ֏"];

    const houses = [
        {
            id: 1,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1759149473223--0.33907271602966693image.webp&w=1920&q=75",
            location: "Բջնի",
            price: "40,000֏",
        },
        {
            id: 2,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1753697519352--0.8706588573375771image.webp&w=1920&q=75",
            location: "Օհանավան",
            price: "75,000֏",
        },
        {
            id: 3,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1758095203425--0.034694092059661896image.webp&w=1920&q=75",
            location: "Ծաղկաձոր",
            price: "75,000֏",
        },
        {
             id: 4,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1759146875412--0.6077182024752312image.webp&w=1920&q=75",
            location: "Բջնի",
            price: "80,000֏",
        },
        {
            id: 5,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1757515466510--0.9370355470461651image.webp&w=1920&q=75",
            location: "Օհանավան",
            price: "85,000֏",
        },
        {
            id: 6,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1757515466510--0.9370355470461651image.webp&w=1920&q=75",
            location: "Ծաղկաձոր",
            price: "90,000֏",
        },
        {
            id: 7,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1712326262412--0.25440242535580326image.webp&w=1920&q=75",
            location: "Նոր Հաճն",
            price: "120,000֏",
        },
        {
            id: 8,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1705829500856--0.9156560389221753image.webp&w=1920&q=75",
            location: "Ծաղկաձոր",
            price: "130,000֏",
        },
        {
            id: 9,
            image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1756396894356--0.17186088991677884image.webp&w=1920&q=75",
            location: "Արզնի",
            price: "140,000֏",
        },
    ];

    const handleOrderClick = () => {
        if (!selectedPrice) {
            alert("Խնդրում ենք նախ ընտրել նվեր քարտի արժեքը։");
            return;
        }
        setIsModalOpen(true);
        setBookingStep(1);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.recipientName || !formData.phoneNumber) {
            alert("Խնդրում ենք լրացնել բոլոր դաշտերը։");
            return;
        }
        console.log("Պատվեր:", { price: selectedPrice, ...formData });
        setBookingStep(2); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setBookingStep(1);
        setFormData({ recipientName: '', phoneNumber: '' });
        setSelectedPrice(null);
    };

    return (
        <>
            <div className="relative">
                <h2 className="text-center text-4xl font-bold mb-10">
                    ՀԱՏՈՒԿ ԶԵՂՉԵՐ
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-10 gap-8">
                    {discounts.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-xl overflow-hidden shadow-lg h-75 group"
                        >
                            <img
                                src={item.img}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-105 transition"
                            />
                            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5 text-white">
                                <div className="text-5xl font-extrabold mb-3 drop-shadow-md">
                                    {item.percent}
                                </div>
                                <div className="font-semibold text-lg mb-1">{item.title}</div>
                                <p className="text-sm opacity-90">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white p-10 rounded-2xl shadow-xl">
                        <h1 className="text-4xl font-bold leading-snug text-gray-900">
                            Պատվիրի՛ր <span className="text-orange-500">Նվեր քարտ</span> <br />
                            Քո կամ ընկերերիդ համար
                        </h1>
                        <div className="border-b-2 border-orange-300 my-5 w-40"></div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Բաց մի թող մեր բացառիկ նվեր քարտերը։ Եթե պլանավորում ես քո հաջորդ արձակուրդը՝
                            ընկերներիդ կամ ընտանիքիդ անդամների հետ, մեր զեղչային քարտերը առաջարկում են
                            անգերազանցելի խնայողություններ ամառանոցների և ծառայությունների լայն
                            տեսականիով։ Ընտրիր զեղչի չափը քարտի վրա։
                        </p>
                    </div>

                    <div className="rounded-2xl p-10 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white flex flex-col items-center">
                        <img
                            src="https://amaranoc.am/images/white-logo.svg"
                            alt="Amaranoc logo"
                            className="w-48 mb-10 opacity-90"
                        />
                        <div className="flex flex-wrap gap-4 justify-center mb-10">
                            {prices.map((price, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedPrice(price)}
                                    className={`px-6 py-2 border-2 border-white rounded-full text-lg transition 
                                        ${selectedPrice === price 
                                            ? 'bg-white text-orange-600 font-bold scale-105' 
                                            : 'hover:bg-white hover:text-orange-600'
                                        }`}
                                >
                                    {price}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={handleOrderClick}
                            className="px-10 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition text-lg active:scale-95"
                        >
                            Պատվիրել
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className='text-center text-4xl font-bold mb-10'>
                        Թեժ առաջարկներ
                    </h1>
                    <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {houses.map((item) => (
                            <Link key={item.id} to="/AMARANOC.git"> 
                                <Card item={item} />
                            </Link>
                        ))}
                        
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all scale-100">
                        {bookingStep === 1 && (
                            <>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Պատվիրել Նվեր Քարտ</h3>
                                <p className="text-center text-orange-600 font-semibold text-xl mb-6">
                                    {selectedPrice}
                                </p>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Ում համար է նվերը
                                        </label>
                                        <input
                                            type="text"
                                            name="recipientName"
                                            value={formData.recipientName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="Անուն Ազգանուն"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Հեռախոսահամար
                                        </label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            placeholder="+374 XX XXXXXX"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                                    >
                                        Չեղարկել
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold shadow-md"
                                    >
                                        Հաստատել
                                    </button>
                                </div>
                            </>
                        )}

                        {bookingStep === 2 && (
                            <div className="text-center py-4">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                    <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Շնորհակալություն</h3>
                                <p className="text-lg text-gray-600 mb-6">
                                    Ձեր հայտը հաջողությամբ հաստատվել է
                                </p>
                                <button
                                    onClick={handleCloseModal}
                                    className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold shadow-md"
                                >
                                    Փակել
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}