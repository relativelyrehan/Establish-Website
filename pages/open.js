import { useEffect } from "react";

export default function Open() {
    useEffect(() => {
        try {
            window.location.href = 'jikasdf://track/05Eq6SWneoZYvKQbm2xN25?si=s38D71i_TEyk_RrnhlYIbg&app_destination=copy-link&context=spotify%3Aalbum%3A4sLtOBOzn4s3GDUv3c5oJD';
        } catch (e) {
            setTimeout(() => {
                window.location.href = "www.google.com"
            }, 500)
        }
    }, []);

    return (
        <div className="flex h-screen w-full bg-black items-center justify-center">
            <h1 className="text-white text-4xl">Redirecting...</h1>

        </div>
    );
}
