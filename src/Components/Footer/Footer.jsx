import { Link } from "react-router";
import { FaBehance, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocalPhone, MdOutlineMail } from "react-icons/md";
import useTheme from "../../Hooks/useTheme";
import MyContainer from "../MyContainer/MyContainer";
import LogoImg from "../../assets/Logo.png";

const Footer = () => {
  // Theme custom hook
  const { isDark } = useTheme();
  return (
    <div className={` ${isDark ? "bg-gray-700" : "bg-gray-700 text-white"}`}>
      <MyContainer>
        <footer className="px-3 md:px-0 text-white py-12">
          <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Column 1 - About */}
              <div>
                <Link to="/" className="flex items-center -mt-4">
                  <img className="-ml-3 h-[70px] w-20" src={LogoImg} alt="" />
                  <h2 className="-ml-2 font-bold border-b-2">
                    G-<span className="text-[#F0B92D]">Flow</span>
                  </h2>
                </Link>
                <p className=" sm:text-justify  lg:mr-12 text-gray-300">
                  We are a company committed to providing the best products and
                  services. Join us in our journey to excellence.
                </p>
              </div>

              {/* Column 2 - Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a href="#" className="hover:text-white">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 - Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <MdLocalPhone /> +123 456 7890
                  </li>
                  <li className="flex items-center gap-2">
                    <MdOutlineMail /> info@example.com
                  </li>
                  <li>123 Street, City, Country</li>
                </ul>
              </div>

              {/* Column 4 - Social Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4 text-black">
                  <Link
                    className="bg-amber-50 p-1 rounded-full"
                    to="https://www.facebook.com/"
                    target="_blank"
                  >
                    <FaFacebookF size={15} />
                  </Link>
                  <Link
                    className="bg-amber-50 p-1 rounded-full"
                    to="https://www.instagram.com/"
                    target="_blank"
                  >
                    <FaInstagram size={15} />
                  </Link>
                  <Link
                    className="bg-amber-50 p-1 rounded-full"
                    to="https://x.com/home"
                    target="_blank"
                  >
                    <FaXTwitter size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </MyContainer>
      <footer
        className={`footer sm:footer-horizontal footer-center  text-base-content p-4 ${
          isDark ? "bg-gray-800 " : "bg-gray-300 "
        }`}
      >
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right{" "}
            <span className="font-bold">G-Flow</span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
