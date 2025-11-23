import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SidebarFilters from "./slidebarFilters";
import { dbRealtime } from "../firebase";
import { ref, get } from "firebase/database";

import { FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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
        <div className="p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                    <SidebarFilters
                        filters={filters}
                        setFilters={setFilters}
                        homes={properties}
                        regionsList={regionsList}
                        resetFilters={resetFilters}
                    />
                </div>

                <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-extrabold text-orange-700">Մեր բացառիկ առաջարկները</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProperties.length === 0 && (
                            <div className="col-span-full text-center text-orange-400 mt-12 text-lg">
                                Ցավոք, այս պահին համապատասխան արդյունքներ չկան։
                            </div>
                        )}

                        {paginatedProperties.map((p, idx) => (
                            <Link
                                to={`/property/${p.id}`}
                                key={p.id || idx}
                                className="bg-white rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl duration-400 border border-orange-200"
                            >
                                <div className="relative">
                                    <Swiper
                                        navigation
                                        pagination={{ clickable: true }}
                                        modules={[Navigation, Pagination]}
                                        className="h-64 rounded-t-3xl"
                                    >
                                        {p.images.length ? (
                                            p.images.map((img, i) => (
                                                <SwiperSlide key={i}>
                                                    <img
                                                        src={img}
                                                        alt={p.address}
                                                        className="w-full h-64 object-cover"
                                                    />
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <SwiperSlide>
                                                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-300 text-xl font-medium">
                                                    Նկար չկա
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex justify-center gap-4 items-center">
                                            <span className="flex items-center gap-1 text-gray-700 text-base">
                                                <FaMapMarkerAlt className="text-orange-500 text-lg" /> {p.address}
                                            </span>

                                            <span className="flex items-center gap-1 text-gray-500 text-base">
                                                <FaUsers className="text-gray-400 text-lg" /> {p.maxGuestsDay}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded-xl text-md font-semibold">
                                            <FaStar className="text-white" /> {p.rating || 0}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-2xl font-bold text-orange-700 transition">
                                            {Number(p.price || 0).toLocaleString()} ֏
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 font-semibold"
                            >
                                ← Նախորդ
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-5 py-2 rounded-full text-lg ${currentPage === i + 1
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
                                className="px-4 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 disabled:opacity-50 text-orange-700 font-semibold"
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
