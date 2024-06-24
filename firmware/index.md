# Firmware

[QMK](https://docs.qmk.fm/#/) is a popular free and open-source keyboard firmware. All of our keyboards are supported by QMK.

This page covers how to flash your microcontrollers with QMK.

::: info
Fully built keyboards already come flashed and tested. You can use these instructions to customize it, e.g. add scrolling mode, adjust the pointing device, OLED and more.
:::

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

## Source Code

The source code for all keyboards can be found on the `holykeebs-master` branch of https://github.com/idank/qmk_firmware. This repo is periodically kept up to date with main QMK.

There's no requirement to use this repo, it is also possible to copy the relevant pieces to your own clone: the changes are contained to `users/idank` and the specific keyboard you're flashing for. Look at the changes by running this in your clone:

```shell
$ git remote add idank https://github.com/idank/qmk_firmware
$ git diff idank/master...idank/holykeebs-master
```

::: details Precompiled
Due to the various configurations possible (trackpoint, trackball, touchpad, oled, etc.), precomplied files are currently not published. Please build your own.
:::

## Introduction

Since many of our keyboards share common features such as OLED / Pointing Devices, these are supported via the [Userspace feature](https://docs.qmk.fm/#/feature_userspace): this allows the logic to be separated from a specific keyboard / keymap. See the files in [`users/idank`](https://github.com/idank/qmk_firmware/tree/dev/users/idank).

Start by setting up a development environment per [QMK instructions](https://docs.qmk.fm/#/newbs). Clone the repo above and not the main QMK repo:

```shell
# It's also possible to use qmk setup instead of git clone: qmk setup idank/qmk_firmware
$ git clone --recurse-submodules https://github.com/idank/qmk_firmware -b holykeebs-master
$ cd qmk_firmware
```

## Command

The basic structure of the build and flash command is:

```shell
make <keyboard>:<keymap>[:flash] [-e feature1=value1]...
```

The value for `<keyboard>` should match the keyboard you are flashing for:

| Keyboard      | Value |
| ------------- | ----------- |
| Corne | crkbd/rev1 |
| Lily58 | lily58/rev1 |
| Reviung41 | reviung/reviung41 |
| Sweep | idank/sweeq |
| Span | idank/spankbd |
| Keyball39 | keyball/keyball39 |
| Keyball44 | keyball/keyball44 |
| Keyball61 | keyball/keyball61 |

The `<keymap>` can be either `default` or `via` (enables VIA support).

::: info
For Keyball, please see the [dedicated section](#keyball) as the options below don't apply.
:::

The table below lists the possible flags that control what feature to turn on in the firmware.

| Flag          | Description |
| ------------- | ----------- |
| `-e POINTING_DEVICE=cirque35`<br>          `trackpoint`<br>          `trackball` | enable pointing device |
| `-e POINTING_DEVICE_POSITION=left`<br>      `right`<br>      `thumb_inner`<br>      `thumb_outer`<br>      `middle` | specify pointing device position |
| `-e OLED=yes` | enable OLED screen |
| `-e OLED_FLIP=yes` | swaps the left and right OLED roles |
| `-e TRACKBALL_RGB_RAINBOW=yes` | enable a rainbow color animation on the trackball LED |

An example command might look like this:

```shell
make \
    crkbd/rev1:via:flash \
    -e USER_NAME=idank \
    -e POINTING_DEVICE=trackball \
    -e POINTING_DEVICE_POSITION=right \
    -e TRACKBALL_RGB_RAINBOW=yes \
    -e OLED=yes \
    -j8
```

Breaking this down:

1. `crkbd/rev1:via:flash` flashes for a Corne with VIA. Omitting `:flash` would just build the firmware without flashing.
1. `-e USER_NAME=idank` to also pull code from `users/idank`.
1. `-e POINTING_DEVICE=trackball` configures the trackball.
1. `-e POINTING_DEVICE_POSITION=right` configures the trackball to the right side of a split keyboard.
1. `-e TRACKBALL_RGB_RAINBOW=yes` configures the rainbow effect on the trackball.
1. `-e OLED=yes` enables the OLED.
1. `-j8` parallizes the build process.

### Dual Pointing Devices

When using multiple pointing devices, the pointing device specification turns to `-e POINTING_DEVICE=<left>_<right>` where left and right take one of `trackball`, `trackpoint` or `cirque35`. The `-e POINTING_DEVICE_POSITION` flag can be omitted since it's implied by the pointing device configuration.

Additionally, if each side is using a different pointing device, we now need to specify the side we're flashing with `-e SIDE=right` or `-e SIDE=left` because we need a different firmware per side.

Example:

```shell
make \
    crkbd/rev1:via:flash \
    -e USER_NAME=idank \
    -e POINTING_DEVICE=trackball_trackpoint \
    -e SIDE=right \
    -j8
```

The example above flashes the right side, which should be the side with the trackpoint.

The left side would be flashed as follows:

```shell
make \
    crkbd/rev1:via:flash \
    -e USER_NAME=idank \
    -e POINTING_DEVICE=trackball_trackpoint \
    -e TRACKBALL_RGB_RAINBOW=yes \
    -e SIDE=left \
    -j8
```

### Keyball

Keyball's firmware is maintained in a dedicated repository by the designer of the keyboard and is written for Pro Micro controllers. A port of the firmware for RP2040 controllers exists [here](https://github.com/idank/qmk_firmware/tree/holykeebs-master/keyboards/keyball).

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

While on the `holykeebs-master` branch, flash both sides using:

```shell
make keyball/keyball44:via:flash -j8
```

USB cable can be connected to either side of the keyboard.

## Flashing

Run the command you built in the previous step, with `:flash` after the keymap name to also flash after building.

If the command succeeded, you should be seeing this at the end:

```shell

 _           _       _             _
| |__   ___ | |_   _| | _____  ___| |__  ___
| '_ \ / _ \| | | | | |/ / _ \/ _ \ '_ \/ __|
| | | | (_) | | |_| |   <  __/  __/ |_) \__ \
|_| |_|\___/|_|\__, |_|\_\___|\___|_.__/|___/
               |___/

Pointing Device: trackball
OLED: yes
Keyboard main side: right

WARNING! Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.

Flashing for bootloader: rp2040
Waiting for drive to deploy...
```

::: tip
Make note of the `Flashing for bootloader` line: if you're not seeing this at the end of the output, you are not on the correct branch.
:::

Connect the controller to the computer. Sometimes it will go into bootloader if it hasn't been flashed before.

If not, enter bootloader mode by holding the reset button for ~1 second.

On split keyboards, repeat the flashing process for the other controller.

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

## Testing

1. On a split keyboard, connect the halves when none of the sides are powered.
1. On a split keyboard, the output of the build/flash command will say which side needs to be connected to the computer.
1. On first use, a dialog from the OS may open to configure a new keyboard, go through that.
1. Go to [test](https://config.qmk.fm/#/test) that all of the keys work. Some keys (usually on the thumb clusters) don't generate a regular key. Try pressing those in combination with another key. It's also possible to use VIA's test matrix tab.

If one of the keys do not work, head over to [Troubleshooting](/troubleshooting/).

## Community Keymaps

This section is dedicated to keymaps written by community members, describing the special aspects that were implemented:

[@R4_Unit's firmware](https://github.com/Koloth/qmk_firmware/tree/master/keyboards/crkbd/keymaps/Koloth): 4 layers accessed through a pair of thumb keys. The trackball is different on each layer.

::: details
Layer 0: Trackball scrolls the page.  For me, my most common mouse action was scrolling in a web browser etc, so this is the default.  Works perfectly for this task.

Layer 1: Trackball presses arrow keys.  I also really like this for moving inside text fields and it feels really good with the clicks of the trackball.  This is how it was used on older mobile phones, and it is really good at this.

Layer 2: Trackball is mouse.  Out of the box, the pimoroni is a pretty bad mouse, needing you to drag it edge-to-edge about 5 times to move across your screen. If you just up the sensitivity then it isn’t accurate enough to do things like select individual buttons. I’ve added nonlinear response to mine, so that moving it twice as fast doesn’t just move it twice as far, but actually 4x as far (3x as fast, 9x as far, etc.). This gives you the best of both worlds, and if you use like a Mac trackpad, you are already used to this behavior.

Layer 3: Trackball is app switcher.  Again this feels nice as a slightly better version of alt-tab.

I also have a variety of dedicated shortcut keys for things like: screenshot, switch tabs in a browser, basic window arrangement (left-half, right-half, etc.)
:::
