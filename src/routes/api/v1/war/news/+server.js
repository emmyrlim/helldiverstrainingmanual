import { fetchNews } from '$lib/api/helldivers'

export async function GET({ url }) {
  const headers = { 'Content-Type': 'application/json' }
  const from = parseInt(url.searchParams.get("from") || "0")
  const data = await fetchNews(fetch, from)

  return new Response(JSON.stringify(data), { headers })
}
