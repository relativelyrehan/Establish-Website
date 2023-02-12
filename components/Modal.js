import Image from 'next/image';
import { useRef } from 'react';
import useOutsideAlerter from '../utils/hooks/outsideClick'

export const Modal = ({ isVisible, children, onClose, title }) => {
    const ref = useRef(null)
    useOutsideAlerter(ref, onClose);
    if (!isVisible) return;
    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[100] w-screen h-screen backdrop-blur">
            <div ref={ref} className="w-[440px] bg-black rounded-lg py-4 border border-skin border-opacity-40">
                <div className="flex items-center justify-between px-6 pb-4">
                    <h1 className="text-xl leading-8 font-semibold text-skin">
                        {title}
                    </h1>
                    <button onClick={onClose}>
                        <Image height={14} width={14} src="/close.svg" alt="close" />
                    </button>
                </div>
                <div className="border-b border-skin border-opacity-40"></div>
                {children}
            </div>
        </div>
    );
};
