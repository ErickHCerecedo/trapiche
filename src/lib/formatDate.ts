export const formatDate = (dateString: string): string => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [day, month, year] = dateString.split('/').map(Number);
    const monthName = months[month - 1];

    return `${monthName} ${day}, ${year}`;
};