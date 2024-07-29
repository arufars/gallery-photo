"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Refresh() {
  const router = useRouter();
  //   const reload = window.location.reload();

  useEffect(() => {
    router.refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
