# Ultimate Monero Mining Guide with Raspberry Pi
In this tutorial, we go through a complete guide for raspberry pi mining in 2021. We specifically focus on `Monero`, `XMR`, and generally any cryptocurrency that uses CPU-based algorithms like `RandomX`.

Table of content
====
* [Installing ubuntu on raspberry pi](#installing-ubuntu-on-raspberry-pi)
* [Enabling ssh](#enabling-ssh)
* [Turning on the raspberry pi](#turning-on-the-raspberry-pi)
* [Finding raspberry ip address](#finding-raspberry-ip-address)
* [Connecting to the headless RPI via ssh](#connecting-to-the-headless-rpi-via-ssh)
	* [Ubuntu](#ubuntu)
	* [Rasp Os](#rasp-os)
* [Packages And Settings](#packages-and-settings)
	* [Ubuntu Linux](#ubuntu-linux)
	* [Raspberry pi OS](#raspberry-pi-os)
	* [Manjaro](#manjaro)
	* [Common Settings](#common-settings)
* [Proton VPN](#proton-vpn)
	* [Installing via pip](#installing-via-pip)
	* [Manual installation](#manual-installation)
	* [Enabling Kill Switch](#enabling-kill-switch)
	* [Running](#running)
	* [Auto Connect](#auto-connect)
* [Nano](#nano)
* [PM2](#pm2)
* [HUGEPAGES](#hugepages)
* [Mining](#mining)
	* [Coins list](#coins-list)
	* [Wallet](#wallet)
	* [Miners List](#miners-list)
	* [Pools](#pools)
	* [Xmrig](#xmrig)
		* [Config file](#config-file)
	* [Monero mining](#monero-mining)
	* [uPlexa](#uplexa)
	* [Cpuminer-multi](#cpuminer-multi)
	* [Common errors](#common-errors)
* [Donation](#Donation)

## Installing ubuntu on raspberry pi
1. Download & Install *raspberry pi imager*  
Official: https://www.raspberrypi.org/software/  
Arch: https://aur.archlinux.org/packages/rpi-imager/
2. Open the `imager`
3. For the `operating system`, it's better to use `ubuntu LTS`.  
You can also try `Raspberry pi 64-bit full` if it's available the the menu.   
You can either use `imager` to download and install OS for you. or you can manually download and format it into sd card using `imager`  
Let's do it manually  
Download an `Ubuntu LTS` 64 bit:  
https://ubuntu.com/download/raspberry-pi  
https://downloads.raspberrypi.org/raspios_arm64/images/  
https://osdn.net/projects/manjaro-arm/storage/rpi4/  
4. In imager choose the image you just downloaded
5. Click on `write`  
6. Optionally you can cancel the `verify` process

## Enabling ssh
If you want to connect to your raspberry pi using `SSH`. you must enable it before you put the sdcard into the device.  
For `Ubuntu`, you don't have to do anything. it is enabled by default. But they may change it later or something else.  
For official `Raspberry Pi OS`, you must create an empty file named `ssh` in the system-boot partition
```bash
# cd system-boot partition path
touch ssh
```

## Turning on the raspberry pi
Now put the `sdcard` into your `RPI`.  
Let's say you have a modem. that is connected to your PC.  
Now connect your `RPI` to the modem as well using a LAN cable.  
Optionally, you can connect your `RPI` to a monitor via `HDMI` cable.  
When `RPI` is not connected to any screen, they call it `headless`.  
Turn it on

## Finding raspberry ip address
Your raspberry pi should have an IP address now. we need it to `SSH`.  
```bash
arp -na | grep -i "dc:a6:32"
# or
sudo nmap -sn 192.168.1.0/24
# Nmap scan report for ubuntu (192.168.1.137)
# Host is up (0.00043s latency).
# MAC Address: DC:A6:32:9A:EF:16 (Raspberry Pi Trading)
```
`192.168.1.137` is the IP.

## Connecting to the headless RPI via ssh
For ubuntu follow these commands:
### Ubuntu
```bash
ssh ubuntu@192.168.1.137
# password is ubuntu
passwd
# CTRL+D
```
```bash
# Using ssh keys, no password login
ssh-copy-id ubuntu@192.168.1.137
ssh ubuntu@192.168.1.137
```
```bash
# Adding user
# Replace `mlibre` with `YOUR USERNAME`
sudo adduser mlibre
sudo adduser mlibre sudo
# CTRL+D
ssh-copy-id mlibre@192.168.1.137
ssh mlibre@192.168.1.137
# To Forward X: ssh -Y mlibre@192.168.1.137
```

### Rasp Os
```bash
ssh pi@192.168.1.136
# yes
# default pass is raspberry
passwd
# adding user is same
```

## Packages And Settings
Now that we have our `RPI` up and running let's go for installing miners' usual dependencies

### Ubuntu Linux
```bash
# dpkg --get-selections | grep -o "^linux-image-$(uname -r)"
sudo apt update
sudo apt dist-upgrade
sudo apt install build-essential g++ gcc automake autoconf libcurl4-openssl-dev libssl-dev libjansson-dev autotools-dev libtool  opencl-headers cmake make zlib1g-dev ocl-icd-opencl-dev ocl-icd-dev clinfo libraspberrypi-dev clang clang-format clang-tidy unzip pkg-config libopenblas-dev liblapack-dev  openvpn resolvconf software-properties-common dialog python3-pip python3-setuptools libhwloc-dev libgmp-dev libgmpxx4ldbl linux-headers-raspi linux-source linux-image-raspi linux-raspi nodejs npm micro-httpd libmicrohttpd-dev  uthash-dev libncurses-dev locate
```
There was a bug in `ubuntu` configuring `hostname`. If you faced it as well, check if `/etc/hosts` has `127.0.0.1 ubuntu` line
```bash
cat /etc/hostname
# ubuntu
sudo nano /etc/hosts
# 127.0.0.1 ubuntu
sudo apt purge snapd
```

### Raspberry pi OS
```bash
sudo apt update
sudo apt dist-upgrade
sudo apt install build-essential g++ gcc automake autoconf libcurl4-openssl-dev libssl-dev libjansson-dev autotools-dev libtool  opencl-headers cmake make zlib1g-dev ocl-icd-opencl-dev ocl-icd-dev clinfo libraspberrypi-dev clang clang-format clang-tidy unzip pkg-config  libopenblas-dev liblapack-dev linux-source linux-headers-rpi openvpn resolvconf software-properties-common dialog python3-pip python3-setuptools libhwloc-dev libgmp-dev libgmpxx4ldbl nodejs npm micro-httpd  libmicrohttpd-dev  uthash-dev libncurses-dev locate
```

### Manjaro
```bash
sudo pacman -Syyuu
sudo pacman -Sy base-devel automake autoconf curl openssl-1.0 jansson libtool opencl-headers cmake ocl-icd opencl-mesa clinfo clang unzip libopenblas openblas lapack pkgconf linux-headers linux linux-raspberrypi-headers openvpn resolvconf dialog python python-pip 
python-setuptools hwloc gmp
# pacman -Fs libssl.so.1.0.0
# sudo pamac install libcurl-openssl-1.0 libgmp-static
```

### Common Settings
Probably for any `Linux` distro, if you want to run `commands` without a password, follow this:  
```bash
# Replace `mlibre` with `YOUR USERNAME`
sudo nano /etc/sudoers
%sys ALL=(ALL) NOPASSWD: ALL
mlibre ALL=(ALL) NOPASSWD: ALL
```

## Proton VPN
If you want to hide your ip from `pools`, `ISPs`, etc. `proton` is a good free choice.  
Website:  
> https://account.protonvpn.com/account


### Installing via pip
```bash
sudo pip3 install protonvpn-cli
# sudo pip3 install protonvpn-cli --upgrade
```

### Manual installation
```bash
git clone https://github.com/protonvpn/linux-cli
cd linux-cli
pip3 install -e .
```

### Enabling Kill Switch
`Kill switch` is a `proton` feature. it is disabled by default.  
When it is on, your device will only have access to the internet while `proton` is on.
```bash
sudo protonvpn init
# TCP
sudo protonvpn configure
# 5) Kill Switch
# 2) Enable Kill Switch (Allow access to/from LAN)
```

### Running
```bash
sudo protonvpn c --cc US -p tcp
# sudo protonvpn c
# US -> TCP
```

### Auto Connect
This script is for connecting proton automatically. not completed yet.  
Don't use it if you don't know what it is.
```bash
#!/bin/bash -xa
while true; do
status=`sudo protonvpn s | awk '{print $2}'| sed -n '1p'`
if [[ "$status" != "Connected" ]]; then
sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
sudo bash -c 'echo "nameserver 208.67.222.222" >> /etc/resolv.conf'
sudo bash -c 'echo "nameserver 208.67.220.220" >> /etc/resolv.conf'
sudo protonvpn c --cc US -p tcp
fi
echo "Already connected"
sleep 30;
done
```
```bash
bash proton.bash &
```

## Nano
`Nano` is a simple command-line text editor for `Linux`. You may want to enable `showing line numbers` for it.
```bash
sudo nano /etc/nanorc
set linenumbers
```

## PM2
`PM2` is the process manager we use to run, stop and mange the miner.
```bash
sudo npm install pm2 -g
```
To use `PM2` for miners simply:
```bash
pm2 start ./cpuminer
```
To add extra arguments, put them after `--`:
```bash
# LBRY, LBC full mining command example
pm2 start ./cpuminer -- -a lbry -o stratum+tcp://lbry.mine.zergpool.com:3334 -u bWD17xAjQuobTKeomKCJ8z2xE65NP7Nwkg -p c=LBC,mc=LBC
# uPlexa, UPX full mining command example
pm2 start ./xmrig --  -a cryptonight-upx/2 -o stratum+tcp://cryptonight_upx.mine.zergpool.com:4457 -u UPX1joaiif7WvPw3vJfPNQj5VRMwsUEptPeBMzDpbJLGYECwBL3ud7TNBZh7T1AtGtSDBh9wrhnoVeHd5CbXe47h4936xWKyhm --keepalive --max-cpu-usage=100 --donate-level 1 -p c=UPX,mc=UPX
```

Useful pm2 commands:
```bash
# 0 is process id you can find with pm2 lsit
pm2 list
pm2 logs
pm2 logs 0
pm2 show 0
pm2 del 0
pm2 restart 0
pm2 stop 0
p2m start 0
```

Running a miner without `PM2`
```bash
./xmrig -a rx/0 -o stratum+tcp://xmrvsbeast.com:4242 -u "42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b" --keepalive --max-cpu-usage=100
```

## HUGEPAGES
`HUGEPAGES` is a `Linux` kernel feature that boosts the `xmrig` mining speed.  
As far as I know, `Ubuntu` and `RPI OS` have not compiled the kernel with this feature. so if you want to have it, you probably need to recompile the kernel by yourself.  
Debian Wiki:
> https://wiki.debian.org/Hugepages  

I put the these commands here in case it was enabled for you.
```bash
sudo groupadd my-hugetlbfs
getent group my-hugetlbfs
# copy GID, 1002 in this example
# replace mlibr with YOUR USERNAME
sudo adduser mlibre my-hugetlbfs
sudo nano /etc/sysctl.conf
# vm.nr_hugepages = 256
# vm.hugetlb_shm_group = YOURGROUPGID
sudo nano /etc/fstab
# hugetlbfs /hugepages hugetlbfs mode=1770,gid=YOURGROUPGID 0 0
```

## Mining
Finally *mining* section :)  
For mining a coin there are generally 6 steps:
1. Choosing a cryptocurrency to mine. `XMR`
2. Creating a wallet for it the coin. `Exodus`
3. Finding the algorithm the crypto uses for mining. for example, `Monero` uses `RandomX` now
4. Finding a miner that is able to mine the algorithm. `xmrig`
5. Finding a pool. `https://xmrvsbeast.com`
6. Start the miner

### Coins list
You can find CPU-based coin or algorithm, pools information and etc here:
> https://miningpoolstats.stream  
> https://cointomine.today  

We go for `Monero`, that uses `RandomX` algorithm.

### Wallet
For wallet we use `Exodus`
> https://www.exodus.com/

Install, find and keep your `XMR` address.

### Miners List
There are lots of miners around. you can find by searching.  
There is also a list of miners in `minergate.com` with links.
> https://minergate.com/faq/how-minergate-console -> Alternative miners section

For `Monero`, `XMR` mining we will use `xmrig` miner
> https://github.com/xmrig/xmrig


### Pools
To find a pool for `Monero`, check here
> https://miningpoolstats.stream/monero  
Note that, you will only get paid for your hash rate and share if the pool finds a block!

We will use `https://xmrvsbeast.com` pool. because the minimum difficulty is `1000` that is good for RPI. 

### Xmrig
`Xmrig` is a high-performance miner for CPU and GPU. supporting more than 20 algorithms as I know.  
> https://github.com/xmrig/xmrig  

The miner will donate a minimum of 1% from what you mine to the developers or ...  
If you want to disable it read the comments on the following commands.

Now `ssh` to your raspberry pi
```bash
git clone https://github.com/xmrig/xmrig.git
cd xmrig
# For zero donation
# nano src/donate.h
# const int kDefaultDonateLevel = 0;
# const int kMinimumDonateLevel = 0;
# If you did it, remember that you probably should not add --donate-level 1 anymore
# like this: ./xmrig -a rx/0 -o stratum+tcp://xmrvsbeast.com:4242 -u "" --keepalive
mkdir build && cd build
cmake ..
make -j$(nproc)
```

#### Config file
Optionally to make a configuration file
> https://xmrig.com/wizard  

> config.json
```json
{
	"autosave": true,
	"donate-level": 1,
	"cpu": true,
	"opencl": false,
	"cuda": false,
	"pools": [
		{
        "url": "75.119.131.149:3333",
        "user": "42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b",
		  "algo": "rx/0",
        "pass": "mlibre",
        "keepalive": true,
        "nicehash": false,
        "variant": 1,
		  "tls": false
    	}
	]
}
```
To run via a config file:
```bash
./xmrig -c config.json
```

### Monero mining
the `xmrig` binary file is located where you compiled it. `~/xmrig/build`  
Go there
```bash
cd xmrig/build
```
Let's explain the options:
* `-a`: mining algorithm
* `-u`: username, that is usually can be your wallet address
* `-o`: pool address

For `xmrvsbeast` pool. put your wallet address, after `-u`. then run the command:
```bash
pm2 start ./xmrig -- -a rx/0 -o stratum+tcp://xmrvsbeast.com:4242 -u "YOUR WALLET ADDRESS" --keepalive --max-cpu-usage=100
```
For example with my wallet address:
```bash
# like this
pm2 start ./xmrig -- -a rx/0 -o stratum+tcp://xmrvsbeast.com:4242 -u "42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b" --keepalive --max-cpu-usage=100
```
If everything is ok you will have something like this:
```bash
 * ABOUT        XMRig/6.10.0 gcc/9.3.0
 * LIBS         libuv/1.34.2 OpenSSL/1.1.1f hwloc/2.1.0
 * HUGE PAGES   supported
 * 1GB PAGES    unavailable
 * CPU          ARM Cortex-A72 (1) 64-bit -AES
                L2:0.0 MB L3:0.0 MB 4C/4T NUMA:1
 * MEMORY       1.2/3.7 GB (33%)
 * DONATE       0%
 * POOL #1      stratum+tcp://xmrvsbeast.com:4242 algo rx/0
 * COMMANDS     hashrate, pause, resume, results, con
nection
 * OPENCL       disabled
 * CUDA         disabled
[2021-03-31 15:30:57.990]  net      use pool xmrvsbeast.com:4242  46.30.188.187
[2021-03-31 15:30:57.990]  net      new job from xmrvsbeast.com:4242 diff 1000 algo rx/0 height 2329132

[2021-03-31 15:30:57.990]  cpu      use argon2 implementation default
[2021-03-31 15:30:59.191]  randomx  init dataset algo rx/0 (4 threads) seed f456ce694015a95e...
[2021-03-31 15:30:59.191]  randomx  allocated 2336 MB (2080+256) huge pages 0% 0/1168 +JIT (1 ms)

[2021-03-31 15:31:33.905]  randomx  dataset ready (34713 ms)
[2021-03-31 15:31:33.905]  cpu      use profile  rx  (4 threads) scratchpad 2048 KB
[2021-03-31 15:31:33.912]  cpu      READY threads 4/4 (4) huge pages 0% 0/4 memory 8192 KB (7 ms)
[2021-03-31 15:31:35.629]  cpu      accepted (1/0) diff 1000 (145 ms)
[2021-03-31 15:31:36.960]  cpu      accepted (2/0) diff 1000 (144 ms)
```

More examples: 
```bash
./xmrig -o pool.xmrfast.com:3333 -u 42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b -k

pm2 start ./xmrig -- -a rx/0 -o stratum+tcp://randomx.mine.zergpool.com:4448 -u 42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b --keepalive --donate-level 1 -p c=XMR,mc=XMR

pm2 start ./xmrig -- -a rx/0 -o stratum+tcp://pool.supportxmr.com:3333 -u "42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b+10000" -p "mlibre" --keepalive --donate-level 1

pm2 start ./xmrig -- -a rx/0 -o stratum+tcp://xmrpool.eu:3333 -u "42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b.7000" --keepalive --donate-level 1 --max-cpu-usage=100
```

### uPlexa
`uPlexa` is another cryptocurreny for IOT devices.  
> https://www.uplexa.com/

```bash
git clone https://github.com/uPlexa/xmrig-upx.git
cmake .
make

./xmrig -a cryptonight-upx/2 -o stratum+tcp://cryptonight_upx.mine.zergpool.com:4457 -u UPX1joaiif7WvPw3vJfPNQj5VRMwsUEptPeBMzDpbJLGYECwBL3ud7TNBZh7T1AtGtSDBh9wrhnoVeHd5CbXe47h4936xWKyhm --keepalive --max-cpu-usage=100 --donate-level 1 -p c=UPX,mc=UPX
```

### Cpuminer-multi
A mienr that support `LBRY` algorithm.
```bash
git clone https://github.com/tpruvot/cpuminer-multi
./build.sh

./cpuminer -a lbry -o stratum+tcp://lbry.mine.zergpool.com:3334 -u bWD17xAjQuobTKeomKCJ8z2xE65NP7Nwkg -p c=LBC,mc=LBC

./cpuminer -a scrypt -o stratum+tcp://scrypt.mine.zergpool.com:3433 -u Niwop4wc1LBEBuB1XuydkiHKEw17sd6zrd -p c=NTBC,mc=NTBC,ID=mlibre

./cpuminer -a lbry -o stratum+tcp://lbry.mine.zergpool.com:3334 -u bWD17xAjQuobTKeomKCJ8z2xE65NP7Nwkg -p c=LBC,mc=LBC,ID=mlibre
```

#### Common errors
in case you got this:  
> stratum_recv_line failed  
> Stratum connection interrupted

It means the device is not mining fast enough. low hash rate

## Donation
If you wanted to suppoer me. there are lots of ways :)
* Fork, star my blockchain repo in [Github](https://github.com/mlibre/blockchain).
* Like, repost, donate this article
* My `XMR` wallet: `42YzwJ1a5QRdHiqTfDuRaWhVeY6WoBdaQ6BAAFT6vLGpBPJ8Hjj7f6KZMcd8S7YKkhjHp1FihDKr9F4NRq6mwDxjBiKME7b` 
* My `ETH` wallet: `0xc9b64496986E7b6D4A68fDF69eF132A35e91838e`

Thanks
