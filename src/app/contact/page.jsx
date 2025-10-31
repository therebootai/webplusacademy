import Contactform from "@/components/contact/Contactform";
import Subbanner from "@/components/global/Subbanner";
import MainTemplates from "@/templates/Maintemplates";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";


export const metadata = {
  title: "Contact Waveplus Academy | Best NEET Coaching Institute in Siliguri",
  description:
    "Get in touch with Waveplus Academy, the best NEET coaching institute in Siliguri. Visit our center or call us to know about admissions, classes, and course details.",
}


const Page = () => {
  const contactDetails = [
    {
      icon: <MdPhoneInTalk />,
      title: "Call With Us",
      details: [
        {
          text: `+91 96140 16184 `,
          href: `tel:+919614016184`,
        },
         {
          text: `+91 96793 15590 `,
          href: `tel:+919679315590`,
        },
      ],
    },
    {
      icon: <IoMail />,
      title: "Email With Us",
      details: [
        {
          text: `info@waveplusacademy.com`,
          href: `mailTo:info@waveplusacademy.com`,
        },
      ],
    },
    {
      icon: <FaLocationDot />,
      title: "Visit Our Location",
      details: [
        {
          text: "Gadadhar Pally, Behind Hebron School, Upper Bagdogra, Darjeeling, West Bengal - 734003",
          href: "https://maps.app.goo.gl/Nn4RPw4RpYkabnsA6",
        },
      ],
    },
  ];

  return (
    <MainTemplates>
      <Subbanner heading="Contact Us" />
      

      <section className="px-4 md:px-40">
     
        <div className="max-w-[1440px] mx-auto  flex flex-col gap-4 md:py-10 py-4">
          <h1 className="text-xl md:text-3xl text-defined-red font-bold ">
            Get in Touch with Us
          </h1>
          <p className="text-defined-brown text-justify">
            At WavePlus Academy, we believe in providing personalized attention
            to every student and their unique learning needs. If you have any
            questions about our courses, hostel facilities, or teaching methods,
            or if you wish to inquire about admission details, feel free to
            reach out to us. Our team is here to assist you every step of the
            way. Our office hours are from Monday to Saturday, 9 AM to 6 PM.
            Whether you're a parent, student, or prospective applicant, we're
            always ready to answer your queries and provide any information you
            need. We also encourage you to visit us in person to experience our
            facilities and meet our team. We look forward to assisting you on
            your academic journey!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:gap-6 gap-4 mt-8">
            {contactDetails.map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-gradient-to-b from-[#F5F5F5] to-[#FFFFFF] relative rounded-xl group h-full lg:p-6 p-4 xlg:p-8"
              >
                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="relative">
                    <div className="bg-defined-red rounded-xl lg:rounded-[1.85rem] text-white xlg:text-4xl text-2xl flex items-center justify-center xlg:p-7 lg:p-5 p-4 rounded-bl-none lg:rounded-bl-none relative z-10">
                      {contact.icon}
                    </div>
                    <div className="absolute top-0 left-0 translate-x-1/4 translate-y-[10%] border-[3px] border-defined-red w-full h-full rounded-xl lg:rounded-[1.85rem] rounded-bl-none lg:rounded-bl-none " />
                  </div>

                  <div className="flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-[#1C1B1F] xxl:text-2xl xlg:text-xl lg:text-lg md:text-base text-lg font-bold text-center">
                      {contact.title}
                    </h1>
                    <div className="flex flex-col">
                      {contact.details.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="text-defined-brown xl:text-lg xxl:text-xl lg:text-base text-sm text-center"
                          target="_blank"
                          referrerPolicy="no-referrer"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Contactform/>

    </MainTemplates>
  );
};

export default Page;
