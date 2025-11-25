import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SidebarFilters from "./slidebarFilters";
import { dbRealtime } from "../firebase";
import { ref, get } from "firebase/database";
import { FaMapMarkerAlt, FaUsers, FaStar, FaFilter, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    const [filteredProperties, setFilteredProperties] = useState([]);

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
        <div className="p-4 md:p-8 bg-white min-h-screen">
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