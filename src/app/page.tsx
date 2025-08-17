"use client";

import Header from "@/components/Header";
import { useState } from "react";


export default function Home() {

  const [open, setOpen] = useState(false)
  const [activeIem, setActiveItem] = useState(0)

  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeIem}
      />
    </>
  );
}
