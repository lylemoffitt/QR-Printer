# QR-Printer
Repo for the QR Printer project (Seiko 620)

## Architecture

- [App Flow](https://docs.google.com/drawings/d/1xHcQSQ6CcyHGZk_U3YU-Qx018DHgyaPB8OSNnjzEFc0/edit?usp=sharing)


## Apache Server Setup

Install
```
sudo apt install apache2
```




## mDNS Setup

Install
```
sudo apt-get install avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan

```

Service restart
```
 sudo systemctl restart avahi-daemon
```