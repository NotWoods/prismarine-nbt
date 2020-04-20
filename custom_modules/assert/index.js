export function ok (value, message) {
  if (!value) throw new Error(message)
}
