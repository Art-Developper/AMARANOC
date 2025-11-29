import React, { useEffect, useState } from 'react';
import Header from "./Header"
import { useParams } from 'react-router-dom';
import { ref, get, push } from "firebase/database";
import { dbRealtime } from "../firebase";

import {
    FaMapMarkerAlt, FaBed, FaBath, FaWifi, FaTv, FaUtensils,
    FaSwimmingPool, FaChevronLeft, FaChevronRight, FaUsers,
    FaExpandArrowsAlt, FaSnowflake, FaMoon, FaTimes, FaCalendarAlt
} from "react-icons/fa";

const PropertyPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const snapshot = await get(ref(dbRealtime, `properties/${id}`));
                if (snapshot.exists()) {
                    setProperty(snapshot.val());
                }
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen text-orange-500 text-xl">Բեռնում...</div>;
    if (!property) return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Տվյալները չեն գտնվել</div>;

    const images = property.images && property.images.length > 0
        ? property.images
        : ["https://via.placeholder.com/800x600?text=No+Image"];

    const hasAmenity = (name) => property.advantages && property.advantages.includes(name);
    const isSleepAllowed = property.isSleep === true || property.isSleep === "true" || property.isSleep === "yes";

    return (<>
        <Header />
        <div className="relative">
            <div className="max-w-7xl mx-auto p-4 font-sans text-gray-700 mt-6 pb-24">

                <div className="flex flex-col md:flex-row justify-between items-center border rounded-xl p-4 mb-6 shadow-sm bg-white">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <FaMapMarkerAlt className="text-orange-500 w-6 h-6" />
                        <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-800">
                            {property.addres || "Նշված չէ"}
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex flex-col text-center md:text-right">
                            <span className="text-xs text-gray-500">Օրավարձ</span>
                            <span className="text-2xl font-bold text-orange-500">
                                {Number(property.price).toLocaleString()} ֏
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] mb-8 rounded-xl overflow-hidden">
                    <div className="col-span-1 md:col-span-2 row-span-2 relative group cursor-pointer">
                        <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                    </div>
                    {images.slice(1, 5).map((img, idx) => (
                        <div key={idx} className="relative group cursor-pointer overflow-hidden hidden md:block">
                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white h-fit">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Հայտարարության մասին</h2>
                        <div className="space-y-4 text-sm">
                            <DetailRow label="# Կոդ" value={property.code || id.substring(0, 6).toUpperCase()} />
                            <DetailRow label="Հասցե" value={property.addres} icon={<FaMapMarkerAlt size={16} />} />
                            <DetailRow label="Գիշերակաց" value={isSleepAllowed ? "Այո" : "Ոչ"} icon={<FaMoon size={16} />} />
                            <DetailRow label="Շինության մակերես" value={property.area ? `${property.area} քմ` : "-"} icon={<FaExpandArrowsAlt size={16} />} />
                            <DetailRow label="Մարդկանց թույլատրելի քանակ" value={property.peopleCaunt} icon={<FaUsers size={16} />} />

                            {isSleepAllowed && (
                                <DetailRow
                                    label="Գիշերակացով մարդկանց քանակ"
                                    value={property.peopleSleepCaunt || "-"}
                                    icon={<FaUsers size={16} className="text-orange-500" />}
                                />
                            )}

                            <DetailRow label="Սենյակների քանակ" value={property.numberOfRooms || 1} icon={<FaBed size={16} />} />

                            <DetailRow label="Սանհանգույցների քանակ" value={property.tualets || 1} icon={<FaBath size={16} />} />
                            <DetailRow label="Լողավազան" value={property.baseyn === 'yes' ? "Առկա է" : "Առանց լողավազանի"} icon={<FaSwimmingPool size={16} />} />
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50/50 h-fit">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Ընդհանուր նկարագրություն</h3>
                        <p className="text-sm text-gray-800 mb-4 font-medium leading-relaxed">
                            {property.description || "Նկարագրություն առկա չէ:"}
                        </p>

                        {property.advantages && property.advantages.length > 0 && (
                            <div className="mb-4">
                                <p className="font-bold text-sm mb-2">Տնակում առկա է՝</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 list-disc list-inside text-sm text-gray-700">
                                    {property.advantages.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-8 shadow-sm mb-8 bg-white">
                    <h3 className="text-lg font-bold mb-8 text-gray-800">Առավելություններ</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <AdvantageItem active={hasAmenity('WiFi')} icon={<FaWifi />} label="WiFi" />
                        <AdvantageItem active={hasAmenity('Smart TV')} icon={<FaTv />} label="Smart TV" />
                        <AdvantageItem active={hasAmenity('Odorakich')} icon={<FaSnowflake />} label="Օդորակիչ" />
                        <AdvantageItem active={hasAmenity('Spasq')} icon={<FaUtensils />} label="Սպասք" />
                        <AdvantageItem active={property.baseyn === 'yes'} icon={<FaSwimmingPool />} label="Լողավազան" />
                    </div>
                </div>

            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl flex justify-between items-center z-40 max-w-7xl mx-auto md:rounded-t-xl">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Ընդամենը</span>
                    <span className="text-xl font-bold text-orange-600">{Number(property.price).toLocaleString()} ֏ <span className="text-sm font-normal text-gray-400">/ օրը</span></span>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform transform active:scale-95"
                >
                    Ամրագրել
                </button>
            </div>

            {isModalOpen && (
                <BookingModal
                    basePrice={Number(property.price)}
                    allowOvernight={isSleepAllowed}
                    propertyId={id}
                    propertyName={property.addres}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    </>
    );
};


const BookingModal = ({ basePrice, allowOvernight, propertyId, propertyName, onClose }) => {
    const [guests, setGuests] = useState(2);
    const [isOvernight, setIsOvernight] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [clientInfo, setClientInfo] = useState({ name: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const finalDailyPrice = basePrice; 

    const calculateDays = () => {
        if (!allowOvernight) return 1;

        if (!dateRange.start || !dateRange.end) return 0;
        const diffTime = Math.abs(dateRange.end - dateRange.start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 1 : diffDays;
    };

    const daysCount = calculateDays();
    const totalPrice = finalDailyPrice * daysCount;

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderData = {
            propertyId,
            propertyName,
            guests,
            isOvernight: allowOvernight ? isOvernight : false,
            checkIn: dateRange.start ? dateRange.start.toISOString() : '',
            checkOut: dateRange.end ? dateRange.end.toISOString() : '',
            checkInReadable: dateRange.start ? dateRange.start.toLocaleDateString('hy-AM') : '',
            checkOutReadable: dateRange.end ? dateRange.end.toLocaleDateString('hy-AM') : '',
            daysCount: daysCount,
            totalPrice,
            clientName: clientInfo.name,
            clientPhone: clientInfo.phone,
            createdAt: new Date().toISOString(),
            status: "new"
        };

        try {
            const ordersRef = ref(dbRealtime, 'orders');
            await push(ordersRef, orderData);

            alert(`Շնորհակալություն ${clientInfo.name}, Ձեր հայտը հաջողությամբ գրանցվեց:\nԸնդհանուր: ${totalPrice.toLocaleString()} ֏`);
            onClose();
        } catch (error) {
            console.error("Error saving booking:", error);
            alert("Տեղի ունեցավ սխալ: Խնդրում ենք փորձել կրկին:");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">

                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">Ամրագրում</h3>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                        <FaTimes className="text-gray-600" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Հյուրերի քանակ</label>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold">-</button>
                                <span className="text-xl font-bold w-8 text-center">{guests}</span>
                                <button onClick={() => setGuests(guests + 1)} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-bold">+</button>
                            </div>
                        </div>

                        {allowOvernight && (
                            <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-orange-50 transition border-orange-100 bg-orange-50/30">
                                <input
                                    type="checkbox"
                                    checked={isOvernight}
                                    onChange={(e) => setIsOvernight(e.target.checked)}
                                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 rounded"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800">Գիշերակացով</span>
                                    <span className="text-xs text-gray-500">Ներառված է արժեքի մեջ</span>
                                </div>
                            </label>
                        )}
                        {!allowOvernight && (
                             <div className="text-sm text-gray-500 italic p-2 bg-gray-50 rounded">
                                 Այս տնակում գիշերակաց նախատեսված չէ (միայն օրավարձ):
                             </div>
                        )}
                    </div>


                    <div className="border-t pt-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaCalendarAlt className="text-orange-500" /> Ընտրեք օրերը
                        </label>
                        <div className="border rounded-xl overflow-hidden">
                            <SelectableCalendar 
                                dateRange={dateRange} 
                                setDateRange={setDateRange} 
                                allowOvernight={allowOvernight} 
                            />
                        </div>
                        <div className="mt-2 text-sm text-gray-600 flex justify-between font-medium bg-gray-50 p-2 rounded">
                            <span>Սկիզբ: {dateRange.start ? dateRange.start.toLocaleDateString('hy-AM') : '-'}</span>
                            <span>Ավարտ: {dateRange.end ? dateRange.end.toLocaleDateString('hy-AM') : '-'}</span>
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Ձեր տվյալները</label>
                        <input
                            type="text"
                            placeholder="Անուն Ազգանուն"
                            value={clientInfo.name}
                            onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                        <input
                            type="tel"
                            placeholder="Հեռախոսահամար"
                            value={clientInfo.phone}
                            onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                </div>

                <div className="p-4 border-t bg-gray-50 mt-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Ընդհանուր ({daysCount} օր)</span>
                        <span className="text-2xl font-bold text-orange-600">{totalPrice.toLocaleString()} ֏</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        disabled={!dateRange.start || !clientInfo.name || !clientInfo.phone || isSubmitting}
                        className={`w-full text-white font-bold py-3 rounded-xl transition shadow-md ${isSubmitting ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'}`}
                    >
                        {isSubmitting ? 'Գրանցվում է...' : 'Հաստատել ամրագրումը'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const SelectableCalendar = ({ dateRange, setDateRange, allowOvernight }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const months = ["ՀՈՒՆՎԱՐ", "ՓԵՏՐՎԱՐ", "ՄԱՐՏ", "ԱՊՐԻԼ", "ՄԱՅԻՍ", "ՀՈՒՆԻՍ", "ՀՈՒԼԻՍ", "ՕԳՈՍՏՈՍ", "ՍԵՊՏԵՄԲԵՐ", "ՀՈԿՏԵՄԲԵՐ", "ՆՈՅԵՄԲԵՐ", "ԴԵԿՏԵՄԲԵՐ"];
    const daysOfWeek = ["Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շաբ", "Կիր"];

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const handleDateClick = (day) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        selectedDate.setHours(0, 0, 0, 0);

        if (!allowOvernight) {
            setDateRange({ start: selectedDate, end: selectedDate });
            return;
        }
        if (!dateRange.start || (dateRange.start && dateRange.end)) {
            setDateRange({ start: selectedDate, end: null });
        } else if (selectedDate < dateRange.start) {
            setDateRange({ start: selectedDate, end: null });
        } else {
            setDateRange({ ...dateRange, end: selectedDate });
        }
    };

    const isSelected = (day) => {
        if (!dateRange.start) return false;
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        checkDate.setHours(0, 0, 0, 0);

        const isStart = checkDate.getTime() === dateRange.start.getTime();
        const isEnd = dateRange.end && checkDate.getTime() === dateRange.end.getTime();
        return isStart || isEnd;
    };

    const isInRange = (day) => {
        if (!dateRange.start || !dateRange.end) return false;
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate > dateRange.start && checkDate < dateRange.end;
    };

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(<div key={`e-${i}`} className="py-2"></div>);

        for (let i = 1; i <= daysInMonth; i++) {
            const selected = isSelected(i);
            const inRange = isInRange(i);

            days.push(
                <div
                    key={i}
                    onClick={() => handleDateClick(i)}
                    className={`
                        py-2 text-sm cursor-pointer transition-all m-1 rounded-lg
                        ${selected ? 'bg-orange-600 text-white font-bold shadow-md' : ''}
                        ${inRange ? 'bg-orange-100 text-orange-800' : ''}
                        ${!selected && !inRange ? 'hover:bg-gray-100 text-gray-700' : ''}
                    `}
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="bg-white p-2">
            <div className="flex justify-between items-center mb-2 px-2">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}><FaChevronLeft className="text-gray-500" /></button>
                <span className="font-bold text-sm text-gray-800">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}><FaChevronRight className="text-gray-500" /></button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-1">
                {daysOfWeek.map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 text-center">
                {renderDays()}
            </div>
        </div>
    );
};


const DetailRow = ({ label, value, icon }) => (
    <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2 last:border-0">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
            {icon && <span className="text-orange-400">{icon}</span>}
            <span>{label}</span>
        </div>
        <span className="text-gray-900 font-semibold">{value}</span>
    </div>
);

const AdvantageItem = ({ icon, label, active }) => (
    <div className={`flex items-center gap-4 ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
        <div className="p-2 border border-orange-200 rounded-lg bg-orange-50/50 text-orange-500">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <span className="font-medium text-gray-800">{label}</span>
    </div>
);

export default PropertyPage;