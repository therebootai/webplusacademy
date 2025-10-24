
import { XI } from '@/components/cource/XI'
import XII2 from '@/components/cource/XI2'
import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'


export const metadata = {
  title: "Class XI NEET Foundation Course | Waveplus Academy Siliguri",
  description:
    "Build your NEET foundation strong with Waveplus Academy’s Class XI program in Siliguri. Expert guidance, concept clarity, and regular practice for early success.",
}


const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading="Class-XI"/>
      <section className='px-4 md:px-40'>


        <XI/>
        <XII2/>
      </section>
          


     </MainTemplates>
    
    </>
  )
}

export default page