import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


import ServiceCard from "./ServiceCard"; // Կարգավորել ուղին ըստ անհրաժեշտության

// Ներմուծել նկարները
import Img1 from "../assets/img/1724331775249--0.webp";
import Img2 from "../assets/img/1724330468263--0.webp";
import Img3 from "../assets/img/1724331582281--0.webp";
import Img4 from "../assets/img/1724346434036--0.webp";
import Img5 from "../assets/img/1725721755318--0.webp";

// Ծառայությունների տվյալներ (թարմացված՝ նկարի վրա հիմնված քարտերին համապատասխան)
const services = {
  1: [
    {
      title: "Սպասարկում",
      description: "Փորձառու մատուցողները կարող են սպասարկել 15-20 անձի...",
      price: "20,000 ֏",
      priceUnit: "", // Այս մեկի համար ամսական չկա՝ ելնելով նկարից
      image: Img1,
    },
    {
      title: "Բարմեն",
      description: "Մեր պրոֆեսիոնալ բարմենները կհոգան ձեր միջոցառման...",
      price: "25,000 ֏",
      priceUnit: "",
      image: Img2,
    },
    {
      title: "Խոհարար",
      description: "Մեր խոհարարները կպատրաստեն ցանկացած տեսակի կերակուր...",
      price: "35,000 ֏",
      priceUnit: "",
      image: Img3,
    },
    {
      title: "Հանդիսավար",
      description: "Փորձառու հանդիսավարները կվարեն ցանկացած միջոցառում...",
      price: "20,000 ֏",
      priceUnit: "",
      image: Img4,
    },
    {
      title: "Լուսանկարիչ",
      description: "Պրոֆեսիոնալ լուսանկարիչը կլուսանկարի Ձեր ամենակարևոր պահերը...",
      price: "30,000 ֏",
      priceUnit: "",
      image: Img5,
    },
  ],
  2: [
    {
      title: "Ծննդյան Տորթեր",
      description: "Ամենագեղեցիկ և համեղ տորթերը ձեր տոնի համար։",
      price: "15,000 ֏",
      priceUnit: "",
      image: Img5, // Օրինակի համար նորից օգտագործում ենք
    },
    {
      title: "Երաժշտություն",
      description: "Կենդանի երաժշտություն կամ DJ ցանկացած միջոցառման համար։",
      price: "50,000 ֏",
      priceUnit: "",
      image: Img4, // Օրինակի համար նորից օգտագործում ենք
    },
     {
      title: "Ծաղկի Ձևավորում",
      description: "Օրիգինալ և շքեղ ծաղկի ձևավորում ցանկացած միջոցառման համար։",
      price: "25,000 ֏",
      priceUnit: "",
      image: Img3, // Օրինակի համար նորից օգտագործում ենք
    },
  ],
  3: [
    {
      title: "Ֆոտոսեսիա",
      description: "Անմոռանալի պահեր պրոֆեսիոնալ լուսանկարչի հետ։",
      price: "20,000 ֏",
      priceUnit: "",
      image: Img2, // Օրինակի համար նորից օգտագործում ենք
    },
    {
      title: "Վիդեո նկարահանում",
      description: "Մասնագիտական վիդեո նկարահանում ձեր հիշարժան իրադարձության համար։",
      price: "40,000 ֏",
      priceUnit: "",
      image: Img1, // Օրինակի համար նորից օգտագործում ենք
    },
  ],
};


export default function ServiceMission() {
  const [tabValue, setTabValue] = React.useState("1");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState("left");

  const itemsPerPage = 3;

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
    setCurrentIndex(0);
    setDirection("left");
  };

  const handleNext = () => {
    if (
      services[tabValue] && // Փոխվել է packages-ից services
      currentIndex + itemsPerPage < services[tabValue].length
    ) {
      setDirection("left");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection("right");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentServices = services[tabValue] // Փոխվել է packages-ից services
    ? services[tabValue].slice(currentIndex, currentIndex + itemsPerPage)
    : [];

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="Tabs with carousel">
            <Tab label="Մատուցողական" value="1" /> {/* Թարմացված էջանիշեր */}
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
            alignItems: "center",
            justifyContent: "center",
            minHeight: 600,
          }}
        >
          <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
            <ArrowBackIosIcon />
          </IconButton>

          <Box
            sx={{
              mx: 2,
              width: 1000,
              display: "flex",
              justifyContent: "flex-start",
              overflow: "hidden",
            }}
          >
            <Slide
              direction={direction}
              in={true}
              mountOnEnter
              unmountOnExit
              key={`${tabValue}-${currentIndex}`}
            >
              <Box sx={{ display: "flex" }}>
                {currentServices.map((service, index) => ( // Փոխվել է currentPackages.map-ից currentServices.map
                  <ServiceCard key={service.title || `empty-${index}`} service={service} />
                ))}
              </Box>
            </Slide>
          </Box>

          <IconButton
            onClick={handleNext}
            disabled={
              !services[tabValue] || // Փոխվել է packages-ից services
              currentIndex + itemsPerPage >= services[tabValue].length
            }
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </TabContext>
    </Box>
  );
}