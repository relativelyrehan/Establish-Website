import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        alert(' https://open.spotify.com/track/05Eq6SWneoZYvKQbm2xN25?si=s38D71i_TEyk_RrnhlYIbg&app_destination=copy-link&context=spotify%3Aalbum%3A4sLtOBOzn4s3GDUv3c5oJD')

        const url = "https://www.google.com";
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            window.location.href = 'spotify://track/05Eq6SWneoZYvKQbm2xN25?si=s38D71i_TEyk_RrnhlYIbg&app_destination=copy-link&context=spotify%3Aalbum%3A4sLtOBOzn4s3GDUv3c5oJD';
        } else {
            window.open(url);
        }
    }, []);

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            <h1 className="text-white text-4xl">Redirecting...</h1>

        </div>
    );
}
