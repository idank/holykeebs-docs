
<script setup>
import { ref, computed } from 'vue'

const keyboards = ["Corne", "Sweep", "Span", "Lily58", "Keyball39", "Keyball44", "Keyball61"]
const controller_option = ["None", "OLED", "TPS43", "Trackpoint", "Cirque35", "Cirque40", "Pimoroni Trackball"]

const selected_keyboard = ref(keyboards[0])
const selected_left_controller = ref(controller_option[0])
const selected_right_controller = ref(controller_option[0])

function isPointingDevice(controller) {
    // Check if there's a pointing device on the controller.
    return controller === "TPS43" || controller === "Trackpoint" || controller === "Cirque35" || controller === "Cirque40" || controller === "Pimoroni Trackball";
}

const keyboardToQmkName = {
    "Corne": "crkbd_rev1",
    "Sweep": "holykeebs_sweeq",
    "Span": "holykeebs_spankbd",
    "Lily58": "lily58_rev1",
    "Keyball39": "keyball_keyball39",
    "Keyball44": "keyball_keyball44",
    "Keyball61": "keyball_keyball61"
}

const pointingToFileName = {
    "None": "none",
    "OLED": "oled",
    "TPS43": "tps43",
    "Trackpoint": "trackpoint",
    "Cirque35": "cirque35",
    "Cirque40": "cirque40",
    "Pimoroni Trackball": "trackball"
}

const firmwareName = computed(() => {
    if (selected_keyboard.value.startsWith("Keyball")) {
        return [`${keyboardToQmkName[selected_keyboard.value]}_via.uf2`];
    }

    let keymap = "via";
    if (isPointingDevice(selected_left_controller.value) || isPointingDevice(selected_right_controller.value)) {
        keymap = "hk";
    }
    const base_name = `${keyboardToQmkName[selected_keyboard.value]}_${keymap}_${pointingToFileName[selected_left_controller.value]}_${pointingToFileName[selected_right_controller.value]}`;

    // We have a firmware per side.
    if (isPointingDevice(selected_left_controller.value) && isPointingDevice(selected_right_controller.value)) {
        return [`${base_name}_flash_on_left.uf2`, `${base_name}_flash_on_right.uf2`];
    }
    return [`${base_name}.uf2`];
})

function firmwareDownloadUrl(file_name) {
  return `https://github.com/holykeebs/qmk_compiled/releases/download/latest/${file_name}`
}
</script>
<template>
<div class="bulma-field">
  <label class="bulma-label">Keyboard</label>
  <div class="bulma-control">
    <div class="bulma-select">
      <select v-model="selected_keyboard">
        <option :value="kind" v-for="kind in keyboards">{{ kind }}</option>
      </select>
    </div>
  </div>
</div>

<div class="bulma-field">
  <label class="bulma-label">Left Controller Has</label>
  <div class="bulma-control">
    <div class="bulma-select">
      <select v-model="selected_left_controller">
        <option :value="kind" v-for="kind in controller_option">{{ kind }}</option>
      </select>
    </div>
  </div>
</div>

<div class="bulma-field">
  <label class="bulma-label">Right Controller Has</label>
  <div class="bulma-control">
    <div class="bulma-select">
      <select v-model="selected_right_controller">
        <option :value="kind" v-for="kind in controller_option">{{ kind }}</option>
      </select>
    </div>
  </div>
</div>

<p>
  To flash, we need to get into the bootloader and copy <a :href="firmwareDownloadUrl(firmwareName[0])" download>{{ firmwareName[0] }}</a>
  <span v-if="firmwareName.length > 1"> (flashed on the left side), <a :href="firmwareDownloadUrl(firmwareName[1])" download>{{ firmwareName[1] }}</a> (flashed on the right side)</span>
  into the USB drive called <code>RPI-RP2</code>. After copying, the drive should disappear and the firmware will have updated.
</p>
</template>
