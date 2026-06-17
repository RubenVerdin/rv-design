import { ref, watchEffect, type Ref } from 'vue'

type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'rv-theme'

const mode: Ref<ThemeMode> = ref(
  ((typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) as ThemeMode) || 'system',
)

function apply(value: ThemeMode, root: HTMLElement = document.documentElement): void {
  if (value === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', value)
  }
}

export function useTheme(root?: HTMLElement) {
  watchEffect(() => {
    if (typeof document === 'undefined') return
    apply(mode.value, root ?? document.documentElement)
    try {
      localStorage.setItem(STORAGE_KEY, mode.value)
    } catch (_) {
      // ignore storage errors (private browsing, quota)
    }
  })

  const setTheme = (value: ThemeMode): void => {
    mode.value = value
  }

  const cycle = (): void => {
    const next: Record<ThemeMode, ThemeMode> = { system: 'light', light: 'dark', dark: 'system' }
    mode.value = next[mode.value]
  }

  return { mode, setTheme, cycle }
}
