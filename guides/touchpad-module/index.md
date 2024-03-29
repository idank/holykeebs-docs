<script setup>
import Images from '../../components/Images.vue';

import shieldorientation1 from './shield-orientation-1.jpg';
import shieldorientation2 from './shield-orientation-2.jpg';

import mountbottomscrewed1 from './mount-bottom-screwed-1.jpg';
import mountbottomscrewed2 from './mount-bottom-screwed-2.jpg';

import topmounton1 from './top-mount-on-1.jpg';
import topmounton2 from './top-mount-on-2.jpg';
</script>

# Touchpad Module

The touchpad module consists of a small adapter PCB (shield) that sits on a top mounted controller, and creates the necessary connections to easily use the Cirque 35mm touchpad.

![corne with touchpad](./result-top.jpg)

## Tools

In addition to a soldering iron, you will need an M2 hex key and a bit of super glue.

## Controller

See the [Controllers section](/guides/keyboard/#controllers) in the more general purpose keyboard build guide.

If you have an existing controller, skip this step.

## Module

The module comes with the following parts:

- 35mm touchpad
- adapter PCB (either left or right sided)
- 12-pin, 0.5 pitch FFC cable
- 3d printed mount
- 2 x 3mm M2 screws to fasten mount to adapter PCB

![kit contents](./kit.jpg)

First, we solder the adapter PCB to the controller.

### Step 1

The adapter PCB in your kit is specific to the side you want to use the touchpad on. The top side is the side with the FFC connector:

![adapter pcb top view](./adapter-pcb-top-view.jpg)

Position the PCB on the controller, check that it sits straight. If you're struggling to get it to sit straight, check if you have blobs of solder on the controller headers. If this is indeed the problem, you can try to remove the solder so it doesn't get in the way, or put a 1mm spacer piece between the controller and adapter PCB (if you have a 3d printer, [here's a simple 1mm one](https://github.com/idank/keyboards/blob/main/printed-cases/1mm_spacer.stl) I use, scale Z down/up as necessary).

<Images :paths="[shieldorientation1, shieldorientation2]" />

### Step 2

There are 2 pins to solder on each column. Add a bit of solder to one of the pins on each column while holding it with your finger, locking the PCB in place. Check that it's indeed straight. Finish soldering all 4 but avoid overdoing it resulting in a ball of solder that later interfere with 3d printed mount.

![soldered adapter pcb](./soldered-adapter-pcb.jpg)

### Step 3

Let's get the soldering part out of the way by getting the touchpad to speak I2C (by default it speaks SPI). Take it out, components side facing you. We need to remove this resistor:

![resistor before removal](./resistor-before.jpg)

Add a bit of solder to the tip of the iron, and touch both pads of the resistor simultaneously for a few seconds and it should pop out.

![resistor after removal](./resistor-after.jpg)

Soldering part done! 👏

### Step 4

Connect the FFC cable to the connector on the adapter PCB (note which side of the cable is facing up):

![ffc cable connected](./ffc-cable-connected.jpg)

### Step 5

Next, we screw to bottom half of the 3d printed mount to the adapter PCB. If the controller is mounted on a PCB which doesn't let you access the bottom side of the screw holes, you may need to remove it: **do not take it out by pulling on the adapter PCB**. Use the back side of tweezers and push the underside of the controller from both ends, switching back and forth until it pops out.

The screw holes in the 3d printed piece are small such that screwing into them will hold the screws firmly in place.

<Images :paths="[mountbottomscrewed1, mountbottomscrewed2]" />

Finish by pulling the FFC cable through the middle slot.

### Step 6

We're going to secure the touchpad to the adapter PCB. Position it on the 3d printed piece that is screwed to the adapter PCB, with the connector going into the slot.

![touchpad on mount](./touchpad-on-mount.jpg)

The remaining 3d printed piece has small notches that match the notches on the touchpad and protrusions on the bottom half of the mount:

![top mount notches](./top-mount-notches.jpg)

 Put the two together and rotate the top piece until there's no gap between the two.

<Images :paths="[topmounton1, topmounton2]" />

 Now that you know how to close it up, take some super glue and put a few small dabs on the perimeter of the bottom 3d printed piece, and press the top piece into it.

### Step 7

Finally, connect the cable to the touchpad connector:

![cable connected](./cable-connected.jpg)

### Step 8

Done! Head over to [Firmware](/firmware/) to flash your controller with touchpad support.

![module](./result.jpg)
