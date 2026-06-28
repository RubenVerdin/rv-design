import '../styles.css'

import type { App } from 'vue'

import RvButton from './components/RvButton.vue'
import RvInput from './components/RvInput.vue'
import RvTextarea from './components/RvTextarea.vue'
import RvSelect from './components/RvSelect.vue'
import RvCheckbox from './components/RvCheckbox.vue'
import RvRadio from './components/RvRadio.vue'
import RvRadioGroup from './components/RvRadioGroup.vue'
import RvSwitch from './components/RvSwitch.vue'
import RvFormField from './components/RvFormField.vue'
import RvHeading from './components/RvHeading.vue'
import RvCard from './components/RvCard.vue'
import RvBadge from './components/RvBadge.vue'
import RvTag from './components/RvTag.vue'
import RvAvatar from './components/RvAvatar.vue'
import RvAlert from './components/RvAlert.vue'
import RvSpinner from './components/RvSpinner.vue'
import RvTooltip from './components/RvTooltip.vue'
import RvTabs from './components/RvTabs.vue'
import RvAccordion from './components/RvAccordion.vue'
import RvDropdown from './components/RvDropdown.vue'
import RvDropdownMenu from './components/RvDropdownMenu.vue'
import RvContainer from './components/RvContainer.vue'

export { useTheme } from './composables/useTheme'

export {
  RvButton, RvInput, RvTextarea, RvSelect, RvCheckbox, RvRadio, RvRadioGroup,
  RvSwitch, RvFormField, RvHeading, RvCard, RvBadge, RvTag, RvAvatar, RvAlert,
  RvSpinner, RvTooltip, RvTabs, RvAccordion, RvDropdown, RvDropdownMenu, RvContainer,
}

const components = {
  RvButton, RvInput, RvTextarea, RvSelect, RvCheckbox, RvRadio, RvRadioGroup,
  RvSwitch, RvFormField, RvHeading, RvCard, RvBadge, RvTag, RvAvatar, RvAlert,
  RvSpinner, RvTooltip, RvTabs, RvAccordion, RvDropdown, RvDropdownMenu, RvContainer,
}

export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}
