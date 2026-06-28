import { type Ref } from 'vue'

interface Point { x: number; y: number; t: number }

export function useAimAware(
  panelRef: Ref<HTMLElement | null>,
  close: () => void,
  delay: () => number,
) {
  let history: Point[] = []
  let timer: ReturnType<typeof setTimeout> | null = null

  function track(e: MouseEvent) {
    const now = Date.now()
    history.push({ x: e.clientX, y: e.clientY, t: now })
    const cutoff = now - 120
    history = history.filter(p => p.t >= cutoff)
  }

  function isAiming(): boolean {
    if (!panelRef.value || history.length < 2) return false
    const rect = panelRef.value.getBoundingClientRect()
    const last = history.at(-1)!
    const prev = history[0]
    const dt = last.t - prev.t
    if (dt <= 0) return false
    const d = delay()
    const projX = last.x + ((last.x - prev.x) / dt) * d
    const projY = last.y + ((last.y - prev.y) / dt) * d
    return projX >= rect.left && projX <= rect.right
        && projY >= rect.top  && projY <= rect.bottom
  }

  function scheduleClose() {
    clearTimeout(timer ?? undefined)
    timer = setTimeout(() => { if (!isAiming()) close() }, delay())
  }

  function cancelClose() {
    if (timer !== null) { clearTimeout(timer); timer = null }
  }

  function reset() {
    history = []
    cancelClose()
  }

  return { track, scheduleClose, cancelClose, reset }
}
