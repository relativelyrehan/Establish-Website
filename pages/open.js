import axios from "axios";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function Open() {
    const res = axios.get('https://redirection.linkpilot.app/api/v1/links/seo-data?slug=dqnz');

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         window.addEventListener('beforeunload', function (e) {
    //             window.addEventListener("error", (event) => {
    //                 window.location.href = "www.google.com"
    //             });
    //         });
    //         // youtube.com/@thedaddork
    //         window.location.href =
    //             "vnd.youtube://youtube.com/@thedaddork";
    //     }
    // }, []);

    return (
        <>
            <NextSeo
                title={res?.data?.data?.oGraph?.ogTitle || "LinkPilot | Smart Link"}
                description={res?.data?.data?.oGraph?.ogDescription || "Links that Directly Open Apps & Earn you money"}
                openGraph={{
                    type: 'website',
                    url: 'https://linkpilot.me/',
                    title: res?.data?.data?.oGraph?.ogTitle || "LinkPilot | Smart Link",
                    description: 'Links that Directly Open Apps & Earn you money',
                    images: [
                        {
                            url: res?.data?.data?.oGraph?.ogImage?.url || "https://linkpilot.app/og-image.png",
                            width: 800,
                            height: 600,
                            alt: 'LinkPilot | Smart Link',
                        },
                        {
                            url: res?.data?.data?.oGraph?.ogImage?.url || "https://linkpilot.app/og-image.png",
                            width: 800,
                            height: 600,
                            alt: 'LinkPilot | Smart Link',
                        },
                    ],
                }}
            />
            <div className="flex h-screen w-full bg-black items-center justify-center">
                <h1 className="text-white text-4xl">Redirecting...</h1>
            </div>
        </>
    );
}
