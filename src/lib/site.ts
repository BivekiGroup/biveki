export function getInternalApiBase() {
  return process.env.INTERNAL_API_URL || 'http://127.0.0.1:3000';
}

