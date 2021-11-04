export const compareLogins = (first: string, second: string) => {
  if (first.toString() > second.toString()) return 1
  else if (first.toString() < second.toString()) return -1
  else return 0
}
