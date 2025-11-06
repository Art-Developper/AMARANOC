import * as React from "react";
import { useState } from "react"; 
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ServiceCard from "./ServiceCard";
import Dialog from "@mui/material/Dialog"; 
import DialogTitle from "@mui/material/DialogTitle"; 
import DialogContent from "@mui/material/DialogContent"; 
import DialogActions from "@mui/material/DialogActions"; 
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import MuiPhoneNumber from 'material-ui-phone-number'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/hy-am'; 


import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import KitchenIcon from '@mui/icons-material/Kitchen';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


import Img1 from "../assets/img/1724331775249--0.webp";
import Img2 from "../assets/img/1724330468263--0.webp";
import Img3 from "../assets/img/1724331582281--0.webp";
import Img4 from "../assets/img/1724346434036--0.webp";
import Img5 from "../assets/img/1725721755318--0.webp";


const services = {
    1: [
        {
            title: "Մատուցող",
            description: "Յուրաքանչյուր մատուցող կարող է սպասարկել 15-20 անձի։ Ծառայության արժեքը կախված է միջոցառման անցկացման վայրից։ Ձեր միջոցառման կազմակերպման գործում Ձեզ կօգնեն մեր փորձառու մատուցողները: Հաղորդակցման գերազանց հմտություններով և մանրուքների հանդեպ ուշադրությամբ, նրանք կապահովեն հյուրընկալ մթնոլորտ և բարձրակարգ սպասարկում։ Մեր հանգստյան գոտիներում անցկացրած միջոցառումները կթողնեն անմոռանալի հիշողություններ ի շնորհիվ մեր տարիների փորձի։",
            price: "20,000 ֏",
            priceUnit: "",
            image: Img1,
        },
        {
            title: "Բարմեն",
            description: "Մեր պրոֆեսիոնալ բարմենները տիրապետում են տարբեր տեսակի խմիչքների պատրաստման հմտություններին։ Մեր բարմենները պատասխանատու են բարում նստած հաճախորդներին բարձրակարգ սպասարկում մատուցելու համար, ինչպես նաև հյուրերին խմիչքների ընտրության հարցում խորհրդատվություն տրամադրելու, հաճախորդների պահանջներին արձագանքելու համար։",
            price: "25,000 ֏",
            priceUnit: "",
            image: Img2,
        },
        {
            title: "Խոհարար",
            description: "Արժեքը կախված է միջոցառման անձանց քանակից և ուտեստների մենյուից։  Ունենալով հարուստ փորձ և տաղանդ, Մեր խոհարարները ստեղծում են համերի և նրբաճաշակության զարմանալի համադրություններ: Մեր խոհարարները ընտրում են միայն ամենաթարմ և ամենաբարձր որակի բաղադրիչները, որպեսզի Ձեզ մատուցեն յուրահատուկ խոհարարական փորձ: Մեր խոհարարները պատասխանատու են սննդի պատրաստման և պատրաստման տեխնիկայ։համար: Նրանք ապահովում են ցանկացած տեսակի սննդի պատրաստումը՝ նախնական համաձայնության գալով միջոցառման կազմակերպչի հետ։",
            price: "35,000 ֏",
            priceUnit: "",
            image: Img3,
        },
        {
            title: "Հանդիսավար",
            description: "Այս բաժնում մենք կփորձենք օգնել Ձեզ հանդիսավարի (թամադայի), ընտրության հարցում, քանի որ միայն իսկական հանդիսավարը կարող է իր վարպետությամբ ստեղծել հիասքանչ և տոնական մթնոլորտ։ ",
            price: "60,000 ֏",
            priceUnit: "",
            image: Img4,
        },
        {
            title: "Փրփուր Փարթի",
            description: "Նյութերը սերտիֆիկացված են, աչքերը չեն մռմռացնում, ալերգիա չեն առաջացնում, անվնաս են նաև բույսերի և լողավազանի համար:",
            price: "26,900 ֏",
            priceUnit: "",
            image: Img5,
        },
    ],
    2: [
        {
            title: "Դի-Ջեյ",
            description: "Դիջեյներն Մեր կազմակերպած միջոցառումների աստղերն են՝ ովքեր ստեղծում են յուրահատուկ մթնոլորտ և զվարճանք: Amaranoc.am-ի դիջեյները վարպետորեն տիրապետում են երաժշտական ​​ռեպերտուարին, որը կարող է գոհացնել յուրաքանչյուր ճաշակ և բարձրացնել  տրամադրություն: Իրենց երաժշտական ​​միքսերով նրանք երեկոն վերածում են իրական խնջույքի,որը դեռ երկար կմնա մեր հյուրերի հիշողության մեջ։",
            price: "50,000 ֏",
            priceUnit: "",
            image: Img5,
        },
        {
            title: "Երգիչ",
            description: "Amaranoc.am ի երգիչները, իրենց զարմանալի ձայնով և տաղանդով, կստեղծեն յուրահատուկ մթնոլորտ։ Ընկղմվեք հնչյունների և ռիթմերի աշխարհում՝ վայելելով երաժշտության աննկարագրելի հաճույքը։",
            price: "150,000 ֏",
            priceUnit: "",
            image: Img4,
        },
        {
            title: "Կրակներով շոու",
            description: "Կրակներով շոուն կստեղծի վառ և հիասքանչ ժամանց, որոնք կտպավորվեն մշտեպես Ձեր հիշողության մեջ։Մեր պրոֆեսիոնալ արտիստները տիրապետելով կրակի հետ խաղալու արվեստին, ստեղծում են ապշեցուցիչ գեղեցկությամբ և ադրենալինով լի ներկայացումներ: Այստեղ դուք կընկղմվեք մի աշխարհ,որտեղ դուք ամբողջովին կզգաք կրակի իրական գեղեցկությունը և ջերմությունը։",
            price: "50,000 ֏",
            priceUnit: "",
            image: Img3,
        },{
            title: "Ջութակահար",
            description: "Մեր տաղանդավոր երաժիշտները կստեղծեն անկրկնելի մթնոլորտ, որը կլցնի Ձեր միջոցառումը երաժշտության հրաշքներով՝ դասական հնչյուններից մինչև ժամանակակից հիթեր։ Մեղեդիների ուղեկցությամբ Դուք կտեղափոխվեք մի աշխարհ՝ լցված նրբագեղությամբ և ոգեշնչմամբ։",
            price: "80,000 ֏",
            priceUnit: "",
            image: Img3,
        },{
            title: "Խաղավար",
            description: "Մեր խաղավարները միշտ կգտնեն Ձեր հյուրերին ուրախացնելու և Ձեր միջոցառումը մրցույթներով զարդարելու միջոց:",
            price: "15,000 ֏",
            priceUnit: "",
            image: Img3,
        },{
            title: "Մուլտհերոսներ",
            description: "Մեր մուլտհերոսները կախարդական կերպարներ են, ովքեր ժպիտ ու ուրախություն կպարգևեն ոչ միայն երեխաներին, այլև մեծերին: Իրենց գունեղ անհատականություններով նրանք ձեզ կտանեն ֆանտաստիկայի և արկածների հիանալի աշխարհ՝ բարի և խիզախ սուպերհերոսներից մինչև սրամիտ և զվարճալի կենդանիներ։ Ձեր միջոցառմանը հրավիրեք Մեր սիրելի մուլտհերոսներին, և նրանք կպարգևեն Ձեր հյուրերին ուրախության և կախարդական նմոռանալի պահեր:",
            price: "5,000 ֏",
            priceUnit: "",
            image: Img3,
        },{
            title: "Աճպարար",
            description: "Աճպարարի յուրաքանչյուր ներկայացում՝ լինի դա խենթ շողալու մոգություն, բարդ թարմություն կամ ճկուն տեխնիկա, միշտ առանձնանում է բացառիկությամբ: Նա ստեղծում է մթնոլորտ, որտեղ իրականությունը ու երևակայությունը միաձուլվում են, իսկ հանդիսատեսը հայտնվում է մի աշխարհում, որտեղ ամեն ինչ հնարավոր է: Հրավիրելով Մեր աճպարարին Դուք հնարավորություն կունենաք ականատես լինելու  անհավատալի տեսարանների, որոնք կզարմացնեն ոչ միայն փոքրերին այլ նաև մեծերին։",
            price: "60,000 ֏",
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
    const [openBookingDialog, setOpenBookingDialog] = useState(false); 
    const [currentBookingStep, setCurrentBookingStep] = useState(1); 
    const [selectedService, setSelectedService] = useState(null); 
    const [selectedDate, setSelectedDate] = useState(null); 
    const [customerName, setCustomerName] = useState(""); 
    const [customerPhone, setCustomerPhone] = useState(""); 

    const handleTabChange = (_event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpenBooking = (service) => {
        setSelectedService(service);
        setOpenBookingDialog(true);
        setCurrentBookingStep(1); 
        setSelectedDate(null); 
        setCustomerName(""); 
        setCustomerPhone(""); 
    };

    const handleCloseBooking = () => {
        setOpenBookingDialog(false);
        setSelectedService(null);
        setCurrentBookingStep(1);
    };

    const handleNextStep = () => {
        if (currentBookingStep === 2 && !selectedDate) {
            alert("Խնդրում ենք ընտրել ամսաթիվը:");
            return;
        }
        if (currentBookingStep === 3 && (!customerName || !customerPhone)) {
             alert("Խնդրում ենք լրացնել անունը և հեռախոսահամարը:");
            return;
        }
        setCurrentBookingStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setCurrentBookingStep((prev) => prev - 1);
    };

    const handleConfirmBooking = () => {
        console.log("Ամրագրումը հաստատված է!", {
            service: selectedService.title,
            date: selectedDate ? selectedDate.format('YYYY-MM-DD') : 'Չի ընտրվել',
            name: customerName,
            phone: customerPhone,
        });
        setCurrentBookingStep(4); 
        // handleCloseBooking(); 
    };

    const currentServices = services[tabValue]
        ? services[tabValue]
        : [];

    const renderBookingContent = () => {
        switch (currentBookingStep) {
            case 1:
                return (
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {selectedService?.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            {selectedService?.description}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mt: 2,
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                    {selectedService?.price} {selectedService?.priceUnit}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={handleNextStep}
                                sx={{
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'darkorange' },
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    padding: '8px 24px',
                                }}
                            >
                                Ամրագրել
                            </Button>
                        </Box>
                    </Box>
                );
            case 2:
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hy-am">
                        <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', width: '100%', textAlign: 'left' }}>
                                Ընտրեք ամրագրման ամսաթիվը
                            </Typography>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                disablePast 
                                sx={{ width: '100%', maxWidth: 350 }} 
                            />
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                mt: 2,
                                borderTop: '1px solid #eee',
                                pt: 2,
                            }}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                    {selectedService?.price} {selectedService?.priceUnit}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleNextStep}
                                    disabled={!selectedDate} 
                                    sx={{
                                        backgroundColor: 'orange',
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'darkorange' },
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        padding: '8px 24px',
                                    }}
                                >
                                    Շարունակել
                                </Button>
                            </Box>
                        </Box>
                    </LocalizationProvider>
                );
            case 3:
                return (
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', width: '100%', textAlign: 'left' }}>
                            Ամրագրում
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Կատարեք ամրագրում Ձեր ընտրած օրվա համար՝ մուտքագրելով Ձեր անունը և հեռախոսահամարը։
                        </Typography>
                        <TextField
                            label="Անուն"
                            variant="outlined"
                            fullWidth
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            error={!customerName && currentBookingStep === 3} 
                            helperText={!customerName && currentBookingStep === 3 ? "Անունը պարտադիր է" : ""}
                        />
                        <MuiPhoneNumber
                            defaultCountry={'am'} 
                            label="Հեռախոսահամար"
                            variant="outlined"
                            fullWidth
                            value={customerPhone}
                            onChange={(value) => setCustomerPhone(value)}
                            error={!customerPhone && currentBookingStep === 3} 
                            helperText={!customerPhone && currentBookingStep === 3 ? "Հեռախոսահամարը պարտադիր է" : ""}
                        />
                         <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mt: 2,
                            borderTop: '1px solid #eee',
                            pt: 2,
                        }}>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                                {selectedService?.price} {selectedService?.priceUnit}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleConfirmBooking}
                                disabled={!customerName || !customerPhone} 
                                sx={{
                                    backgroundColor: 'orange',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'darkorange' },
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    padding: '8px 24px',
                                }}
                            >
                                Հաստատել
                            </Button>
                        </Box>
                    </Box>
                );
            case 4:
                return (
                    <Box sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
                        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Ամրագրումը հաջողությամբ կատարված է:
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Ձեզ նախօրոք կզանգահարեն ամրագրման մանրամասները հաստատելու համար։
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleCloseBooking}
                            sx={{
                                backgroundColor: 'orange',
                                color: 'white',
                                '&:hover': { backgroundColor: 'darkorange' },
                                borderRadius: 2,
                                textTransform: 'none',
                                padding: '8px 24px',
                            }}
                        >
                            Լավ
                        </Button>
                    </Box>
                );
            default:
                return null;
        }
    };

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
                                <ServiceCard
                                    key={service.title || `service-${index}`}
                                    service={service}
                                    onBook={handleOpenBooking} 
                                />
                            ))
                        ) : (
                            <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                                Այս բաժնում ծառայություններ առայժմ չկան։
                            </Box>
                        )}
                    </Box>
                </Box>
            </TabContext>


            <Dialog
                open={openBookingDialog}
                onClose={handleCloseBooking}
                fullWidth
                maxWidth="sm" 
                PaperProps={{
                    sx: { borderRadius: 3 } 
                }}
            >
                <DialogTitle sx={{
                    backgroundColor: 'orange',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {currentBookingStep > 1 && currentBookingStep < 4 && ( 
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handlePreviousStep}
                                aria-label="back"
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {currentBookingStep === 1 && selectedService?.title}
                            {currentBookingStep === 2 && "Ընտրեք ամրագրման ամսաթիվը"}
                            {currentBookingStep === 3 && "Ամրագրում"}
                            {currentBookingStep === 4 && "Ամրագրումը հաստատված է"}
                        </Typography>
                    </Box>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleCloseBooking}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 0 }}> 
                    {renderBookingContent()}
                </DialogContent>
            </Dialog>
        </Box>
    );
}