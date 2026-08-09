export async function GET() {
  const content = `self.addEventListener('install', () => self.skipWaiting()); self.addEventListener('activate', () => self.clients.claim());`;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
