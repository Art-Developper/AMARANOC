import React from "react";
import { FaMapMarkerAlt, FaUserFriends, FaHeart } from "react-icons/fa";

export default function Card({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="relative">
        <img
          src={item.image}
          className="w-full h-56 object-cover"
          alt={item.title}
        />


        <button className="absolute top-3 right-3 bg-white/70 p-2 rounded-full">
          <FaHeart className="text-gray-600 text-xl" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between text-gray-700 text-sm">
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt /> {item.location}
          </span>
          <span className="flex items-center gap-2">
            <FaUserFriends /> {item.people}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-gray-900">{item.price} ֏</p>

          <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            ★ {item.rating}
          </span>
        </div>
      </div>
    </div>
  );
}