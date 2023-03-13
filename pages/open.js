import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        const url = "https://www.google.com";
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = 'spotify://open.spotify.com/track/05Eq6SWneoZYvKQbm2xN25?si=s38D71i_TEyk_RrnhlYIbg&app_destination=copy-link&context=spotify%3Aalbum%3A4sLtOBOzn4s3GDUv3c5oJD';
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
