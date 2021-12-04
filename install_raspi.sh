sudo apt-get update
sudo apt-get upgrade
sudo apt-get install bluetooth libbluetooth-dev pi-bluetooth bluez bluez-firmware -y
sudo usermod -G bluetooth -a pi
sudo python3 -m pip install pybluez
sudo systemctl start bluetooth.service