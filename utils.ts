
export function enumToName(activity: string): string {
    return activity
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');
}

export function toNiceString(data: string): string {
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
}

export function toNiceDate(data: Date): string {
    const day = String(data.getDate()).padStart(2, '0');
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const year = String(data.getFullYear()).slice(-2);
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function concatProgressivi(progressivi: String[]) {
    return progressivi.join('-');
}

