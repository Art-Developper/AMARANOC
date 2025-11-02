import background from "../assets/img/Screenshot.png";

const Announcement = () => {
    return (
        <div
            className="w-full  flex items-center justify-center" 
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="bg-opacity-70 p-16 m-24 rounded-lg shadow-lg w-3/4 max-w-6xl border-2 border-white text-white">
                <h2 className="text-center text-4xl font-bold mb-4">
                    <span className="inline-block border-b-2 border-white pb-2 px-4">
                        ՏԵՂԱԴՐԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈւՆ
                    </span>
                </h2>

                <p className="text-center text-lg mb-8">
                    Մուտքագրեք ձեր տվյալները նշված դաշտերում և մենք կկապվենք ձեզ հետ։
                </p>


                <div className="flex flex-wrap justify-center gap-4">
                    <input
                        type="text"
                        className="flex-1 min-w-[200px] p-3 border border-gray-600 rounded-md bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Անուն Ազգանուն"
                    />
                    <input
                        type="text"
                        className="flex-1 min-w-[200px] p-3 border border-gray-600 rounded-md bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Հեռախոսահամար"
                    />
                    <input
                        type="text"
                        className="flex-1 min-w-[200px] p-3 border border-gray-600 rounded-md bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Էլ. հասցե"
                    />
                    <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        Ուղարկել
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Announcement;