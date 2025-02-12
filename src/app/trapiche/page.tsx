import React from 'react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Noticias from '@/app/noticias/page'

function page() {
  return (
    <>
    <Header />
        <Noticias />
    <Footer />
    </>
  )
}

export default page