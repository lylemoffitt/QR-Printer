
install:
	cp -nR etc /etc
	cp -nR www /var/www

clean:
	find etc -type f | xargs -I '{}' rm "/etc/{}"
	find www -type f | xargs -I '{}' rm "/var/www/{}"

apt-setup:
	sudo apt-get install avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan
	sudo apt install apache2

restart:
	sudo systemctl restart avahi-daemon
	sudo systemctl restart apache2
