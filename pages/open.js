import axios from "axios";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function Open() {

    const [seoData, setSeoData] = useState({
        ogTitle: "LinkPilot | Smart Link",
        ogDescription: "Links that Directly Open Apps & Earn you money",
        ogImage: "https://linkpilot.app/og-image.png",
    });

    useEffect(() => {
        (async function getSEOData() {
            const res = await axios.get('https://redirection.linkpilot.app/api/v1/links/seo-data?slug=dqnz');
            if (res.status === 200) {
                console.log(res.data.data)
                setSeoData({
                    ogTitle: res?.data?.data?.oGraph?.ogTitle || "LinkPilot | Smart Link",
                    ogDescription: res?.data?.data?.oGraph?.ogDescription || "Links that Directly Open Apps & Earn you money",
                    ogImage: res?.data?.data?.oGraph?.ogImage?.url || "https://linkpilot.app/og-image.png",
                })
            }
        })();
    }, []);

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
                title={seoData?.ogTitle}
                description={seoData?.ogDescription}
                openGraph={{
                    type: 'website',
                    url: 'https://linkpilot.me/',
                    title: seoData?.ogTitle,
                    description: 'Links that Directly Open Apps & Earn you money',
                    images: [
                        {
                            url: seoData?.ogImage,
                            width: 800,
                            height: 600,
                            alt: 'LinkPilot | Smart Link',
                        },
                        {
                            url: seoData?.ogImage,
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
