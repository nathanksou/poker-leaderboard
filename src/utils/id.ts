/**
 * Generates a simple unique ID using timestamp and random string
 * Format: timestamp-randomstring (e.g., "1710864532-x7y9z")
 */
export function generateId(): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${randomStr}`;
}
