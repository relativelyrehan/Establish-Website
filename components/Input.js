import Image from "next/image"

export const Input = ({ title, onChange, required, autoCorrect, type, className, value, setValue, disabled, placeholder, autoFocus }) => {
    return (
        <div className="flex flex-col relative">
            <label htmlFor={title} className="mb-1 capitalize made-gentle tracking-wider">
                {title}
            </label>
            <input
                autoFocus={autoFocus}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                autoComplete="off"
                onChange={onChange}
                required={required}
                autoCorrect={autoCorrect}
                id={title}
                type={type}
                className={`${className} w-full border border-white border-opacity-40 bg-transparent py-2 px-4 focus:outline-none rounded-lg tracking-wider`}
            />
            <div className={`${value ? '' : 'hidden'}`}>{title ? <div className={`${setValue ? '' : 'hidden'} absolute right-2 top-10 cursor-pointer`} onClick={() => setValue && setValue('')}>
                <Image src={'/close.svg'} alt="Clear" height={16} width={16} />
            </div> : <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setValue('')}>
                <Image src={'/close.svg'} alt="Clear" height={16} width={16} />
            </div>}</div>
        </div>
    )
}