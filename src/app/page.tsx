"use client";

import Header from "@/components/Header";
import Hero from "@/components/Home/Hero";
import { useState } from "react";

export default function Home() {

  const [open, setOpen] = useState(false)
  const [activeIem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Login')

  return (
    <>
      <Header open={open} setOpen={setOpen} activeItem={activeIem} route={route} setRoute={setRoute} />
      <Hero />
    </>
  );
}
