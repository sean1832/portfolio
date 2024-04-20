"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useScrollToHash = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
      }
    }
  }, [router.asPath]);
};

export default useScrollToHash;
