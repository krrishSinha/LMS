"use client";

import Header from "@/components/Header";
import Hero from "@/components/Home/Hero";
import Profile from "@/components/Profile/Profile";
import Protected from "@/hooks/useProtected";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {

  const [open, setOpen] = useState(false)
  const [activeIem, setActiveItem] = useState(0)
  const [route, setRoute] = useState('Login')
  const {user}:any = useSelector((state:any)=> state.auth)

  return (
    <>
    <Protected>
      <Header open={open} setOpen={setOpen} activeItem={activeIem} route={route} setRoute={setRoute} />
      <Profile user={user} />
    </Protected>
    </>
  );
}
