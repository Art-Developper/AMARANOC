import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ServiceCard from "./ServiceCard";


import Img1 from "../assets/img/1724331775249--0.webp";
import Img2 from "../assets/img/1724330468263--0.webp";
import Img3 from "../assets/img/1724331582281--0.webp";
import Img4 from "../assets/img/1724346434036--0.webp";
import Img5 from "../assets/img/1725721755318--0.webp";


const services = {
    1: [ 
        {
            title: "Մատուցող",
            description: "Փորձառու մատուցողները կարող են սպասարկել 15-20 անձի: Ծառայության արժեքը կախված է միջոցառման անցկացման վայրից: Ձեր միջոցառման կազմակերպման գործում ձեզ...",
            price: "20,000 ֏",
            priceUnit: "",
            image: Img1,
        },
        {
            title: "Բարմեն",
            description: "Մեր պրոֆեսիոնալ բարմենները կհոգան ձեր միջոցառման բարձրորակ խմիչքների պատրաստման և մատուցման համար: Միջոցառումն ավելի հիշարժան կդառնա մեր բարմենի շնորհիվ...",
            price: "25,000 ֏",
            priceUnit: "",
            image: Img2,
        },
        {
            title: "Խոհարար",
            description: "Մեր պրոֆեսիոնալ խոհարարները կպատրաստեն ցանկացած տեսակի կերակուր՝ ըստ ձեր ճաշակի և ցանկությունների: Նրանք կօգտագործեն միայն թարմ և որակյալ մթերքներ...",
            price: "35,000 ֏",
            priceUnit: "",
            image: Img3,
        },
        {
            title: "Հանդիսավար",
            description: "Փորձառու հանդիսավարները կվարեն ցանկացած միջոցառում՝ հարսանիք, ծննդյան տարեդարձ, կորպորատիվ երեկույթներ և այլն: Նրանք կապահովեն ուրախ և անմոռանալի մթնոլորտ...",
            price: "20,000 ֏",
            priceUnit: "",
            image: Img4,
        },
        {
            title: "Լուսանկարիչ",
            description: "Պրոֆեսիոնալ լուսանկարիչը կլուսանկարի Ձեր ամենակարևոր պահերը՝ պահպանելով դրանք հիշողության մեջ: Մենք առաջարկում ենք բարձրորակ ֆոտոսեսիաներ...",
            price: "30,000 ֏",
            priceUnit: "",
            image: Img5,
        },
    ],
    2: [
        {
            title: "Տորթեր պատվերով",
            description: "Ամենագեղեցիկ և համեղ տորթերը ձեր տոնի համար։",
            price: "15,000 ֏",
            priceUnit: "",
            image: Img5, 
        },
        {
            title: "Երաժշտություն",
            description: "Կենդանի երաժշտություն կամ DJ ցանկացած միջոցառման համար։",
            price: "50,000 ֏",
            priceUnit: "",
            image: Img4, 
        },
        {
            title: "Ծաղկի Ձևավորում",
            description: "Օրիգինալ և շքեղ ծաղկի ձևավորում ցանկացած միջոցառման համար։",
            price: "25,000 ֏",
            priceUnit: "",
            image: Img3,
        },
    ],
    3: [
        {
            title: "Ֆոտոսեսիա",
            description: "Անմոռանալի պահեր պրոֆեսիոնալ լուսանկարչի հետ։",
            price: "20,000 ֏",
            priceUnit: "",
            image: Img2, 
        },
        {
            title: "Վիդեո նկարահանում",
            description: "Մասնագիտական վիդեո նկարահանում ձեր հիշարժան իրադարձության համար։",
            price: "40,000 ֏",
            priceUnit: "",
            image: Img1,
        },
    ],
    4: [], 
    5: [], 
    6: [], 
};


export default function ServiceMission() {
    const [tabValue, setTabValue] = React.useState("1");


    const handleTabChange = (_event, newValue) => {
        setTabValue(newValue);

    };



    const currentServices = services[tabValue]
        ? services[tabValue] 
        : [];

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleTabChange} aria-label="Services carousel">
                        <Tab label="Սպասարկում" value="1" /> 
                        <Tab label="Խոհարարական" value="2" />
                        <Tab label="Միջոցառումներ" value="3" />
                        <Tab label="Տեխնիկական" value="4" />
                        <Tab label="Օրակարգով Թրք" value="5" />
                        <Tab label="Նկարահանում" value="6" />
                    </TabList>
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        display: "flex",
                        justifyContent: "center", 
                        minHeight: 600,
                    }}
                >
     

                    <Box
                        sx={{
                            mx: 2,
                            width: "100%", // Ամբողջ լայնությամբ
                            display: "flex",
                            justifyContent: "center", // Քարտերը կենտրոնում
                            flexWrap: "wrap", // Թույլ է տալիս քարտերին տողից տող անցնել
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
                            {currentServices.map((service, index) => (
                                <ServiceCard key={service.title || `empty-${index}`} service={service} />
                            ))}
                        </Box>
                    </Box>


                </Box>
            </TabContext>
        </Box>
    );
}