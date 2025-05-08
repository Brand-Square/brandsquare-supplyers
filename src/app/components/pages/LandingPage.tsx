"use client";

import { useEffect, useState } from "react";
import DesktopHome from "./DesktopHome";
import MobileHome from "./MobileHome";
import { useMobile } from "../../hooks/useMobile";

export default function Home() {
  const isMobile = useMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
