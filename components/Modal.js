import Image from 'next/image';

export const Modal = ({ isVisible, children, onClose, title }) => {
    if (!isVisible) return;
    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[100] w-screen h-screen backdrop-blur">
            <div className="w-[440px] bg-white rounded-lg py-4">
                <div className="flex items-center justify-between px-6 pb-4">
                    <h1 className="text-xl leading-8 font-semibold text-black">
                        {title}
                    </h1>
                    <button onClick={onClose}>
                        <Image height={14} width={14} src="/close.svg" alt="close" />
                    </button>
                </div>
                <div className="border-b border-lightBeerus"></div>
                {children}
            </div>
        </div>
    );
};
