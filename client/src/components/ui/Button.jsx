// export default function Button({handleClick, label, isActive}) {
//     return (
//         <button className={`flex my-2 rounded-2xl py-8 px-14 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-300 text-xl ${isActive ? "border" : ""}`} onClick={() => handleClick(label)}>{label}</button>
//     )
// }

import React from 'react';

function Button ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className = '',
}) {
    const baseStyles =
        'inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';

    const variants = {
        primary:
        'bg-neutral-900 text-white shadow-md shadow-neutral-900/15 hover:bg-neutral-800 focus:ring-neutral-400',
        secondary:
        'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200 focus:ring-neutral-300',
        danger:
        'bg-rose-600 text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 focus:ring-rose-500',
        success:
        'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 focus:ring-emerald-500',
    };

    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-60' : ''} ${className}`}
        >
        {children}
        </button>
    );
};

export default Button;