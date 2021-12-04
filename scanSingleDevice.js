noble = require('@abandonware/noble');

let bleRssi = 0;
//let peripheralIdOrAddress = hard.BLEMAC.toLowerCase();
//let peripheralIdOrAddress = "e6:4e:57:09:74:e4".toLowerCase(); //for debug
const peripheralIdOrAddress = process.argv[2].toLowerCase();
const filename = process.argv[3].toLowerCase();

const fs = require('fs');

var logger = fs.createWriteStream(filename+'.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

//1. make sure bluetooth is enabled in /boot/config.txt . should look like this:
//  #dtoverlay=pi3-disable-bt
//  (bluetooth uses UART for communication)
//2. sudo systemctl enable hciuart.service and reboot
//if those requirements are not met, any usage of noble will throw an error

if (peripheralIdOrAddress === "") 
{
  console.log(`BLE inactive. Bluetooth in /boot/config.txt disabled, hciuart.service not running, or MAC address not set`);
} else 
{
  //start BLE scan
  noble.on('stateChange', function (state) 
  {
    if (state === 'poweredOn') 
    {
      noble.startScanning([], true) //allows duplicates while scanning
    } else 
    {
      noble.stopScanning();
    }
  });

  //function constatly searches for the specified BLE MAC address, and captures its RSSI value
  noble.on('discover', function (peripheral) 
  {
    if (peripheral.id === peripheralIdOrAddress || peripheral.address === peripheralIdOrAddress) 
    {
        let date_ob = new Date();
        
        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();
        
        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();
        
        bleRssi = peripheral.rssi;
        
        let dataw = date + "." + month + "." + year + " " + hours + ":" + minutes + ":" + seconds + ";" + `${peripheralIdOrAddress}; RSSI; ${peripheral.rssi} ` + ' ';
        
        console.log(dataw);
        
        logger.write(dataw + "\r\n")


/*        fs.appendFile('file.log', dataw , err => 
        {
          if (err) 
          {
            console.error(err)
            return
          }
          //done!
        })

  */
        //console.log(`BLE update. Name:${peripheral.advertisement.localName} RSSI:${peripheral.rssi} txP:${peripheral.advertisement.txPowerLevel}`);
        //console.log(`${peripheralIdOrAddress}; RSSI; ${peripheral.rssi} `);
    }
  });
}
