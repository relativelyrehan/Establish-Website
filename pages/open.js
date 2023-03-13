import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        const url = "https://www.google.com";
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = 'shopify://https://open.spotify.com/track/55fmthmn3rgnk9Wyx7G5dU?utm_campaign=com.app';
        } else {
            window.open(url);
        }
    }, []);

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            Opening Safari
        </div>
    );
}
