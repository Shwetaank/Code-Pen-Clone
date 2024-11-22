import {
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaSuitcase,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import React from "react";

type SocialLink = {
  id: number;
  name: string;
  icon: React.ReactNode;
  link: string;
  hoverColor: string;
};

const socials: SocialLink[] = [
  {
    id: 1,
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/shwetank-morey-a35484257",
    hoverColor: "hover:text-blue-600",
  },
  {
    id: 2,
    name: "YouTube",
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@Sin_Greed",
    hoverColor: "hover:text-red-500",
  },
  {
    id: 3,
    name: "LeetCode",
    icon: <SiLeetcode />,
    link: "https://leetcode.com/u/spmorey87/",
    hoverColor: "hover:text-orange-500",
  },
  {
    id: 4,
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/shwetaank_/",
    hoverColor: "hover:text-pink-500",
  },
  {
    id: 5,
    name: "Twitter",
    icon: <FaTwitter />,
    link: "https://x.com/Sin_Greed___",
    hoverColor: "hover:text-blue-400",
  },
  {
    id: 6,
    name: "My Portfolio",
    icon: <FaSuitcase />,
    link: "https://shwet-tech.com/",
    hoverColor: "hover:text-green-500",
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10 shadow-lg">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col items-center space-y-8">
        <div className="grid grid-cols-3 gap-y-6 gap-x-8 md:grid-cols-6">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className={`text-3xl p-2 text-gray-300 transition-transform transform hover:scale-110 ${social.hoverColor}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="w-full border-t border-gray-700"></div>
        <p className="text-center text-sm leading-relaxed">
          © {currentYear} All Rights Reserved. Made with ❤️ by{" "}
          <span className="font-bold text-blue-400">Sin_Greed</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
