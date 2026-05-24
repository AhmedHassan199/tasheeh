// Fisher–Yates shuffle — returns a new array, does not mutate the input.
// Used to randomise the instructors order on every page load so no teacher
// is permanently featured first (fair rotation).
export function shuffle(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
