// https://github.com/Microsoft/TypeScript/issues/17198#issuecomment-315400819
export function getEnumEntries(E: any) {
  const keys = Object.keys(E).filter(k => typeof E[k as any] === "number");
  const entries = keys.map(k => [k, E[k as any]]);
  return entries;
}
