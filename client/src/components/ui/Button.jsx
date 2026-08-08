export default function Button({handleClick, label, isActive}) {
    return (
        <button className={`flex my-2 rounded-2xl py-8 px-14 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-300 text-xl ${isActive ? "border" : ""}`} onClick={() => handleClick(label)}>{label}</button>
    )
}
