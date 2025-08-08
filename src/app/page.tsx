"use client";
import { useEffect, useState } from "react";

export default function Home() {

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;


  return (
    <h1> hello </h1>
  );
}
