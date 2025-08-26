"use client";
import dynamic from "next/dynamic";

const AppFooter = dynamic(() => import("./AppFooter"), { ssr: false });

export default AppFooter;
