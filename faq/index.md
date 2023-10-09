# FAQ

Answers to some common questions.

## Wireless

I'd love to do wireless builds but there isn't official support for the pointing devices we use in ZMK. There are various efforts but those aren't confirmed to fully work or be power efficient.

## Low Profile vs. Choc

The difference between these two is the key spacing.

Low profile uses a grid of 19x19mm squares and is also called MX spacing as that's what keyboards with MX style switches commonly use.

Choc spacing is more compact and uses 18x17mm squares, and produces a more compact keyboard with minimal key spacing. It is specifically designed for Kailh's choc switches (hence the name) as they have a smaller footprint and allow this.

## New Keyboards

Every few months I will add new keyboards models or extend the ones already offered with new features. If you have a specific need that you think would also garner interest from others, feel free to reach out and I might be incentivized to go for that next.

## Firmware

### Can I Change Split Master

Yes, see [SPLIT_POINTING_ENABLE](https://docs.qmk.fm/#/feature_pointing_device?id=split-keyboard-configuration).

### Dual Pointing Devices

It is possible to use both a 2x trackballs or a trackball + trackpoint. Two trackpoints are currently not possible due to lack of support in QMK.

### Remapping Keys

With VIA, keys and layers can be changed without flashing the keyboard. Go to the VIA [web app](https://usevia.app/), or download the [desktop app](https://github.com/the-via/releases/releases). If you don't want to use VIA, please consult QMK docs on how to create your own keymap.