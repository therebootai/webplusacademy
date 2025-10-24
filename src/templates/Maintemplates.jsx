import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import OnlyMobile from "./Onlymobile";




export default function MainTemplates({ children }) {
  return (
    <div className="flex w-full h-full flex-col overflow-x-hidden">
      <div className="z-[1000] w-full">
        
        <Header/>
        
        
      </div>

   
      <div className="lg:mt-[5rem] md:mt-[5rem] mt-[2rem]">{children}</div>
      <OnlyMobile/>
        
     <Footer/>
     
    </div>
  );
}
