#!/usr/bin/env python
from smartcard.System import readers
from smartcard.util import toHexString

class APU122LED:
    def __init__(self, connection):
        self.connection = connection
    # from APU122u datasheet (page 22)
    def _NFCControlLeds(self, red_start=None, green_start=None, red_end=None, green_end=None, t1=0, t2=0, repeat=0, buzz=False):
        ledstate = 0x00
        if red_end != None:
            ledstate |= red_start & 0x01
            ledstate |= (1 << 6) # set to blink
        if green_end != None:
            ledstate |= (green_start & 0x01) << 1
            ledstate |= (1 << 7) # set to blink
        if red_start != None:
            ledstate |= (red_start & 0x01) << 4
            ledstate |= (1 << 2) # set to update state
        if green_start != None:
            ledstate |= (green_start & 0x01) << 5
            ledstate |= (1 << 3) # set to update state
        LED = [0xff, 0x00, 0x40, ledstate, 0x04]
        duration_control = [t1, t2, repeat, buzz]
        print self.connection.transmit(LED + duration_control)

    def flash(self):
        self._NFCControlLeds(red_start=0, buzz=True, green_start=1, red_end=1, green_end=0, t1=1, t2=1, repeat=5)

    def setGreen(self):
        self._NFCControlLeds(red_start=0, green_start=1, t1=1, t2=1, repeat=10)

    def setRed(self):
        self._NFCControlLeds(red_start=1, green_start=0, t1=1, t2=1, repeat=10)

    def buzz(self):
        self._NFCControlLeds(buzzer=True, t1=1, t2=1)
    
    def setPresent(self, present):
        self.flash()
        if present:
            self.setGreen()
        else:
            self.setRed()

if __name__ == "__main__":
    r=readers()
    connection = r[0].createConnection()
    print type(r[0])
    connection.connect()
    LEDS = APU122LED(connection)
    LEDS.setPresent(True)
