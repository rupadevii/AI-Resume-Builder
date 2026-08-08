export const formatDate = (input) => {
    const date = new Date(input + "-01");

    const formatted = date.toLocaleString('default', { 
        month: 'short', 
        year: 'numeric' 
    });

    return formatted
}