import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SidebarFilters from "./slidebarFilters";
import { dbRealtime } from "../firebase";
import { ref, get } from "firebase/database";
import { 
    FaMapMarkerAlt, 
    FaUsers, 
    FaStar, 
    FaFilter, 
    FaTimes, 
    FaCalendarAlt, 
    FaChevronLeft, 
    FaChevronRight 
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import hy from 'date-fns/locale/hy';


registerLocale('hy', hy);

export default function Home() {

    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [filters, setFilters] = useState({
        regions: [],
        minPrice: 0,
        maxPrice: 9999999,
        rooms: null,
        bathrooms: null,
        maxGuestsDay: null,
        maxGuestsNight: null,
        hasPool: null,
        allowsOvernightStay: null,
        amenities: [],
        rating: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(ref(dbRealtime, "properties"));
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    let items = Object.entries(dataObj).map(([id, p]) => ({
                        id, 
                        ...p,
                        amenities: p.advantages || [],
                        images: p.images || [],
                        rating: p.star || p.stars || 0,
                        address: p.addres || "Unspecified",
                        bathrooms: p.tualets || 0,
                        maxGuestsDay: p.peopleCaunt || 0,
                        maxGuestsNight: p.peopleSleepCaunt || 0,
                        hasPool: p.baseyn === "yes" || p.baseyn === true,
                        allowsOvernightStay: p.isSleep || false,
                    }));
                    setProperties(items);
                    setFilteredProperties(items);
                } else {
                    setProperties([]);
                    setFilteredProperties([]);
                }
            } catch (err) {
                console.error("Firebase fetch error:", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let data = [...properties];
        if (filters.regions.length) {
            data = data.filter(p => filters.regions.includes(p.address));
        }
        data = data.filter(p => {
            const price = Number(p.price || 0);
            return price >= Number(filters.minPrice || 0) && price <= Number(filters.maxPrice || 9999999);
        });

        if (filters.rooms) {
            data = data.filter(p => Number(p.rooms || 0) >= Number(filters.rooms));
        }
        if (filters.bathrooms) {
            data = data.filter(p => Number(p.bathrooms || 0) >= Number(filters.bathrooms));
        }
        if (filters.maxGuestsDay) {
            data = data.filter(p => Number(p.maxGuestsDay || 0) >= Number(filters.maxGuestsDay));
        }
        if (filters.maxGuestsNight) {
            data = data.filter(p => Number(p.maxGuestsNight || 0) >= Number(filters.maxGuestsNight));
        }

        if (filters.hasPool !== null) {
            data = data.filter(p => p.hasPool === filters.hasPool);
        }
        if (filters.allowsOvernightStay !== null) {
            data = data.filter(p => Boolean(p.allowsOvernightStay) === Boolean(filters.allowsOvernightStay));
        }
        if (filters.amenities.length) {
            data = data.filter(p =>
                filters.amenities.every(a => (p.amenities || []).includes(a))
            );
        }
        if (filters.rating) {
            data = data.filter(p => Number(p.rating || 0) >= Number(filters.rating));
        }
        setFilteredProperties(data);
        setCurrentPage(1); 
    }, [filters, properties]);

    const regionsList = useMemo(() => {
        const setR = new Set(properties.map(p => p.address).filter(Boolean));
        return Array.from(setR);
    }, [properties]);

    const resetFilters = () => {
        setFilters({
            regions: [],
            minPrice: 0,
            maxPrice: 9999999,
            rooms: null,
            bathrooms: null,
            maxGuestsDay: null,
            maxGuestsNight: null,
            hasPool: null,
            allowsOvernightStay: null,
            amenities: [],
            rating: null
        });
    };

   
    const totalPages = Math.ceil(filteredProperties.length / 10);
    const paginatedProperties = useMemo(() => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        return filteredProperties.slice(start, end);
    }, [filteredProperties, currentPage]);

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen font-sans">
            
        
            <style>{`
                /* DatePicker Container */
                .custom-datepicker {
                    font-family: inherit;
                    border: none !important;
                    width: 100%;
                }
                .react-datepicker {
                    border: none !important;
                    width: 100% !important; /* Լրիվ լայնություն */
                    font-family: inherit;
                    display: block;
                }
                .react-datepicker__header {
                    background-color: transparent !important;
                    border-bottom: none !important;
                    padding-top: 0;
                    width: 100%;
                }
                .react-datepicker__month-container {
                    width: 100%;
                    float: none !important; /* Հանում ենք float-ը */
                }
                .react-datepicker__month {
                    margin: 0;
                    padding: 10px 0;
                }
                .react-datepicker__triangle {
                    display: none;
                }
                
                /* --- ԱՅՍ ՄԱՍԸ ԿԱՐԵՎՈՐ Է ՄԵՋՏԵՂ ԲԵՐԵԼՈՒ ՀԱՄԱՐ --- */
                .react-datepicker__week, 
                .react-datepicker__day-names {
                    display: flex;
                    justify-content: center; /* Տողերը բերում է մեջտեղ */
                    align-items: center;
                }

                /* Շաբաթվա օրերի անունները */
                .react-datepicker__day-name {
                    width: 2.5rem;
                    line-height: 2.5rem;
                    font-weight: 600;
                    color: #333;
                    text-transform: capitalize;
                    margin: 2px; /* Փոքր հեռավորություն */
                    text-align: center;
                }
                /* Շաբաթ (6-րդ) և Կիրակի (7-րդ) օրերը նարնջագույն */
                .react-datepicker__day-name:nth-child(6),
                .react-datepicker__day-name:nth-child(7) {
                    color: #f97316 !important; 
                }
                
                /* Օրերը (թվերը) */
                .react-datepicker__day {
                    width: 2.5rem;
                    line-height: 2.5rem;
                    margin: 2px;
                    color: #4b5563; 
                    font-weight: 500;
                    text-align: center;
                }
                .react-datepicker__day:hover {
                    border-radius: 50%;
                    background-color: #f3f4f6;
                }
                /* Ընտրված օրը */
                .react-datepicker__day--selected {
                    background-color: #f97316 !important;
                    border-radius: 50% !important;
                    color: white !important;
                }
                .react-datepicker__day--keyboard-selected {
                    background-color: transparent;
                    color: inherit;
                }
                .react-datepicker__day--keyboard-selected.react-datepicker__day--selected {
                     background-color: #f97316 !important;
                     color: white !important;
                }

                /* Անցյալի օրերը */
                .react-datepicker__day--disabled {
                    color: #d1d5db !important;
                }
            `}</style>

            {isCalendarOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[380px] overflow-hidden animate-fadeIn">
                        
                       
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">
                                Նշեք Ձեր ցանկալի օրերը
                            </h2>
                            <button 
                                onClick={() => setIsCalendarOpen(false)}
                                className="text-gray-400 hover:text-gray-800 transition"
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>

                        <div className="w-full flex justify-center py-2">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={new Date()}
                                inline
                                locale="hy"
                                calendarClassName="custom-datepicker"
                                renderCustomHeader={({
                                    date,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div className="bg-[#f58a2e] text-white flex items-center justify-between px-4 py-3 mb-2">
                                        <button 
                                            onClick={decreaseMonth} 
                                            disabled={prevMonthButtonDisabled}
                                            className="hover:bg-white/20 p-1.5 rounded transition disabled:opacity-50"
                                        >
                                            <FaChevronLeft size={14} />
                                        </button>

                                        <span className="text-lg font-bold uppercase tracking-wider">
                                            {date.toLocaleString('hy-AM', { month: 'long' })}
                                        </span>

                                        <button 
                                            onClick={increaseMonth} 
                                            disabled={nextMonthButtonDisabled}
                                            className="hover:bg-white/20 p-1.5 rounded transition disabled:opacity-50"
                                        >
                                            <FaChevronRight size={14} />
                                        </button>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 p-5 pt-0">
                            <button 
                                onClick={() => setIsCalendarOpen(false)}
                                className="text-gray-600 font-semibold text-sm px-4 py-2 hover:bg-gray-50 rounded-lg transition"
                            >
                                Փակել
                            </button>
                            <button 
                                onClick={() => {
                                    setIsCalendarOpen(false);
                                    console.log(selectedDate);
                                }}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition shadow-sm ${
                                    selectedDate 
                                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200" 
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                                disabled={!selectedDate}
                            >
                                Հաստատել
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative">
                <div className="hidden lg:block lg:w-1/4 sticky top-4 h-fit">
                    <SidebarFilters
                        filters={filters}
                        setFilters={setFilters}
                        homes={properties}
                        regionsList={regionsList}
                        resetFilters={resetFilters}
                    />
                </div>

                {isFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex justify-end animate-fadeIn">
                        <div className="w-[85%] sm:w-[60%] bg-white h-full p-6 overflow-y-auto shadow-2xl relative">
                            <button 
                                onClick={() => setIsFilterOpen(false)} 
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                            >
                                <FaTimes className="text-gray-600" />
                            </button>
                            <div className="mt-8">
                                <SidebarFilters
                                    filters={filters}
                                    setFilters={setFilters}
                                    homes={properties}
                                    regionsList={regionsList}
                                    resetFilters={resetFilters}
                                />
                                <button 
                                    onClick={() => setIsFilterOpen(false)}
                                    className="w-full mt-6 bg-orange-600 text-white py-3 rounded-xl font-bold"
                                >
                                    Տեսնել արդյունքները
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-1">
                    

                    <div className="mb-6">
                        <button
                            onClick={() => setIsCalendarOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:-translate-y-0.5 font-semibold text-sm md:text-base"
                        >
                            <FaCalendarAlt />
                            Ընտրել օրերը
                        </button>
                    </div>

                    <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-orange-700">Մեր առաջարկները</h1>
                        
                        <button 
                            onClick={() => setIsFilterOpen(true)}
                            className="lg:hidden flex items-center gap-2 bg-white border border-orange-200 text-orange-700 px-6 py-3 rounded-xl shadow-sm hover:bg-orange-50 font-semibold w-full sm:w-auto justify-center"
                        >
                            <FaFilter />
                            Ֆիլտրել
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredProperties.length === 0 && (
                            <div className="col-span-full text-center text-orange-400 mt-12 text-lg">
                                Ցավոք, այս պահին համապատասխան արդյունքներ չկան։
                            </div>
                        )}

                        {paginatedProperties.map((p, idx) => (
                            <Link
                                to={`/property/${p.id}`}
                                key={p.id || idx}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 border border-orange-100 flex flex-col h-full"
                            >
                                <div className="relative">
                                    <Swiper
                                        navigation
                                        pagination={{ clickable: true }}
                                        modules={[Navigation, Pagination]}
                                        className="h-56 md:h-64 rounded-t-3xl"
                                    >
                                        {p.images.length ? (
                                            p.images.map((img, i) => (
                                                <SwiperSlide key={i}>
                                                    <img
                                                        src={img}
                                                        alt={p.address}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <SwiperSlide>
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-xl font-medium">
                                                    Նկար չկա
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1 text-gray-800 font-bold text-sm md:text-base line-clamp-1">
                                                <FaMapMarkerAlt className="text-orange-500" /> {p.address}
                                            </span>
                                            <span className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                                                <FaUsers className="text-gray-400" /> {p.maxGuestsDay} հյուր
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-sm font-bold">
                                            <FaStar /> {p.rating || 0}
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                                        <div className="text-xl md:text-2xl font-bold text-orange-600">
                                            {Number(p.price || 0).toLocaleString()} ֏
                                        </div>
                                        <span className="text-xs text-gray-400">օրավարձ</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 md:gap-4 mt-12 flex-wrap">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 md:px-4 md:py-2 rounded-lg bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 font-semibold text-sm md:text-base"
                            >
                                ← Նախորդ
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base ${currentPage === i + 1
                                        ? "bg-orange-600 text-white font-bold shadow-md"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 md:px-4 md:py-2 rounded-lg bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 font-semibold text-sm md:text-base"
                            >
                                Հաջորդ →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}