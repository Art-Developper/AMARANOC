import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";

export default function CalendarModal() {
    const [open, setOpen] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ["երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ", "կիր"];
    const months = [
        "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ",
        "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս",
        "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
    ];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const daysArray = [];
    for (let i = 0; i < ((firstDay + 6) % 7); i++) daysArray.push(null);
    for (let i = 1; i <= lastDate; i++) daysArray.push(i);

    return (
        <>
            <div className="flex gap-3">
                <button
                    onClick={() => setOpenMap(true)}
                    className="hover:bg-gray-200 cursor-pointer rounded-2xl border py-1.5 px-6"
                >
                    Քարտեզ
                </button>
                <button
                    onClick={() => setOpen(true)}
                    className="hover:bg-gray-200 cursor-pointer rounded-full border p-2.5"
                >
                    <CiCalendar />
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-[95%] md:w-[70%] lg:w-[45%] rounded-2xl p-0 shadow-xl">

                        <div className="flex items-center justify-between px-5 py-4 border-b">
                            <h2 className="text-[18px] font-semibold">Նշեք Ձեր ցանկալի օրերը</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-lg hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="bg-orange-500 text-white flex items-center justify-between px-6 py-3 text-[18px] font-semibold">
                            <button onClick={prevMonth} className="text-white text-[22px]">←</button>
                            {months[month]}
                            <button onClick={nextMonth} className="text-white text-[22px]">→</button>
                        </div>

                        <div className="grid grid-cols-7 text-center py-3 text-gray-600 text-[15px] font-medium">
                            {daysOfWeek.map((d, i) => (
                                <div key={i}>{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-3 px-5 pb-5 text-[14px] text-gray-500">
                            {daysArray.map((day, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center justify-center h-10 rounded-full
                    ${day ? "cursor-pointer hover:bg-orange-200 hover:text-black" : ""}
                  `}
                                >
                                    {day || ""}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between px-6 pb-4 mt-2">
                            <button className="text-gray-600 hover:text-black">Փակել</button>
                            <button className="bg-gray-200 text-gray-700 py-2 px-5 rounded-xl hover:bg-gray-300">
                                Հաստատել
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {openMap && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-[90%] md:w-[70%] lg:w-[50%] h-[70vh] p-4 relative shadow-xl">
                        <button
                            onClick={() => setOpenMap(false)}
                            className="absolute right-4 top-3 text-xl hover:text-red-600"
                        >
                            ✕
                        </button>
                        <iframe
                            title="map"
                            width="100%"
                            height="100%"
                            style={{ borderRadius: "12px" }}
                            frameBorder="0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.541059876279!2d44.5152!3d40.1872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDExJzEzLjkiTiA0NMKwMzAnNTQuNyJF!5e0!3m2!1sen!2sam!4v0000000000000"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}