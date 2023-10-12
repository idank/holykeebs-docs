# Troubleshooting

Below you will find some common problems with building a keyboard. Still having trouble? Reach out.

## Keys Not Working

The most common reason for a key not working is a bad solder joint, with diodes sitting at the top.

There is an important distiction to make: when a single key is not working, but the ones around it do work.

### Single Key

We will check that the diode is properly soldered, and that the switch is working.

#### Diode

The diode that this key is wired to could have a bad solder joint, the orientation of the diode could be wrong, or the diode is faulty (less likely).

1. Find the diode closest to the key. If you're not sure which one it is, inspect all of those around it.
1. Look at the diode for bad solder joints and that the orientation is correct. Fix if necessary.

#### Switch

If the diode looks fine and the key is still not responding, then the switch is probably not fully soldered or is improperly inserted into the hotswap socket.

::: tip
We can verify that the problem is with the switch by making a manual electrical connection of the switch. Take tweezers and touch the through-holes or hotswap sockets (choosing the one that is not used on your PCB) of the switch. If the key registers, the mechanical switch is at fault.
:::

1. If hotswaps are used, remove the switch and check for bent legs. Fix with pliers and reinsert.
1. If soldered, check that both through-holes are soldered. It's also possible one of the holes has a bent leg **with** solder, and simply doesn't form a connection. Remove the solder and redo this leg.

### Entire Row, Column

If an entire row or column is unresponsive, one of the controller pins is not fully soldered.

1. Look at the controller sockets from under the PCB. Check they are all fully soldered.
1. Do the same for the top side of the controller.

## Split Side Is Not Working

It's possible one of the controllers is faulty. A common cause is that the keyboard was powered, and the TRRS cable was connected / disconnected, which can cause shorts at the controller GPIO pins.

1. Unpower the keyboard and disconnect the halves.
1. Connect each side separately, if they work independently then try a different TRRS cable. Check that the TRRS jack is soldered properly.
1. Try swapping the controllers between the sides.

## Trackball Is Skipping

This happens on split keyboards with Sea Picros when only the master side is connected. Unpower it, connect the halves, and try again.