export const BorderButton = ({ onClick, containerClass, px = "px-6", py = "py-2", title, disabled, fontSize, loading }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`${containerClass} ${fontSize ? fontSize : 'text-base lg:text-xl'} made-gentle border border-white border-opacity-80 rounded-full ${px} ${py} hover:border-sunset ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}}`}
        >
            {title}
        </button>
    )
}