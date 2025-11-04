import React from 'react'
import Card from './DisocountCard'

export default function Discounts() {
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
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1759149473223--0.33907271602966693image.webp&w=1920&q=75",
            location: "Բջնի",
            price: "40,000֏",
        },
        {
            id: 2,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1753697519352--0.8706588573375771image.webp&w=1920&q=75",
            location: "Օհանավան",
            price: "75,000֏",
        },
        {
            id: 3,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1758095203425--0.034694092059661896image.webp&w=1920&q=75",
            location: "Ծաղկաձոր",
            price: "75,000֏",
        },
        {
            id: 4,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1759146875412--0.6077182024752312image.webp&w=1920&q=75",
            location: "Բջնի",
            price: "80,000֏",
        },
        {
            id: 5,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1757515466510--0.9370355470461651image.webp&w=1920&q=75",
            location: "Օհանավան",
            price: "85,000֏",
        },
        {
            id: 6,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1757515466510--0.9370355470461651image.webp&w=1920&q=75",
            location: "Ծաղկաձոր",
            price: "90,000֏",
        },
        {
            id: 7,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1712326262412--0.25440242535580326image.webp&w=1920&q=75",
            location: "Նոր Հաճն",
            price: "120,000֏",
        },
        {
            id: 8,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1705829500856--0.9156560389221753image.webp&w=1920&q=75",
            location: "Ծաղկաձոր",
            price: "130,000֏",
        },
        {
            id: 9,
            image:
                "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1756396894356--0.17186088991677884image.webp&w=1920&q=75",
            location: "Արզնի",
            price: "140,000֏",
        },
    ];


    return (
        <>
            <div>
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
                                    className="px-6 py-2 border-2 border-white rounded-full text-lg transition hover:bg-white hover:text-orange-600"
                                >
                                    {price}
                                </button>
                            ))}
                        </div>

                        <button className="px-10 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition text-lg">
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
                            <Card key={item.id} item={item} />
                        ))}
                    </div>
                </div>
                <button className='flex mt-10 w-full items-center justify-center '>

                    <div className='px-10 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md transition text-lg'>

                        Ցուցադրել ավելին
                    </div>
                </button>
            </div>

        </>
    )
}