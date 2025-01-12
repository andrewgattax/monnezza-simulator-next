export function enumToName(activity: string): string {
    return activity
        .split('_')
        .map(word => word.charAt(0) + word.slice(1).toLowerCase())
        .join(' ');
}