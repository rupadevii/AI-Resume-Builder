function Input ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    placeholder,
    required = false,
}){
    return (
        <div className="mb-3">
            {label && (
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                {label}
                {required && <span className="text-rose-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 bg-white transition-colors duration-200 text-neutral-900 placeholder:text-neutral-400 ${
                error
                    ? 'border-rose-400 focus:ring-rose-200 focus:border-rose-400'
                    : 'border-neutral-300 focus:ring-neutral-300 focus:border-neutral-900'
                }`}
            />
            {error && <p className="text-rose-600 text-sm mt-2 font-medium">{error}</p>}
        </div>
    );
};

export default Input;