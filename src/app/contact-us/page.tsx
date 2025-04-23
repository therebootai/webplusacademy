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
              Lorem ipsum dolor sit amet consectetur. Velit in massa ut vel
              velit condimentum quis euismod morbi. Dignissim morbi donec
              consectetur tellus dapibus accumsan adipiscing nibh. Cursus vitae
              ultrices elementum in eget pharetra amet commodo. Id aliquam diam
              curabitur quam. Quam pretium eu nec tincidunt posuere quis arcu
              nullam. Morbi mauris nunc nisl pellentesque condimentum rhoncus.
              Amet amet adipiscing neque sit. Velit fames massa cursus aliquet
              cursus proin urna eget. Fermentum magna vitae at elit. Elementum
              amet molestie molestie nullam pretium. Scelerisque fermentum neque
              dignissim nisi morbi amet. At ullamcorper nisl ac sem in fames
              sagittis. Sed sagittis pharetra nec et scelerisque. Eget enim sed
              nibh et sit elit neque consequat. Sit suspendisse consectetur
              tincidunt quam sagittis urna. Pellentesque facilisis sagittis
              magna potenti tristique. Vel commodo ut lorem massa egestas semper
              varius suspendisse consectetur tincidunt quam sagittis urna.
              Pellentesque facilisis
            </p>
            <div className="flex flex-col lg:flex-row">
              <div className="flex  flex-col gap-4 basis-full lg:basis-1/2">
                <h1 className="font-bold text-site-darkgreen xl:text-2xl text-lg">
                  Contact Information
                </h1>
                <div className="flex flex-col gap-2 text-sm xl:text-base">
                  <Link
                    href="tel:+918945927196"
                    className="flex gap-2 text-site-gray"
                  >
                    <IoLogoWhatsapp
                      size={24}
                      className="shrink-0 text-site-darkgreen"
                    />{" "}
                    <span className="">+91 89459 27196</span>
                  </Link>
                  <Link
                    href="tel:+918945927196"
                    className="flex gap-2 text-site-gray"
                  >
                    <FaMobile
                      size={24}
                      className="shrink-0 text-site-darkgreen"
                    />{" "}
                    <span className="">+91 89459 27196</span>
                  </Link>
                  <Link
                    href="mailto:truehomes@gmail.com"
                    className="flex gap-2 text-site-gray"
                  >
                    <MdEmail
                      size={24}
                      className="shrink-0 text-site-darkgreen"
                    />{" "}
                    <span className="">truehomes@gmail.com</span>
                  </Link>
                  <Link
                    href="https://maps.app.goo.gl/itkQPUvt7iep1Bv57?g_st=com.google.maps.preview.copy"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex gap-2 w-full xl:w-[80%] text-site-darkgreen"
                  >
                    <IoLocationSharp size={24} className="shrink-0" />{" "}
                    <span className="text-site-gray">
                      Tarunjubari, Khaprail Bazar, Matigara, Siliguri,
                      Darjeeling, West Bengal - 734001
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
