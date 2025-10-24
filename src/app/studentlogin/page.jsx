import Subbanner from '@/components/global/Subbanner'
import MainTemplates from '@/templates/Maintemplates'
import React from 'react'


export const metadata = {
  title: "Student Login | ",
  description:
    "Learn more about Waveplus Academy, our mission, values, and the high-quality education we provide to help students achieve excellence in NEET and other competitive exams.",
}

const page = () => {
  return (
    <>
    
     <MainTemplates>
      <Subbanner heading="Student Login"/>


     </MainTemplates>
    
    </>
  )
}

export default page