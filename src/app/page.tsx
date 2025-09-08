"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Courses from "@/components/Home/Courses";
import FAQ from "@/components/Home/FAQ";
import Hero from "@/components/Home/Hero";
import Reviews from "@/components/Home/Reviews";
import { useState } from "react";

export default function Home() {

  const [open, setOpen] = useState(false)
  const [activeIem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Login')

  return (
    <>
      <Header open={open} setOpen={setOpen} activeItem={activeIem} route={route} setRoute={setRoute} />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </>
  );
}
