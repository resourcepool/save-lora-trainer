
export function isValidTeam(name: string, clientId: string): boolean {
    const regex = new RegExp('[a-zA-Z0-9\-\.\:]*');
    return regex.test(name) && regex.test(clientId);
}