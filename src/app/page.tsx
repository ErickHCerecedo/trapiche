"use client"

import React from 'react';
import { redirect } from 'next/navigation';
  

const Home: React.FC = () => {
    redirect('/noticias');
    return null;
}

export default Home
