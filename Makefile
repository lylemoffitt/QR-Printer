
install:
	cp -fR etc/avahi /etc/
	cp -fR www/html /var/www/

clean:
	find etc/ -type f | xargs -I '{}' rm "/{}"
	find www/ -type f | xargs -I '{}' rm "/var/{}"

apt-setup:
	apt-get install avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan
	apt install apache2

restart:
	systemctl restart avahi-daemon
	systemctl restart apache2
