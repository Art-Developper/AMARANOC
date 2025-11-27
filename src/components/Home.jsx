import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SidebarFilters from "./slidebarFilters";
import { dbRealtime } from "../firebase";
import { ref, get } from "firebase/database";
import { FaMapMarkerAlt, FaUsers, FaStar, FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);

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

        if (searchTerm.trim() !== "") {
            const lowerTerm = searchTerm.toLowerCase();
            data = data.filter(p =>
                (p.address && p.address.toLowerCase().includes(lowerTerm)) ||
                (p.price && p.price.toString().includes(lowerTerm)) ||
                (p.id && p.id.toString().toLowerCase().includes(lowerTerm))
            );
        }

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
    }, [filters, properties, searchTerm]);

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
        setSearchTerm("");
    };

    const totalPages = Math.ceil(filteredProperties.length / 10);
    const paginatedProperties = useMemo(() => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        return filteredProperties.slice(start, end);
    }, [filteredProperties, currentPage]);

    return (
        <div className="p-4 md:p-8 bg-white min-h-screen relative">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className={`
                    fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform duration-300 ease-in-out
                    ${showFilters ? "translate-x-0" : "-translate-x-full"}
                    lg:static lg:translate-x-0 lg:w-1/4 lg:p-0 lg:bg-transparent lg:block lg:overflow-visible
                `}>
                    <div className="flex justify-between items-center mb-6 lg:hidden border-b pb-4 border-gray-100">
                        <h2 className="text-xl font-bold text-orange-700">Որոնում և Ֆիլտրեր</h2>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="relative w-full mb-6 lg:hidden">
                        <input
                            type="text"
                            placeholder="Որոնել (հասցե, գին, ID)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none shadow-sm text-gray-700"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                    </div>

                    <SidebarFilters
                        filters={filters}
                        setFilters={setFilters}
                        homes={properties}
                        regionsList={regionsList}
                        resetFilters={resetFilters}
                    />

                    <div className="mt-4 lg:hidden">
                        <button
                            onClick={() => setShowFilters(false)}
                            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg"
                        >
                            Տեսնել արդյունքները
                        </button>
                    </div>
                </div>
                {showFilters && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setShowFilters(false)}
                    ></div>
                )}

                <div className="flex-1">
                    <div className="mb-8 flex flex-col gap-4">
                        <h1 className="text-3xl font-extrabold text-orange-700">
                            Մեր առաջարկները
                        </h1>

                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                            <div className="relative w-full hidden lg:block">
                                <input
                                    type="text"
                                    placeholder="Որոնել (հասցե, գին, ID)..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none shadow-sm text-gray-700"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                            </div>
                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-100 text-orange-700 font-bold rounded-full hover:bg-orange-200 transition border border-orange-200 shadow-sm"
                            >
                                <FaSearch className="text-orange-600" />
                                <span>Որոնում և Ֆիլտրեր</span>
                            </button>
                        </div>
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
                                className="bg-white rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl duration-400 border border-orange-200 group"
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
                                        <div className="flex flex-col gap-1">
                                            <span className="flex items-center gap-1 text-gray-700 text-base font-medium">
                                                <FaMapMarkerAlt className="text-orange-500 text-lg" /> {p.address}
                                            </span>

                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="flex items-center gap-1 text-gray-500 text-sm">
                                                    <FaUsers className="text-gray-400" /> {p.maxGuestsDay} հոգի
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded-xl text-md font-semibold shadow-md">
                                            <FaStar className="text-white" /> {p.rating || 0}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                        <div className="text-2xl font-bold text-orange-700 transition group-hover:scale-105">
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
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${currentPage === i + 1
                                        ? "bg-orange-600 text-white font-bold shadow-lg scale-110"
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
