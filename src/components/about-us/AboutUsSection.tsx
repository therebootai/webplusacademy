import AboutCard from "@/ui/AboutCard";
import CustomHeading from "@/ui/CustomHeading";
import EnquiryForm from "@/ui/EnquiryForm";

export default function AboutUsSection() {
  const cardData = [
    {
      heading: "Career Coaching",
      para: "Lorem ipsum dolor sit amet consectetur. Aliquam duis duis enim morbi suscipit quis. Tellus nisl hac id in tellus",
    },
    {
      heading: "Career Coaching",
      para: "Lorem ipsum dolor sit amet consectetur. Aliquam duis duis enim morbi suscipit quis. Tellus nisl hac id in tellus",
    },
    {
      heading: "Career Coaching",
      para: "Lorem ipsum dolor sit amet consectetur. Aliquam duis duis enim morbi suscipit quis. Tellus nisl hac id in tellus",
    },
    {
      heading: "Career Coaching",
      para: "Lorem ipsum dolor sit amet consectetur. Aliquam duis duis enim morbi suscipit quis. Tellus nisl hac id in tellus",
    },
    {
      heading: "Career Coaching",
      para: "Lorem ipsum dolor sit amet consectetur. Aliquam duis duis enim morbi suscipit quis. Tellus nisl hac id in tellus",
    },
    {
      heading: "Career Coaching",
      para: "Lorem ipsum dolor sit amet consectetur. Aliquam duis duis enim morbi suscipit quis. Tellus nisl hac id in tellus",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col gap-5 lg:basis-3/5 basis-full">
        <div className="flex flex-col gap-3.5">
          <h3 className="text-site-darkgreen xl:text-base md:text-sm text-xs">
            About Waveplus Academy
          </h3>
          <CustomHeading
            normal="Career You're Passionate "
            highlight="About Is There For You!"
            className="font-bold xl:text-3xl"
          />
        </div>
        <p className="text-site-gray lg:text-base text-sm">
          Lorem ipsum dolor sit amet consectetur. Velit in massa ut vel velit
          condimentum quis euismod morbi. Dignissim morbi donec consectetur
          tellus dapibus accumsan adipiscing nibh. Cursus vitae ultrices
          elementum in eget pharetra amet commodo. Id aliquam diam curabitur
          quam. Quam pretium eu nec tincidunt posuere quis arcu nullam. Morbi
          mauris nunc nisl pellentesque condimentum rhoncus. Amet amet
          adipiscing neque sit. Velit fames massa cursus aliquet cursus proin
          urna eget. Fermentum magna vitae at elit. Elementum amet molestie
          molestie nullam pretium. Scelerisque fermentum neque dignissim nisi
          morbi amet. At ullamcorper nisl ac sem in fames sagittis. Sed sagittis
          pharetra nec et scelerisque. Eget enim sed nibh et sit elit neque
          consequat. Sit suspendisse consectetur tincidunt quam sagittis urna.
          Pellentesque facilisis sagittis magna potenti tristique. Vel commodo
          ut lorem massa egestas semper varius suspendisse consectetur tincidunt
          quam sagittis urna. Pellentesque facilisis
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-6">
          {cardData.map((card, index) => (
            <AboutCard key={index} heading={card.heading} para={card.para} />
          ))}
        </div>
      </div>
      <div className="lg:basis-2/5 basis-full">
        <EnquiryForm />
      </div>
    </div>
  );
}
