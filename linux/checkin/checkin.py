#! /usr/bin/env python
"""
Sample script that monitors smartcard insertion/removal.

__author__ = "http://www.gemalto.com"

Copyright 2001-2010 gemalto
Author: Jean-Daniel Aussel, mailto:jean-daniel.aussel@gemalto.com

This file is part of pyscard.

pyscard is free software; you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation; either version 2.1 of the License, or
(at your option) any later version.

pyscard is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with pyscard; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
"""

from sys import stdin, exc_info
from time import sleep
import rfidiot
import urllib2, urllib

from smartcard.CardMonitoring import CardMonitor, CardObserver
from smartcard.util import *

METEOR_ROOT = "http://localhost:3000"
URL_NFC_INSERT  = METEOR_ROOT + "/nfcinsert"
URL_NFC_REMOVED = METEOR_ROOT + "/nfcremoved"

def URLRequest(url, params, method="GET"):
    if method == "POST":
        return urllib2.Request(url, data=urllib.urlencode(params))
    else:
        return urllib2.Request(url, + "?" + urllib.urlencode(params))

ireader = rfidiot.card
# a simple card observer that prints inserted/removed cards
class printobserver(CardObserver):
    """A simple card observer that is notified
    when cards are inserted/removed from the system and
    prints the list of cards
    """

    def update(self, observable, (addedcards, removedcards)):
        for card in addedcards:
            print "+Inserted: ", toHexString(card.atr)
            # now read an ID
            ireader.select()
            print "ID: " + ireader.uid
            # and do a presence post to our meteor server
            URL = URL_NFC_INSERT + '/' + ireader.uid
            result = urllib2.urlopen(URLRequest(URL, {}, method="POST")).read()
            print "URLREQ:", URL, result
        for card in removedcards:
            print "-Removed: ", toHexString(card.atr)
            result = urllib2.urlopen(URLRequest(URL_NFC_REMOVED, {}, method="POST")).read()
            print "URLREQ:", URL_NFC_REMOVED, result

try:
    print "Insert or remove a smartcard in the system."
    #print "This program will exit in 10 seconds"
    print ""
    cardmonitor = CardMonitor()
    cardobserver = printobserver()
    cardmonitor.addObserver(cardobserver)

    while True:
        sleep(10)

    # don't forget to remove observer, or the
    # monitor will poll forever...
    cardmonitor.deleteObserver(cardobserver)

except:
    print exc_info()[0], ':', exc_info()[1]
