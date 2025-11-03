import React from 'react';
import firstImg from '../assets/img/first_image.webp';
import abUs from '../assets/img/about_us.webp';
import team from '../assets/img/team.webp';
import secondImg from '../assets/img/second.webp';
import amaranoc from '../assets/img/amaranoc.webp';
import marketing from '../assets/img/marketing.webp';
import thirdImg from '../assets/img/third.webp';

const AboutMission = () => {
    return (
        <>

            <div className="w-full mb-8">
                <img src={firstImg} alt="First Image" className="w-full h-auto object-cover" />
            </div>


            <div className="container mx-auto py-8">


                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-6 rounded-lg shadow-md">
                    <div className="md:w-1/2">
                        <img src={abUs} alt="About Us" className="w-full h-auto object-cover rounded-lg shadow-sm" />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 border-b-2 pb-2 border-gray-300">ՄԵՐ ՄԱՍԻՆ</h2>
                        <p className="text-lg leading-relaxed">
                            Amaranoc.am-ը վստահության, հավատարմության և գերազանցության ձգտման պատմություն է: 
                            Հանդիսանալով ամառանոցների վարձակալության ոլորտում համար մեկ ընկերությունը, մենք ձեզ 
                            առաջարկում ենք շքեղ առանձնատների, քոթեջների, վիլլաների և ամառանոցների լայն ու բազմազան 
                            ընտրություն; Մեր հիմնական առաքելությունն է սպասարկել մեր հաճախորդներին ամենաբարձր մակարդակով՝ 
                            ստեղծելով հարմարավետության և շքեղության մթնոլորտ մեր յուրաքանչյուր առանձնատանը:Մեր նվիրվածությունը 
                            և մանրուքների հանդեպ ուշադրությունը երաշխավորում է հիշարժան հանգիստ Հայաստանի ամենահիասքանչ ամառանոցներում
                        </p>
                    </div>
                </div>

               
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12 bg-white p-6 rounded-lg shadow-md">
                    <div className="md:w-1/2">
                        <img src={team} alt="Our Team" className="w-full h-auto object-cover rounded-lg shadow-sm" />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 border-b-2 pb-2 border-gray-300">ՄԵՐ ԹԻՄԸ</h2>
                        <p className="text-lg leading-relaxed">
                            Շուրջ 20 մասնագետներից բաղկացած մեր պրոֆեսիոնալ թիմն իր աշխատանքն 
                            իրականացնում է փայլուն հմտությամբ՝ բավարարելու անգամ ամենաքմահաճ 
                            հաճախորդի կարիքները: Շնորհիվ ոլորտում ունեցած մեր անգնահատելի փորձի, 
                            մեր նպատակն է անմոռանալի պահեր ստեղծել մեր հյուրերի համար: 
                            Մենք պարզապես չենք ստեղծում ժամանց, մենք ստեղծում ենք պատմություններ, 
                            և յուրաքանչյուր առանձնատուն (որոնք դուք տեսնում եք մեր կայքում) այդ 
                            պատմության մի մասն է: Օրեցօր ընդլայնվելով՝ մենք ձգտում ենք նորագույն 
                            չափանիշներ սահմանել ոլորտում և որ ամենակարևորն է մենք օր օրի հստակ ու 
                            կայուն քայլերով շարժվում ենք առաջ՝ բարելավելով մեր երկրում սպասարկման 
                            ոլորտը՝ շքեղ առանձնատները հասանելի դարձնելով բոլորին:
                        </p>
                    </div>
                </div>

            </div> 


            <div className="w-full mb-8">
                <img src={secondImg} alt="Second Image" className="w-full h-auto object-cover" />
            </div>


            <div className="container mx-auto py-8">


                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white p-6 rounded-lg shadow-md">
                    <div className="md:w-1/2">
                        <img src={amaranoc} alt="Amaranoc" className="w-full h-auto object-cover rounded-lg shadow-sm" />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 border-b-2 pb-2 border-gray-300">Ինչու համագործակցել amaranoc.am -ի հետ</h2>
                        <p className="text-lg leading-relaxed">
                            Amaranoc.am-ի ընտրությունը երաշխավորում է շքեղության, անհատականացված 
                            սպասարկման բարձր մակարդակ և իհարկե վստահության հիմքի վրա կառուցված 
                            կայուն համագործակցություն. Գերազանցության հանդեպ մեր բարձր ձգտումը 
                            և հավատարմությունը, էքսկլուզիվ առաջարկների լայն ընտրությունը և մեր 
                            յուրաքանչյուր հյուրի նախասիրությունների նկատմամբ մանրակրկիտ ուշադրությունը 
                            մեզ առանձնացնում են ոլորտում բոլորից՝ դարձնելով առաջատար; Մենք առաջարկում 
                            ենք որակ և ստեղծում ենք հարմարավետության բարձր զգացում, որոնք գերազանցում 
                            են ձեր բոլոր սպասելիքները; Մենք բարձր ենք գնահատում մեր գործընկերների և մեր 
                            հաճախորդների վստահությունը: Այդ վստահությունը մեր ընկերության հիմքն է: 
                            Մենք խորապես հակված ենք այն գաղափարին, որ մեր առանձնատներում անցկացրած յուրաքանչյուր պահը պետք է լինի առանձնահատուկ: 
                            Մեր գործընկերների և հաճախորդների վստահությունը մեր կարևորագույն արժեքն 
                            է, իսկ ամենաբարձր մակարդակով սպասարկումը մեր ընդհանուր նպատակը:
                        </p>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12 bg-white p-6 rounded-lg shadow-md">
                    <div className="md:w-1/2">
                        <img src={marketing} alt="Marketing" className="w-full h-auto object-cover rounded-lg shadow-sm" />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 border-b-2 pb-2 border-gray-300">ՄԱՐՔԵԹԻՆԳ</h2>
                        <p className="text-lg leading-relaxed">
                            Amaranoc.am-ում մենք գիտակցում ենք մարքեթինգի առանցքային դերը ամառանոցների 
                            վարձակալության ոլորտում; Մեր ռազմավարական մարքեթինգային նախաձեռնությունները 
                            ներառում են էքսկլյուզիվ համագործակցություններ և շեշտադրում են մեր ամառանոցների 
                            եզակի առանձնահատկությունները. 10 մասնագետից բաղկացած մեր պրոֆեսիոնալ մարքեթինգի 
                            թիմը աշխատում է բարձր պատասխանատվությամբ և նվիրումով, որպեսզի դուք միշտ առաջինը 
                            տեղեկացված լինեք լավագույն առաջարկների մասին.
                        </p>
                    </div>
                </div>
            </div> 


            <div className="w-full">
                <img src={thirdImg} alt="Third Image" className="w-full h-auto object-cover" />
            </div>
        </>
    );
}

export default AboutMission;