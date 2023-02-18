export const hanldeTruncate = (s) => {
    if (s.length > 300) {
        return s.substring(0, 300) + '...';
    }
    return s;
}