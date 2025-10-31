"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaRss,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    const socialLinks = [
    { Icon: FaFacebookF, link: "https://www.facebook.com/p/Waveplus-Academy-61577379283602/" },
    { Icon: FaInstagram, link: "https://www.instagram.com/waveplus.academy/" },
    { Icon: FaWhatsapp, link: "https://api.whatsapp.com/send?phone=+919614016184" }, 
  ];
  return (
    <footer className="bg-[#FFF9F2] pt-10 px-4 lg:px-28 xl:px-40">
      <div className="max-w-[1440px] mx-auto text-gray-800">
      
        <div className="md:hidden flex flex-col gap-8">
        
          <h3 className="font-bold mb-0">Corporate Office</h3>
      <ul className="space-y-3 text-gray-800">
        <Link href={"https://maps.app.goo.gl/J6RTxzycMhzHmn5N9"} target="_blank" className="flex items-start gap-2">
          <FaMapMarkerAlt className=" text-[30px]" />
          <span>
            Gadadhar Pally, Behind Hebron School, Upper Bagdogra,
            Darjeeling, West Bengal - 734003
          </span>
        </Link>
        <li className="flex items-center gap-2">
          <FaPhoneAlt className=" text-[20px]"  /> <Link href={"tel:919679315590"}> +91 96793 15590</Link>
        </li>
          <li className="flex items-center gap-2">
          <FaWhatsapp className=" text-[20px]"  /> <Link href={"https://api.whatsapp.com/send?phone=+919614016184"}>+91 96140 16184 </Link> 
        </li>
        <Link href={"mailto:info@waveplusacademy.com"} className="flex items-center gap-2">
          <FaEnvelope /> <span>info@waveplusacademy.com</span>
        </Link>
      </ul>

          {/* Follow Us */}
        <div>
  <h4 className="font-bold mt-6 mb-2 text-center">FOLLOW US ON</h4>
  <div className="flex flex-wrap gap-2 mt-2 justify-center">
    {[
      { icon: FaFacebookF, link: "https://www.facebook.com/profile.php?id=61577379283602" },
      { icon: FaInstagram, link: "#" },
      { icon: FaYoutube, link: "#" },
      { icon: FaTelegramPlane, link: "#" },
      { icon: FaWhatsapp, link: "#" },
    ].map(({ icon: Icon, link }, i) => (
      <a
        key={i}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black text-white p-2 rounded-full hover:bg-gray-700"
      >
        <Icon />
      </a>
    ))}
  </div>
</div>


          {/* 2x2 Sections */}
          <div className="grid grid-cols-2 gap-8">
            {/* About Us */}
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                {[
                 { name: "Why Waveplus Academy", link: "/about" },
                { name: "About Waveplus", link: "/about" },
                { name: "Waveplus Academy Program", link: "/about" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span>»</span>
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Exam */}
            <div>
              <h3 className="font-bold mb-4">About Exam</h3>
              <ul className="space-y-2">
                {[
                  { name: "NEET", link: "/neet" },
                { name: "NEET Crash Course", link: "/neetcrashcource" },
                { name: "Class - 11th", link: "/xi" },
                { name: "Class - 12th", link: "/xii" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span>»</span>
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                {[
                 { name: "Contact Us", link: "/contact" },
                { name: "Enquiry", link: "/contact" },

                { name: "Associate Consultant", link: "/contact" },
                { name: "Student Login", link: "/studentlogin" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span>»</span>
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                {[
                 { name: "Study Center", link: "/contact" },
                { name: "11th & 12th Combined", link: "/xii" },
                { name: "Crash-Neet", link: "/neetcrashcource" },
                { name: "Coaching Guidelines", link: "/facilities" },
                { name: "Waveplus Magazine", link: "/imagegallery" },
                ].map((item) => (
                  <li key={item.name} className="flex items-center gap-2">
                    <span>»</span>
                    <a href={item.link} className="hover:underline">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

<div className="hidden md:block">
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
   
    <div>
      <h3 className="font-bold mb-4">About Us</h3>
      <ul className="space-y-2">
        {[
          { name: "Why Waveplus Academy", link: "/about" },
          { name: "About Waveplus", link: "/about" },
          { name: "Waveplus Academy Program", link: "/about" },
        ].map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span>»</span>
            <a href={item.link} className="hover:underline">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="font-bold mb-0">About Exam</h3>
      <ul className="space-y-2">
        {[
          { name: "NEET", link: "/neet" },
          { name: "NEET Crash Course", link: "/neetcrashcource" },
          { name: "Class - 11th", link: "/xi" },
          { name: "Class - 12th", link: "/xii" },
        ].map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span>»</span>
            <a href={item.link} className="hover:underline">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h3 className="font-bold mb-0">Contact Us</h3>
      <ul className="space-y-2">
        {[
          { name: "Contact Us", link: "/contact" },
          { name: "Enquiry", link: "/contact" },
          { name: "Associate Consultant", link: "/contact" },
          { name: "Student Login", link: "/studentlogin" },
        ].map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span>»</span>
            <a href={item.link} className="hover:underline">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Useful Links */}
    <div>
      <h3 className="font-bold mb-0">Useful Links</h3>
      <ul className="space-y-2">
        {[
          { name: "Study Center", link: "/contact" },
          { name: "11th & 12th Combined", link: "/xii" },
          { name: "Crash-Neet", link: "/neetcrashcource" },
          { name: "Coaching Guidelines", link: "/facilities" },
          { name: "Waveplus Magazine", link: "/imagegallery" },
        ].map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span>»</span>
            <a href={item.link} className="hover:underline">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Corporate Office */}
    <div>
      <h3 className="font-bold mb-0">Corporate Office</h3>
      <ul className="space-y-3 text-gray-800">
        <Link href={"https://maps.app.goo.gl/J6RTxzycMhzHmn5N9"} target="_blank" className="flex items-start gap-2">
          <FaMapMarkerAlt className=" text-[20px] lg:text-[50px]" />
          <span>
            Gadadhar Pally, Behind Hebron School, Upper Bagdogra,
            Darjeeling, West Bengal - 734003
          </span>
        </Link>
        <li className="flex items-center gap-2">
          <FaPhoneAlt className=" text-[20px]"  /> <Link href={"tel:919679315590"}> +91 96793 15590</Link>
        </li>
          <li className="flex items-center gap-2">
          <FaWhatsapp className=" text-[20px]"  /> <Link href={"https://api.whatsapp.com/send?phone=+919614016184"}>+91 96140 16184 </Link> 
        </li>
        <Link href={"mailto:info@waveplusacademy.com"} className="flex items-center gap-2">
          <FaEnvelope /> <span>info@waveplusacademy.com</span>
        </Link>
      </ul>
    </div>
  </div>

  {/* Follow Us Centered at Bottom */}
  <div className="flex flex-col items-center mt-0">
    <h4 className="font-bold mb-2">FOLLOW US ON</h4>
    <div className="flex gap-3 justify-center">
     {socialLinks.map(({ Icon, link }, i) => (
        <Link
          key={i}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition-all duration-200"
        >
          <Icon size={18} />
        </Link>
      ))}
    </div>
  </div>
</div>


        {/* ---------------------- BOTTOM BAR ---------------------- */}
        <div className="mt-10 border-t border-gray-300 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm pb-5">
          <div>© 2025 Waveplus Academy — All Rights Reserved</div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            {/* <span>Developed by</span> */}
            <a
              href="https://www.rebootai.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="250"
                height="18"
                viewBox="0 0 274 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.392 3.68422C5.712 3.68422 6.87 3.94222 7.866 4.45822C8.874 4.97422 9.648 5.71222 10.188 6.67222C10.74 7.62022 11.016 8.72422 11.016 9.98422C11.016 11.2442 10.74 12.3482 10.188 13.2962C9.648 14.2322 8.874 14.9582 7.866 15.4742C6.87 15.9902 5.712 16.2482 4.392 16.2482H0V3.68422H4.392ZM4.302 14.1062C5.622 14.1062 6.642 13.7462 7.362 13.0262C8.082 12.3062 8.442 11.2922 8.442 9.98422C8.442 8.67622 8.082 7.65622 7.362 6.92422C6.642 6.18022 5.622 5.80822 4.302 5.80822H2.52V14.1062H4.302Z"
                  fill="black"
                />
                <path
                  d="M22.1723 11.0462C22.1723 11.4062 22.1483 11.7302 22.1003 12.0182H14.8103C14.8703 12.7382 15.1223 13.3022 15.5663 13.7102C16.0103 14.1182 16.5563 14.3222 17.2043 14.3222C18.1403 14.3222 18.8063 13.9202 19.2023 13.1162H21.9203C21.6323 14.0762 21.0803 14.8682 20.2643 15.4922C19.4483 16.1042 18.4463 16.4102 17.2583 16.4102C16.2983 16.4102 15.4343 16.2002 14.6663 15.7802C13.9103 15.3482 13.3163 14.7422 12.8843 13.9622C12.4643 13.1822 12.2543 12.2822 12.2543 11.2622C12.2543 10.2302 12.4643 9.32422 12.8843 8.54422C13.3043 7.76422 13.8923 7.16422 14.6483 6.74422C15.4043 6.32422 16.2743 6.11422 17.2583 6.11422C18.2063 6.11422 19.0523 6.31822 19.7963 6.72622C20.5523 7.13422 21.1343 7.71622 21.5423 8.47222C21.9623 9.21622 22.1723 10.0742 22.1723 11.0462ZM19.5623 10.3262C19.5503 9.67822 19.3163 9.16222 18.8603 8.77822C18.4043 8.38222 17.8463 8.18422 17.1863 8.18422C16.5623 8.18422 16.0343 8.37622 15.6023 8.76022C15.1823 9.13222 14.9243 9.65422 14.8283 10.3262H19.5623Z"
                  fill="black"
                />
                <path
                  d="M28.1697 13.9262L30.6897 6.27622H33.3717L29.6817 16.2482H26.6217L22.9497 6.27622H25.6497L28.1697 13.9262Z"
                  fill="black"
                />
                <path
                  d="M44.0571 11.0462C44.0571 11.4062 44.0331 11.7302 43.9851 12.0182H36.6951C36.7551 12.7382 37.0071 13.3022 37.4511 13.7102C37.8951 14.1182 38.4411 14.3222 39.0891 14.3222C40.0251 14.3222 40.6911 13.9202 41.0871 13.1162H43.8051C43.5171 14.0762 42.9651 14.8682 42.1491 15.4922C41.3331 16.1042 40.3311 16.4102 39.1431 16.4102C38.1831 16.4102 37.3191 16.2002 36.5511 15.7802C35.7951 15.3482 35.2011 14.7422 34.7691 13.9622C34.3491 13.1822 34.1391 12.2822 34.1391 11.2622C34.1391 10.2302 34.3491 9.32422 34.7691 8.54422C35.1891 7.76422 35.7771 7.16422 36.5331 6.74422C37.2891 6.32422 38.1591 6.11422 39.1431 6.11422C40.0911 6.11422 40.9371 6.31822 41.6811 6.72622C42.4371 7.13422 43.0191 7.71622 43.4271 8.47222C43.8471 9.21622 44.0571 10.0742 44.0571 11.0462ZM41.4471 10.3262C41.4351 9.67822 41.2011 9.16222 40.7451 8.77822C40.2891 8.38222 39.7311 8.18422 39.0711 8.18422C38.4471 8.18422 37.9191 8.37622 37.4871 8.76022C37.0671 9.13222 36.8091 9.65422 36.7131 10.3262H41.4471Z"
                  fill="black"
                />
                <path
                  d="M48.4165 2.92822V16.2482H45.8965V2.92822H48.4165Z"
                  fill="black"
                />
                <path
                  d="M55.3343 16.4102C54.3743 16.4102 53.5103 16.2002 52.7422 15.7802C51.9742 15.3482 51.3683 14.7422 50.9243 13.9622C50.4923 13.1822 50.2762 12.2822 50.2762 11.2622C50.2762 10.2422 50.4982 9.34222 50.9422 8.56222C51.3983 7.78222 52.0163 7.18222 52.7962 6.76222C53.5762 6.33022 54.4463 6.11422 55.4062 6.11422C56.3662 6.11422 57.2363 6.33022 58.0163 6.76222C58.7962 7.18222 59.4082 7.78222 59.8522 8.56222C60.3083 9.34222 60.5363 10.2422 60.5363 11.2622C60.5363 12.2822 60.3023 13.1822 59.8343 13.9622C59.3783 14.7422 58.7542 15.3482 57.9622 15.7802C57.1823 16.2002 56.3063 16.4102 55.3343 16.4102ZM55.3343 14.2142C55.7903 14.2142 56.2163 14.1062 56.6123 13.8902C57.0203 13.6622 57.3442 13.3262 57.5843 12.8822C57.8242 12.4382 57.9442 11.8982 57.9442 11.2622C57.9442 10.3142 57.6923 9.58822 57.1883 9.08422C56.6963 8.56822 56.0903 8.31022 55.3703 8.31022C54.6502 8.31022 54.0443 8.56822 53.5522 9.08422C53.0723 9.58822 52.8322 10.3142 52.8322 11.2622C52.8322 12.2102 53.0662 12.9422 53.5342 13.4582C54.0142 13.9622 54.6143 14.2142 55.3343 14.2142Z"
                  fill="black"
                />
                <path
                  d="M64.9048 7.71622C65.2288 7.26022 65.6728 6.88222 66.2368 6.58222C66.8128 6.27022 67.4668 6.11422 68.1988 6.11422C69.0508 6.11422 69.8188 6.32422 70.5028 6.74422C71.1988 7.16422 71.7448 7.76422 72.1408 8.54422C72.5488 9.31222 72.7528 10.2062 72.7528 11.2262C72.7528 12.2462 72.5488 13.1522 72.1408 13.9442C71.7448 14.7242 71.1988 15.3302 70.5028 15.7622C69.8188 16.1942 69.0508 16.4102 68.1988 16.4102C67.4668 16.4102 66.8188 16.2602 66.2548 15.9602C65.7028 15.6602 65.2528 15.2822 64.9048 14.8262V21.0002H62.3848V6.27622H64.9048V7.71622ZM70.1788 11.2262C70.1788 10.6262 70.0528 10.1102 69.8008 9.67822C69.5608 9.23422 69.2368 8.89822 68.8288 8.67022C68.4328 8.44222 68.0008 8.32822 67.5328 8.32822C67.0768 8.32822 66.6448 8.44822 66.2368 8.68822C65.8408 8.91622 65.5168 9.25222 65.2648 9.69622C65.0248 10.1402 64.9048 10.6622 64.9048 11.2622C64.9048 11.8622 65.0248 12.3842 65.2648 12.8282C65.5168 13.2722 65.8408 13.6142 66.2368 13.8542C66.6448 14.0822 67.0768 14.1962 67.5328 14.1962C68.0008 14.1962 68.4328 14.0762 68.8288 13.8362C69.2368 13.5962 69.5608 13.2542 69.8008 12.8102C70.0528 12.3662 70.1788 11.8382 70.1788 11.2262Z"
                  fill="black"
                />
                <path
                  d="M83.854 11.0462C83.854 11.4062 83.83 11.7302 83.782 12.0182H76.492C76.552 12.7382 76.804 13.3022 77.248 13.7102C77.692 14.1182 78.238 14.3222 78.886 14.3222C79.822 14.3222 80.488 13.9202 80.884 13.1162H83.602C83.314 14.0762 82.762 14.8682 81.946 15.4922C81.13 16.1042 80.128 16.4102 78.94 16.4102C77.98 16.4102 77.116 16.2002 76.348 15.7802C75.592 15.3482 74.998 14.7422 74.566 13.9622C74.146 13.1822 73.936 12.2822 73.936 11.2622C73.936 10.2302 74.146 9.32422 74.566 8.54422C74.986 7.76422 75.574 7.16422 76.33 6.74422C77.086 6.32422 77.956 6.11422 78.94 6.11422C79.888 6.11422 80.734 6.31822 81.478 6.72622C82.234 7.13422 82.816 7.71622 83.224 8.47222C83.644 9.21622 83.854 10.0742 83.854 11.0462ZM81.244 10.3262C81.232 9.67822 80.998 9.16222 80.542 8.77822C80.086 8.38222 79.528 8.18422 78.868 8.18422C78.244 8.18422 77.716 8.37622 77.284 8.76022C76.864 9.13222 76.606 9.65422 76.51 10.3262H81.244Z"
                  fill="black"
                />
                <path
                  d="M85.0454 11.2262C85.0454 10.2182 85.2434 9.32422 85.6394 8.54422C86.0474 7.76422 86.5994 7.16422 87.2954 6.74422C87.9914 6.32422 88.7654 6.11422 89.6174 6.11422C90.2654 6.11422 90.8834 6.25822 91.4714 6.54622C92.0594 6.82222 92.5274 7.19422 92.8754 7.66222V2.92822H95.4314V16.2482H92.8754V14.7722C92.5634 15.2642 92.1254 15.6602 91.5614 15.9602C90.9974 16.2602 90.3434 16.4102 89.5994 16.4102C88.7594 16.4102 87.9914 16.1942 87.2954 15.7622C86.5994 15.3302 86.0474 14.7242 85.6394 13.9442C85.2434 13.1522 85.0454 12.2462 85.0454 11.2262ZM92.8934 11.2622C92.8934 10.6502 92.7734 10.1282 92.5334 9.69622C92.2934 9.25222 91.9694 8.91622 91.5614 8.68822C91.1534 8.44822 90.7154 8.32822 90.2474 8.32822C89.7794 8.32822 89.3474 8.44222 88.9514 8.67022C88.5554 8.89822 88.2314 9.23422 87.9794 9.67822C87.7394 10.1102 87.6194 10.6262 87.6194 11.2262C87.6194 11.8262 87.7394 12.3542 87.9794 12.8102C88.2314 13.2542 88.5554 13.5962 88.9514 13.8362C89.3594 14.0762 89.7914 14.1962 90.2474 14.1962C90.7154 14.1962 91.1534 14.0822 91.5614 13.8542C91.9694 13.6142 92.2934 13.2782 92.5334 12.8462C92.7734 12.4022 92.8934 11.8742 92.8934 11.2622Z"
                  fill="black"
                />
                <path
                  d="M109.31 9.80422C110.018 9.93622 110.6 10.2902 111.056 10.8662C111.512 11.4422 111.74 12.1022 111.74 12.8462C111.74 13.5182 111.572 14.1122 111.236 14.6282C110.912 15.1322 110.438 15.5282 109.814 15.8162C109.19 16.1042 108.452 16.2482 107.6 16.2482H102.182V3.68422H107.366C108.218 3.68422 108.95 3.82222 109.562 4.09822C110.186 4.37422 110.654 4.75822 110.966 5.25022C111.29 5.74222 111.452 6.30022 111.452 6.92422C111.452 7.65622 111.254 8.26822 110.858 8.76022C110.474 9.25222 109.958 9.60022 109.31 9.80422ZM104.702 8.86822H107.006C107.606 8.86822 108.068 8.73622 108.392 8.47222C108.716 8.19622 108.878 7.80622 108.878 7.30222C108.878 6.79822 108.716 6.40822 108.392 6.13222C108.068 5.85622 107.606 5.71822 107.006 5.71822H104.702V8.86822ZM107.24 14.1962C107.852 14.1962 108.326 14.0522 108.662 13.7642C109.01 13.4762 109.184 13.0682 109.184 12.5402C109.184 12.0002 109.004 11.5802 108.644 11.2802C108.284 10.9682 107.798 10.8122 107.186 10.8122H104.702V14.1962H107.24Z"
                  fill="black"
                />
                <path
                  d="M123.288 6.27622L117.114 20.9642H114.432L116.592 15.9962L112.596 6.27622H115.422L117.996 13.2422L120.606 6.27622H123.288Z"
                  fill="black"
                />
                <path
                  d="M151.258 7.75994V11.7999H147.418V7.75994C147.418 5.69994 145.748 4.02994 143.688 4.02994H133.288V0.189941H143.688C147.858 0.189941 151.258 3.58994 151.258 7.75994ZM139.778 11.7799H145.558V7.93994H135.718C134.388 7.93994 133.288 9.02994 133.288 10.3699V20.9799H137.128V14.4699L145.718 20.9799L151.278 20.9999L139.778 11.7799ZM137.138 11.7899L137.158 11.7799H137.138V11.7899ZM160.248 20.9099V20.9799H161.358C160.978 20.9799 160.618 20.9499 160.248 20.9099ZM179.738 4.42994H175.308V0.189941H171.468V15.5399H175.308V8.26994H179.738C182.178 8.26994 184.168 10.2599 184.168 12.6999C184.168 15.1399 182.178 17.1299 179.738 17.1299H161.358C158.908 17.1299 156.928 15.1399 156.928 12.6999C156.928 10.2599 158.918 8.26994 161.358 8.26994C161.408 8.26994 161.468 8.26994 161.518 8.26994C161.538 8.26994 161.568 8.26994 161.588 8.26994C161.638 8.26994 161.678 8.26994 161.728 8.26994C161.838 8.26994 161.958 8.28994 162.068 8.30994C163.738 8.58994 165.138 9.82994 165.608 11.4699H160.148V15.3099H169.208C169.208 15.3099 169.218 15.2699 169.228 15.2499L169.318 14.9399C169.458 14.4499 169.548 13.9599 169.598 13.4799C169.598 13.4099 169.608 13.3399 169.618 13.2699C169.618 13.1599 169.628 13.0599 169.638 12.9499C169.638 12.9199 169.638 12.8899 169.638 12.8599C169.638 12.7999 169.638 12.7499 169.638 12.6899C169.638 8.12994 165.928 4.40994 161.368 4.40994C156.808 4.40994 153.088 8.11994 153.088 12.6899C153.088 16.8799 156.218 20.3499 160.258 20.8899C160.618 20.9399 160.988 20.9599 161.368 20.9599H179.748C184.308 20.9599 188.018 17.2499 188.018 12.6799C188.018 8.10994 184.308 4.40994 179.748 4.40994L179.738 4.42994ZM206.388 12.6999C206.388 17.2599 202.678 20.9799 198.108 20.9799C193.538 20.9799 189.828 17.2699 189.828 12.6999C189.828 8.12994 193.538 4.41994 198.108 4.41994C202.678 4.41994 206.388 8.12994 206.388 12.6999ZM202.548 12.6999C202.548 10.2599 200.558 8.26994 198.118 8.26994C195.678 8.26994 193.688 10.2599 193.688 12.6999C193.688 15.1399 195.678 17.1299 198.118 17.1299C200.558 17.1299 202.548 15.1399 202.548 12.6999ZM224.768 12.6999C224.768 17.2599 221.058 20.9799 216.488 20.9799C211.918 20.9799 208.208 17.2699 208.208 12.6999C208.208 8.12994 211.918 4.41994 216.488 4.41994C221.058 4.41994 224.768 8.12994 224.768 12.6999ZM220.928 12.6999C220.928 10.2599 218.938 8.26994 216.498 8.26994C214.058 8.26994 212.068 10.2599 212.068 12.6999C212.068 15.1399 214.058 17.1299 216.498 17.1299C218.938 17.1299 220.928 15.1399 220.928 12.6999ZM234.668 4.41994V8.25994H230.428V20.9699H226.588V0.189941H230.428V4.42994H234.668V4.41994Z"
                  fill="black"
                />
                <path
                  d="M266.778 3.52995V3.53995C268.528 3.44995 270.018 4.79995 270.108 6.54995H270.118C270.028 4.79995 271.378 3.30995 273.128 3.21995C271.378 3.29995 269.888 1.94995 269.798 0.199951H269.788C269.878 1.94995 268.528 3.43995 266.778 3.52995Z"
                  fill="black"
                />
                <path
                  d="M265.098 2.82997C265.508 2.82997 265.838 3.15997 265.838 3.56997C265.838 3.15997 266.168 2.82997 266.578 2.82997C266.168 2.82997 265.838 2.49997 265.838 2.08997C265.838 2.49997 265.508 2.82997 265.098 2.82997Z"
                  fill="black"
                />
                <path
                  d="M264.468 20.9999H260.308L253.248 5.36994L246.188 20.9999H241.968L251.368 0.189941H255.128L264.468 20.9999Z"
                  fill="black"
                />
                <path
                  d="M266.108 3.81995V20.9999H269.948C269.948 20.9999 269.948 10.7299 269.948 9.11995C269.948 7.50995 269.848 3.82995 266.108 3.82995V3.81995Z"
                  fill="black"
                />
                <path
                  d="M267.338 2.64994C268.017 2.64994 268.568 2.09925 268.568 1.41994C268.568 0.740631 268.017 0.189941 267.338 0.189941C266.659 0.189941 266.108 0.740631 266.108 1.41994C266.108 2.09925 266.659 2.64994 267.338 2.64994Z"
                  fill="black"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
