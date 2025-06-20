"use client";

import { useEffect } from "react";
import { API } from "@/app/services/api.service";

const DynamicFavicon = () => {
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await API.getAppLogo();
        const logo = res?.appLogo;
        if (logo) {
          const link: HTMLLinkElement =
            document.querySelector("link[rel*='icon']") || document.createElement("link");
          link.type = "image/png";
          link.rel = "shortcut icon";
          link.href = logo;
          document.head.appendChild(link);
        } else {
          console.warn("Logo not found in response", res);
        }
      } catch (err) {
        console.error("Error fetching logo:", err);
      }
    };

    fetchLogo();
  }, []);

  return null;
};

export default DynamicFavicon;
