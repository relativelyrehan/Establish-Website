import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function Open({ res }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('beforeunload', function (e) {
                window.addEventListener("error", (event) => {
                    window.location.href = "snssdk1233://@makaihsantii?_t=8bexOiluK6t&_r=1"
                });
            });
            // youtube.com/@thedaddork
            window.location.href =
                "vnd.youtube://youtube.com/@thedaddork";
        }
    }, []);

    return (
        <>
            <NextSeo
                title={res?.oGraph?.ogTitle || "LinkPilot | Smart Link"}
                description={res?.oGraph?.ogDescription || "Links that Directly Open Apps & Earn you money"}
                openGraph={{
                    type: 'website',
                    url: 'https://linkpilot.me/',
                    title: res?.oGraph?.ogTitle || "LinkPilot | Smart Link",
                    description: 'Links that Directly Open Apps & Earn you money',
                    images: [
                        {
                            url: res?.oGraph?.ogImage?.url || "https://linkpilot.app/og-image.png",
                            width: 800,
                            height: 600,
                            alt: 'LinkPilot | Smart Link',
                        },
                        {
                            url: res?.oGraph?.ogImage?.url || "https://linkpilot.app/og-image.png",
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

export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    const res = await fetch('https://redirection.linkpilot.app/api/v1/links/seo-data?slug=dqnz', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
    return {
        props: {
            res: res?.data
        }
    }
}