const CHAINS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000];

export function getNextChain(current: number): number {
    return CHAINS.filter((x) => x > current)[0] ?? -1;
}
