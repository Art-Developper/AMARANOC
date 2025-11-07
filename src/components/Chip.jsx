import React from 'react'

export default function chip({ active, onClick, children }) {
    const PRIMARY = "#101623";
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-full text-sm border transition min-w-[44px] text-center ${active ? `bg-[${PRIMARY}] text-white border-[${PRIMARY}]` : `bg-white text-[${PRIMARY}] border-gray-200 hover:bg-purple-50`
                }`}
        >
            {children}
        </button>

    )
}