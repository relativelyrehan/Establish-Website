import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

export default function Open({ res }) {
    const ref = React.createRef();
    useEffect(() => {
        if (typeof window != "undefined" && ref?.current) {
            ref.current.click();
        }
    }, [ref]);

    return (
        <>
            {/* <p dangerouslySetInnerHTML={{ __html: document.getElementsByTagName('head')[0] }}></p> */}
            <NextSeo
                title={res?.oGraph?.ogTitle || "LinkPilot | Smart Link"}
                description={
                    res?.oGraph?.ogDescription ||
                    "Links that Directly Open Apps & Earn you money"
                }
                openGraph={{
                    type: "website",
                    url: "https://linkpilot.me/",
                    title: res?.oGraph?.ogTitle || "LinkPilot | Smart Link",
                    description: "Links that Directly Open Apps & Earn you money",
                    images: [
                        {
                            url:
                                res?.oGraph?.ogImage?.url ||
                                "https://linkpilot.app/og-image.png",
                            width: 800,
                            height: 600,
                            alt: "LinkPilot | Smart Link",
                        },
                        {
                            url:
                                res?.oGraph?.ogImage?.url ||
                                "https://linkpilot.app/og-image.png",
                            width: 800,
                            height: 600,
                            alt: "LinkPilot | Smart Link",
                        },
                    ],
                }}
            />
            <a ref={ref} href="https://youtube.com" target="_blank" rel="noreferrer"></a>
            <div className="flex h-screen w-full bg-black items-center justify-center">
                <h1 className="text-white text-4xl">Redirecting...</h1>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx) {
    console.log(ctx.query);
    const res = await fetch(
        "https://redirection.linkpilot.app/api/v1/links/seo-data?slug=dqnz",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
    return {
        props: {
            res: res?.data,
        },
    };
}
