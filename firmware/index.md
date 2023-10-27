# Firmware

[QMK](https://docs.qmk.fm/#/) is a popular free and open-source keyboard firmware. All of our keyboards are supported by QMK.

This page covers how to flash your microcontrollers with QMK.

::: info
Fully built keyboards already come flashed and tested. You can use these instructions to customize it, e.g. add scrolling mode, adjust the pointing device, OLED and more.
:::

## Source Code

The source code for all keyboards can be found on the `dev` and `dev-rp2040` branches of https://github.com/idank/qmk_firmware. This repo is periodically kept up to date with the `develop` branch of main QMK.

There's no requirement to use this repo, it is also possible to copy the relevant pieces (explained below) to your own clone.

::: details Precompiled
Due to the various configurations possible (trackpoint, trackball, pro micro, rp2040, etc.), precomplied files are currently not published. Please build your own.
:::

## Introduction

Since many of our keyboards share common features such as OLED / Pointing Devices, these are supported via the [Userspace feature](https://docs.qmk.fm/#/feature_userspace): this allows the logic to be separated from a specific keyboard / keymap. See the files in [`users/idank`](https://github.com/idank/qmk_firmware/tree/dev/users/idank).

Start by setting up a development environment per [QMK instructions](https://docs.qmk.fm/#/newbs). Clone the repo above and not the main QMK repo.

Change branches to `dev` if you're flashing a Pro Micro controller, and to `dev-rp2040` for Sea Picros.

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

The `<keymap>` can be either `default` or `via` (enables VIA support).

The table below lists the possible flags that control what feature to turn on in the firmware.

| Flag          | Description |
| ------------- | ----------- |
| `-e POINTING_DEVICE=trackball\|trackpoint` | enable pointing device |
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
