import { type Ref, watch, onBeforeUnmount } from 'vue'

export type DropdownPlacement =
  | 'bottom-start' | 'bottom' | 'bottom-end'
  | 'top-start'    | 'top'    | 'top-end'
  | 'right-start'  | 'right'  | 'right-end'
  | 'left-start'   | 'left'   | 'left-end'

const supportsAnchorPositioning =
  typeof CSS !== 'undefined' && CSS.supports('anchor-name', '--test')

export function useDropdownPosition(
  triggerRef: Ref<HTMLElement | null>,
  panelRef: Ref<HTMLElement | null>,
  placement: () => DropdownPlacement,
  offset: () => number,
  isOpen: Ref<boolean>,
) {
  if (supportsAnchorPositioning) return

  let ro: ResizeObserver | null = null

  function compute() {
    const trigger = triggerRef.value
    const panel = panelRef.value
    if (!trigger || !panel || !isOpen.value) return

    const t = trigger.getBoundingClientRect()
    // Force layout to get accurate panel dimensions
    const pw = panel.offsetWidth
    const ph = panel.offsetHeight
    const off = offset()
    const pl = placement()

    let top = 0, left = 0

    if (pl.startsWith('bottom')) {
      top = t.bottom + off
      if (pl === 'bottom-start')     left = t.left
      else if (pl === 'bottom')      left = t.left + t.width / 2 - pw / 2
      else                           left = t.right - pw
    } else if (pl.startsWith('top')) {
      top = t.top - ph - off
      if (pl === 'top-start')        left = t.left
      else if (pl === 'top')         left = t.left + t.width / 2 - pw / 2
      else                           left = t.right - pw
    } else if (pl.startsWith('right')) {
      left = t.right + off
      if (pl === 'right-start')      top = t.top
      else if (pl === 'right')       top = t.top + t.height / 2 - ph / 2
      else                           top = t.bottom - ph
    } else {
      left = t.left - pw - off
      if (pl === 'left-start')       top = t.top
      else if (pl === 'left')        top = t.top + t.height / 2 - ph / 2
      else                           top = t.bottom - ph
    }

    // Clamp to viewport with 8px padding
    const vw = window.innerWidth
    const vh = window.innerHeight
    left = Math.max(8, Math.min(left, vw - pw - 8))
    top  = Math.max(8, Math.min(top,  vh - ph - 8))

    Object.assign(panel.style, {
      inset: 'auto',
      margin: '0',
      top:  `${top}px`,
      left: `${left}px`,
    })
  }

  watch(isOpen, (open) => {
    if (open) {
      requestAnimationFrame(() => {
        compute()
        if (panelRef.value) {
          ro = new ResizeObserver(compute)
          ro.observe(panelRef.value)
        }
        window.addEventListener('scroll', compute, { passive: true, capture: true })
        window.addEventListener('resize', compute, { passive: true })
      })
    } else {
      teardown()
    }
  })

  function teardown() {
    ro?.disconnect(); ro = null
    window.removeEventListener('scroll', compute, true)
    window.removeEventListener('resize', compute)
  }

  onBeforeUnmount(teardown)
}
