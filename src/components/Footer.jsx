import FooterLogo from "../assets/img/footer-background.webp";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-[#1a1e2c] text-white pt-10">

            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl font-bold mb-8 custom-footer-md:text-4xl">ԿՈՆՏԱԿՏՆԵՐ</h1>


                <div className="flex flex-col md:flex-row justify-center gap-x-8 gap-y-4 mb-8 text-base custom-footer-md:text-lg">
                    <p className="flex items-center gap-2 cursor-pointer">
                        <FaPhone className="text-xl" />041-611-611 / 044-611-611
                    </p>
                    <p className="flex items-center gap-2 cursor-pointer">
                        <FaEnvelope className="text-xl" />AMARANOC.INFO@MAIL.COM
                    </p>
                    <a href="https://www.instagram.com/amaranoc.am/?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <FaInstagram className="text-xl" />AMARANOC.AM
                    </a>
                    <a href="https://www.facebook.com/aamaranoc.am?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <FaFacebook className="text-xl" />AMARANOC.AM
                    </a>
                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-xl" />ԲԱՄԲԱԿԱՇԱՏ, 5
                    </p>
                </div>


                <Link to="#" className="block mb-8 text-white">
                    Գաղտնիության քաղաքականություն
                </Link>

                <p className="mb-10 text-gray-400">
                    Ամառանոց ՍՊԸ | Amaranoc LLC | Амараноц ООО
                </p>
            </div>

            <div className="relative w-full h-auto mt-auto">
                <img
                    src={FooterLogo}
                    alt="footer_background"
                    className="w-full h-auto object-cover"
                />

            </div>
        </footer>
    )
}

export default Footer;