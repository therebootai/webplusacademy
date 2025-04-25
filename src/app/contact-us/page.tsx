import MainTemplate from "@/templates/MainTemplate";
import CustomHeading from "@/ui/CustomHeading";
import EnquiryForm from "@/ui/EnquiryForm";
import SubBanner from "@/ui/SubBanner";
import Link from "next/link";
import { FaMobile } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function ContactUsPage() {
  return (
    <MainTemplate>
      <SubBanner heading="Contact Us" />
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 xl:px-16 lg:px-8 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col lg:basis-3/5 basis-full gap-6">
            <div className="flex flex-col gap-3.5">
              <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs">
                About Waveplus Academy
              </h3>
              <CustomHeading
                normal="Get In Touch"
                highlight=""
                className="font-bold xl:text-3xl"
              />
            </div>
            <p className="text-site-gray lg:text-base text-sm">
              At WavePlus Academy, we believe in providing personalized
              attention to every student and their unique learning needs. If you
              have any questions about our courses, hostel facilities, or
              teaching methods, or if you wish to inquire about admission
              details, feel free to reach out to us. Our team is here to assist
              you every step of the way. Our office hours are from Monday to
              Saturday, 9 AM to 6 PM. Whether you're a parent, student, or
              prospective applicant, we're always ready to answer your queries
              and provide any information you need. We also encourage you to
              visit us in person to experience our facilities and meet our team.
              We look forward to assisting you on your academic journey!
            </p>
            <div className="flex flex-col lg:flex-row">
              <div className="flex  flex-col gap-4 basis-full lg:basis-1/2">
                <h1 className="font-bold text-site-darkgreen xl:text-2xl text-lg">
                  Contact Information
                </h1>
                <div className="flex flex-col gap-2 text-sm xl:text-base">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="https://api.whatsapp.com?phone=919614016184"
                      className="flex gap-2 text-site-gray"
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <IoLogoWhatsapp
                        size={24}
                        className="shrink-0 text-site-darkgreen"
                      />{" "}
                      <span className="">+91 96140 16184</span>
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="tel:+919614016184"
                      className="flex gap-2 text-site-gray"
                    >
                      <FaMobile
                        size={24}
                        className="shrink-0 text-site-darkgreen"
                      />{" "}
                      <span className="">+91 96140 16184</span>
                    </Link>{" "}
                    /
                    <Link
                      href="tel:+919679315590"
                      className="flex gap-2 text-site-gray"
                    >
                      <span className="">+91 96793 15590</span>
                    </Link>
                  </div>
                  <Link
                    href="mailto:info@waveplusacademy.com"
                    className="flex gap-2 text-site-gray"
                  >
                    <MdEmail
                      size={24}
                      className="shrink-0 text-site-darkgreen"
                    />{" "}
                    <span className="">info@waveplusacademy.com</span>
                  </Link>
                  <Link
                    href="https://maps.app.goo.gl/itkQPUvt7iep1Bv57?g_st=com.google.maps.preview.copy"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex gap-2 w-full xl:w-[80%] text-site-darkgreen"
                  >
                    <IoLocationSharp size={24} className="shrink-0" />{" "}
                    <span className="text-site-gray">
                      Gadadhar Pally, Behind Hebron School, Upper Bagdogra,
                      Darjeeling, West Bengal - 734003
                    </span>
                  </Link>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4264.216072495763!2d88.37506397543305!3d26.72627777675875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQzJzM0LjYiTiA4OMKwMjInMzkuNSJF!5e1!3m2!1sen!2sin!4v1744739873930!5m2!1sen!2sin"
                className="rounded-md basis-full lg:basis-1/2"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="lg:basis-2/5 basis-full">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
