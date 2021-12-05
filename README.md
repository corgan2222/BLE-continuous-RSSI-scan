## BLE-continuous-RSSI-scan

Standalone feature for a continious RSSI capture of a specified MAC address device.
Saves the RSSI Data into a Log File.

the code relies on the module "@abandonware/noble" https://github.com/abandonware/noble   
tested on Raspberry Pi3A+ and a Raspberry Zero 2. It's based on one of abandonware's examples.
Code based on https://github.com/efeuentertainment/BLE-continuous-RSSI-scan

# Installation on a Raspberry Pi or Raspberry Zero:

1) clone Repo
```bash
git clone https://github.com/corgan2222/BLE-continuous-RSSI-scan 
cd BLE-continuous-RSSI-scan
```

2) if not installed install NodeJS 12
```bash
./installNodeJS.sh
```

3) Install Bluetooth dependencies
```bash
sudo ./install_raspi.sh
```

4) Install @abandonware/noble and its dependencies   
```javascript
npm install @abandonware/noble
```

5) make sure bluetooth is enabled in /boot/config.txt . the line should look like this:   
```bash
#dtoverlay=pi3-disable-bt
```
(bluetooth uses UART for communication)

7) enable the required service
```bash
sudo systemctl enable hciuart.service
```
8) reboot (starting the hciuart service manually often fails)

if those requirements are not met, any usage of noble will throw an error

# Usage:

## Scan the Network for the BLE Device you look for

```bash
node scanNetwork.js   
```

If you have trouble to find your Device, try the findBLE.sh. If you found the Device you are looking for, copy the MAC and run 

```bash
node scanSingleDevice.js BLE-MAC filename.log  
```
to continuously output your device's RSSI


