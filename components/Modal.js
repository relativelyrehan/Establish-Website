import Image from 'next/image';

export const Modal = ({ isVisible, children, onClose, title }) => {
    if (!isVisible) return;
    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 hidden lg:flex flex-col justify-center items-center z-[100] w-screen h-screen backdrop-blur">
            <div className="w-[440px] bg-black border-white border border-opacity-40 text-white rounded-lg py-4">
                <div className="flex items-center justify-between px-6 pb-4">
                    <h1 className="text-xl leading-8 font-semibold made-gentle">
                        {title}
                    </h1>
                    <button onClick={onClose}>
                        <Image height={14} width={14} src="/close.svg" alt="close" />
                    </button>
                </div>
                <div></div>
                {children}
            </div>
        </div>
    );
};
