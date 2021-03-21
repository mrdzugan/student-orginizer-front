export default function getAuthHeader() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        return { 'x-access-token': accessToken };
    } else {
        return {};
    }
}