export const Input = ({ title, onChange, required, autoCorrect, type, className, value }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={title} className="mb-1 capitalize made-gentle tracking-wider">
                {title}
            </label>
            <input
                value={value}
                autoComplete="off"
                onChange={onChange}
                required={required}
                autoCorrect={autoCorrect}
                id={title}
                type={type}
                className={`${className} w-full border border-white border-opacity-40 bg-transparent py-2 px-4 focus:outline-none rounded-lg tracking-wider`}
            />
        </div>
    )
}