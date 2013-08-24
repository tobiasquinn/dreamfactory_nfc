Linux nfc setup for ACR122 reader

Needs a module blacklist file - place in /etc/modprobe.d/nfc.conf with the lines:

===
blacklist nfc
blacklist pn533
===

Project Components

nfcserver - server for incoming NFC reads and database updates

