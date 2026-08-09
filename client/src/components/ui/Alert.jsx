const Alert = ({ type = 'success', message}) => {
    const bgColor = type === 'success' ? 'bg-neutral-50' : 'bg-rose-50';
    const textColor = type === 'success' ? 'text-neutral-800' : 'text-rose-800';
    const borderColor = type === 'success' ? 'border-neutral-900' : 'border-rose-400';
    const icon = type === 'success' ? '✅' : '❌';


    if (!message) return null;

    return (
        <div
        className={`${bgColor} ${textColor} ${borderColor} border-l-4 p-4 mb-6 rounded-xl flex justify-between items-center animate-slide-down`}
        >
        <div className="flex items-center">
            <span className="text-lg mr-3">{icon}</span>
            <p className="font-medium">{message}</p>
        </div>
        </div>
    );
};

export default Alert;