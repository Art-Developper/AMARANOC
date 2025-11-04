import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ServiceCard from "./ServiceCard";

// Ներմուծել նկարները
import Img1 from "../assets/img/1724331775249--0.webp";
import Img2 from "../assets/img/1724330468263--0.webp";
import Img3 from "../assets/img/1724331582281--0.webp";
import Img4 from "../assets/img/1724346434036--0.webp";
import Img5 from "../assets/img/1725721755318--0.webp";

// Ներմուծել Material-UI պատկերակները
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Սպասարկում
import KitchenIcon from '@mui/icons-material/Kitchen';         // Խոհարարական
import EventIcon from '@mui/icons-material/Event';             // Միջոցառումներ
import SettingsIcon from '@mui/icons-material/Settings';       // Տեխնիկական (կարող է լինել ցանկացած այլ)
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'; // Օրակարգով Թրք (ժամացույցի օրինակ)
import CameraAltIcon from '@mui/icons-material/CameraAlt';     // Նկարահանում

// Ծառայությունների տվյալներ (նույնը, ինչ նախկինում)
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
            description: "Փորձառու հանդիսավարները կվարեն ցանկացած միջոցառում՝ հարսանիք, ծնննդյան տարեդարձ, կորպորատիվ երեկույթներ և այլն: Նրանք կապահովեն ուրախ և անմոռանալի մթնոլորտ...",
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
                    <TabList
                        onChange={handleTabChange}
                        aria-label="Ծառայությունների ցուցակ պատկերակներով"
                        
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', 
                            gap: { xs: 1, sm: 2, md: 4 },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'orange', 
                            },
                            '& .MuiTab-root': {
                                '&.Mui-selected': {
                                    color: 'orange', 
                                },
                            },
                        }}
                    >
                        <Tab label="Սպասարկում" value="1" icon={<RestaurantMenuIcon />} iconPosition="top" />
                        <Tab label="Խոհարարական" value="2" icon={<KitchenIcon />} iconPosition="top" />
                        <Tab label="Միջոցառումներ" value="3" icon={<EventIcon />} iconPosition="top" />
                        <Tab label="Տեխնիկական" value="4" icon={<SettingsIcon />} iconPosition="top" />
                        <Tab label="Օրակարգով Թրք" value="5" icon={<AccessAlarmIcon />} iconPosition="top" />
                        <Tab label="Նկարահանում" value="6" icon={<CameraAltIcon />} iconPosition="top" />
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
                            width: "100%",
                            maxWidth: 1200,
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        {currentServices.length > 0 ? (
                            currentServices.map((service, index) => (
                                <ServiceCard key={service.title || `service-${index}`} service={service} />
                            ))
                        ) : (
                            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                                Այս բաժնում ծառայություններ առայժմ չկան։
                            </Box>
                        )}
                    </Box>
                </Box>
            </TabContext>
        </Box>
    );
}