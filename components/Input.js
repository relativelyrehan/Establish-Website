export const Input = ({ title, onChange, required, autoCorrect, type, className }) => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={title} className="mb-1 capitalize">
                {title}
            </label>
            <input
                onChange={onChange}
                required={required}
                autoCorrect={autoCorrect}
                id={title}
                type={type}
                className={`${className} w-full bg-transparent border border-skin border-opacity-40 rounded-lg py-2 px-4 focus:outline-none`}
            />
        </div>
    )
}