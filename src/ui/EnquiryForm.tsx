export default function EnquiryForm() {
  return (
    <div className="flex flex-col relative rounded-md overflow-hidden bg-[#fafafa]">
      <div className="relative h-28 bg-site-yellow flex items-center justify-center">
        <div className="bg-[url('/custom-bg/enquiry-bg.png')] bg-no-repeat bg-cover opacity-10 inset-0 absolute" />
        <h3 className="text-center font-semibold xl:text-2xl md:text-xl text-lg text-site-darkgreen relative">
          Career You&apos;re Passionate About Is There For You!
        </h3>
      </div>
      <form action="" className="flex flex-col gap-4 p-7">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="bg-white lg:py-3.5 py-2.5 xl:px-6 md:px-4 px-3.5 rounded-md text-site-gray placeholder:text-site-gray lg:text-base text-sm"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          required
          minLength={10}
          maxLength={10}
          pattern="[0-9]{10}"
          className="bg-white lg:py-3.5 py-2.5 xl:px-6 md:px-4 px-3.5 rounded-md text-site-gray placeholder:text-site-gray lg:text-base text-sm"
        />
        <select
          name="class"
          className="bg-white lg:py-3.5 py-2.5 xl:px-6 md:px-4 px-3.5 rounded-md text-site-gray placeholder:text-site-gray lg:text-base text-sm outline-none"
        >
          <option value="">Select Class Your&apos;re Interested</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="bg-white lg:py-3.5 py-2.5 xl:px-6 md:px-4 px-3.5 rounded-md text-site-gray placeholder:text-site-gray lg:text-base text-sm"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          className="bg-white lg:py-3.5 py-2.5 xl:px-6 md:px-4 px-3.5 rounded-md text-site-gray placeholder:text-site-gray lg:text-base text-sm"
        ></textarea>
        <button
          type="submit"
          className="lg:text-lg text-base font-semibold text-white [background:_radial-gradient(45.91%_85.94%_at_55.4%_14.06%,_rgba(255,255,255,0.40)_0%,_rgba(255,255,255,0.03)_100%),_radial-gradient(121.48%_78.97%_at_22.73%_20.31%,_rgba(243,203,30,0.20)_18.63%,_rgba(255,250,142,0.20)_100%),_radial-gradient(177.49%_126.29%_at_33.52%_-15.63%,_#FFD41A_0%,_rgba(35,173,140,0.58)_85.15%),_radial-gradient(317.72%_44.57%_at_82.39%_55.47%,_#41FF48_0%,_#27994A_100%),_#030303] hover:shadow-[0_0_20px_4px_rgba(34,197,94,0.6)] shadow-[0px_0px_10px_0px_rgba(255,255,255,0.60)_inset]
  hover:brightness-110 shadow-site-litegreen rounded-3xl flex justify-center items-center  lg:py-3.5 py-2.5 xl:px-6 md:px-4 px-3.5 transform transition-all duration-700"
        >
          Submit Now
        </button>
      </form>
    </div>
  );
}
