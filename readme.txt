Linux nfc setup for ACR122 reader

Arch packages 

Debian packages - pcscd, pcsc-tools

libnfc

Needs a module blacklist file - place linux/configfiles/nfc.conf in /etc/modprobe.d/nfc.conf 
Needs usb permissions file - place linux/configfiles/42-pn53x.rules in /etc/udev/rules.d/.

Project Components

linux/checkin - linux nfc checkin for updates to nfcserver (IGNORE - NOT WORKING)
nfcserver    - server for incoming NFC reads and database updates 
linux/ruby - working interface that controls LEDs on insert - NOTE: on archlinux blacklist modules and pcsc_scan is required to kick pcscd into life
