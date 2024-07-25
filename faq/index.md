# FAQ

## About

holykeebs is a tiny store operated from Israel. I just like soldering.

holykeebs specializes in ergonomic split keyboards with pointing devices such as trackballs, touchpads and trackpoints.

## Shipping

### Do you ship globally?

Yes, if you don't see your country in the shipping page, please contact us.

### What shipping methods are available?

We ship to most destinations using FedEx and the post office (this option is called Economy Post), both have tracking. In some remote countries, the post office doesn't have tracking and will only indicate the package has been sent (this option is called Registered Air Mail).

Transit times for FedEx is usually around 5 days, and the post office average is between 10 to 15 days.

If you choose an untracked shipping option, please be aware that shipping times can highly vary. If you're not willing to wait beyond 30 days, which can happen, please use FedEx.

### My order's tracking has not been updating!

This can be a customs issue, port issues, parcel / postal system overload, and many more reasons we cannot influence. Please reach out after you have not seen an about for at least a week.

If your shipping method wasn't FedEx, your package is delivered using the destination country's local postal service. Use the tracking number in your post office systems to get detailed information on its whereabouts.

## Warranty and Support

Whether you order a kit or use the build service, we do our best to test everything before shipping. If you discover an issue after unboxing, please reach out and we'll sort it out. For general firmware questions, please use the help-firmware discord channel. Other warranty and support services aren't provided.

We also encourage visiting the larger keyboard communities such as r/ErgoMechKeyboards, r/MechanicalKeyboards, [QMK](https://discord.gg/qmk) / [Low Profile Keyboards](https://discord.gg/j2ekqbkS) discord server.

## Refunds and Returns

### Cancellations

Please contact as soon as possible if you have any problems with your order or wish to cancel.

### Returns

Contact me within: 14 days of delivery.

Ship items back within: 30 days of delivery.

Buyers are responsible for return shipping costs. If the item is not returned in its original condition, the buyer is responsible for any loss in value.

::: danger NOTICE
Returns on keyboards that were not bought with hotswap sockets are not possible.
:::

## Wireless

I'd love to do wireless builds but there isn't official support for the pointing devices we use in ZMK. There are various efforts but those aren't confirmed to fully work or be power efficient.

## Low Profile vs. Choc

The difference between these two is the key spacing, i.e. how close the keys are to each other:

1. MX keyboards use a grid of 19x19mm squares. Some keyboards with choc switches also use this, which results in small gaps between keys.
1. Choc spacing uses 18x17mm squares, and produces a more tight arrangement with minimal key spacing. It is specifically designed for Kailh's choc switches (hence the name).

For choc keyboards, we differentiate these two styles of spacing by calling the former Low Profile and the latter Choc.

![key spacing](../guides/buyers-guide/spacing.jpg)

## New Keyboards

Every few months I will add new keyboards models or extend the ones already offered with new features. If you have a specific need that you think would also garner interest from others, feel free to reach out and I might be incentivized to go for that next.

## Firmware

### Can I Change Split Master

Yes, see [SPLIT_POINTING_ENABLE](https://docs.qmk.fm/#/feature_pointing_device?id=split-keyboard-configuration).

### Dual Pointing Devices

It is possible to use both a 2x trackballs or a trackball + trackpoint. Two trackpoints are currently not possible due to lack of support in QMK.

### Remapping Keys

With VIA, keys and layers can be changed without flashing the keyboard. Go to the VIA [web app](https://usevia.app/), or download the [desktop app](https://github.com/the-via/releases/releases). If you don't want to use VIA, please consult QMK docs on how to create your own keymap.

### Trackpoint Calibration

Most trackpoints move the same in all directions, but some may move slower in certain directions. This can be calibrated in firmware by modifying the movement in the misbehaving directions.

This code snippet is a simple solution that bumps the movement for a trackpoint that moves slower in the left and bottom directions. Adjust the multiplier and directions to your need:

```
#define PS2_MOUSE_MULTIPLIER 2

void ps2_mouse_moved_user(report_mouse_t *mouse_report) {
  // Moving left.
  if (mouse_report->x < 0) {
    mouse_report->x *= PS2_MOUSE_MULTIPLIER;
  }
  // Moving down.
  if (mouse_report->y > 0) {
    mouse_report->y *= PS2_MOUSE_MULTIPLIER;
  }
}
```

If this doesn't solve your problem, reach out.

