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

The source code for all keyboards can be found on the `dev` and `dev-rp2040` branches of https://github.com/idank/qmk_firmware. This repo is periodically kept up to date with the `develop` branch of main QMK.

There's no requirement to use this repo, it is also possible to copy the relevant pieces (explained below) to your own clone.

::: details Precompiled
Due to the various configurations possible (trackpoint, trackball, touchpad, pro micro, rp2040, etc.), precomplied files are currently not published. Please build your own.
:::

## Introduction

Since many of our keyboards share common features such as OLED / Pointing Devices, these are supported via the [Userspace feature](https://docs.qmk.fm/#/feature_userspace): this allows the logic to be separated from a specific keyboard / keymap. See the files in [`users/idank`](https://github.com/idank/qmk_firmware/tree/dev/users/idank).

Start by setting up a development environment per [QMK instructions](https://docs.qmk.fm/#/newbs). Clone the repo above and not the main QMK repo.

Change branches to `dev-rp2040` if you're flashing a Sea Picro, and `dev` for Pro Micro.

::: details
Even though it is possible to use one configuration in QMK to describe a keyboard and "convert" a firmware to be compatible with different controllers, this conversion doesn't work in all cases.

Importantly, it is not fully working when used in combination with several other features such as the PS/2 driver (needed for trackpoints), split support, OLED, etc.
:::

The basic structure of the build and flash command is:

```shell
make <keyboard>:<keymap>[:flash] [-e feature1=value1]...
```

## Command

The value for `<keyboard>` should match the keyboard you are flashing for:

| Keyboard      | Value |
| ------------- | ----------- |
| Corne | crkbd/rev1 |
| Lily58 | lily58/rev1 |
| Revuing41 | reviung/reviung41 |
| Sweep | idank/sweeq |
| Span | idank/spankbd |
| Keyball44 | keyball/keyball44 |

The `<keymap>` can be either `default` or `via` (enables VIA support).

::: info
For Keyball, please see the dedicated section as the options below don't apply.
:::

The table below lists the possible flags that control what feature to turn on in the firmware.

| Flag          | Description |
| ------------- | ----------- |
| `-e POINTING_DEVICE=cirque35`<br>          `trackpoint`<br>          `trackball` | enable pointing device |
| `-e POINTING_DEVICE_POSITION=left\|right\|thumb\|middle` | specify pointing device position |
| `-e OLED=yes` | enable OLED screen |
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

When using multiple pointing devices, the pointing device specification turns to `-e POINTING_DEVICE=<left>_<right>` where left and right take one of `trackball`, `trackpoint` or `cirque35`. The `-e POINTING_DEVICE_POSITION` argument is only necessary when using a thumb trackball, in all other cases it can be omitted.

#### Trackpoint + Trackball/Touchpad

The PS/2 driver in QMK is using a subsystem that doesn't play well with the pointing device subsystem, which trackball and touchpad use. For this reason, split keyboards with a trackpoint and trackball/touchpad have no support in stock QMK.

The `dev-rp2040-combined` branch addresses these issues, but a slightly different command than the one above.

Example:

```shell
# assumes dev-rp2040-combined is checked out
make \
    crkbd/rev1:via:flash \
    -e USER_NAME=idank \
    -e POINTING_DEVICE=trackball_trackpoint \
    -e SIDE=right \
    -j8
```

Details:

1. Possible values for `POINTING_DEVICE` are `trackball_trackpoint` for a keyboard with a trackball on left, trackpoint on right, or `trackpoint_trackball` for the reverse. Replace `trackball` with `cirque35` if using a touchpad.
1. We can see that we now need to specify the side we're flashing with `-e SIDE=right|left`. The example above flashes the right side, which should be the side with the trackpoint.

The left side would be flashed as follows:

```shell
make \
    crkbd/rev1:via:flash \
    -e USER_NAME=idank \
    -e POINTING_DEVICE=trackball_trackpoint \
    -e SIDE=left \
    # optional:
    -e TRACKBALL_RGB_RAINBOW=yes \
    -j8
```

### Keyball

Keyball's firmware is maintained in a dedicated repository by the designer of the keyboard and is written for Pro Micro controllers. A port of the firmware for RP2040 controllers exists [here](https://github.com/idank/qmk_firmware/tree/dev-rp2040/keyboards/keyball).

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

While on the `dev-rp2040` branch, flash both sides using:

```shell
make keyball/keyball44:via:flash -j8
```

USB cable can be connected to either side of the keyboard.

## Flashing

Run the command you built in the previous step, with `:flash` after the keymap name to also flash after building.

If the command succeeded, you should be seeing this at the end:

```shell
 * The firmware size is fine - 24844/28672 (86%, 3828 bytes free)
Flashing for bootloader: caterina
Waiting for USB serial port - reset your controller now (Ctrl+C to cancel)....
```

Or this for RP2040 controllers:

```shell
Flashing for bootloader: rp2040
Bootloader not found. Make sure the board is in bootloader mode. See https://docs.qmk.fm/#/newbs_flashing
 Trying again every 0.5s (Ctrl+C to cancel)....
```

Connect the controller to the computer. Sometimes it will go into bootloader if it hasn't been flashed before.

If not, enter bootloader mode:

1. Sea Picro: hold the reset button for ~1 second.
1. Pro Micro: double tap the reset button.

On split keyboards, repeat the flashing process for the other controller.

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

## Testing

1. On a split keyboard, connect the halves when none of the sides are powered.
1. On a split keyboard, by default the side with the pointing device is the one that needs to be powered, connect that side to the computer (if no pointing device is used, use the right side).
1. On first use, a dialog from the OS may open to configure a new keyboard, go through that.
1. Go to config [https://config.qmk.fm/#/test](https://config.qmk.fm/#/test) to test that all of the keys work. Some keys (usually on the thumb clusters) don't generate a regular key. Try pressing those in combination with another key.

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
