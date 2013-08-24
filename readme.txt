Linux nfc setup for ACR122 reader

Arch packages 

Debian packages - pcscd, pcsc-tools

libnfc

Needs a module blacklist file - place linux/configfiles/nfc.conf in /etc/modprobe.d/nfc.conf 
Needs usb permissions file - place linux/configfiles/42-pn53x.rules in /etc/udev/rules.d/.

Project Components

linux/checkin - linux nfc checkin for updates to nfcserver
nfcserver    - server for incoming NFC reads and database updates 

