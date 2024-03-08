import { fetchInfo, fetchStatus } from "$lib/api/helldivers"
import { fetchOwnership } from "$lib/api/ownership"

// @ts-ignore
/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const status = await fetchStatus(fetch)
  const info = await fetchInfo(fetch)
  const records = (await fetchOwnership() || []).filter(i => i.current_owner !== i.previous_owner)

  return {
    records,
    status,
    info
  }
}
