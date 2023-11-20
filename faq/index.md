# FAQ

## About

holykeebs is a tiny store operated from Israel. I just like soldering.

We specialize in ergonomic split keyboards with pointing devices such as trackballs and trackpoints.

## Shipping

### Do you ship globally?

Yes, if you don't see your country in the shipping page, please contact us.

### What shipping methods are available?

Shipping to most countries is available with tracked or untracked options. Tracked packages usually take 10 to 15 days, with untracked taking around 30 days. Please do not use the untracked option if you're not willing to wait beyond 30 days, which can happen. Order cost / size may exclude the untracked option.

For select countries, the shipping methods may differ.

### My order's tracking has not been updating!

This can be a customs issue, port issues, parcel / postal system overload, and many more reasons we cannot influence. Please reach out after you have not seen an about for at least a week.

Once packages arrive in the destination, they will be delivered using the destination country's local postal service. Use the tracking number in the local systems to get detailed information on its whereabouts.

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

