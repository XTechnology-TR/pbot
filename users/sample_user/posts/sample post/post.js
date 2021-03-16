module.exports =
{
	type: "video",
	title: "Advance Tips to Increase Linux Mint Speed 2019",
	address: "video.mp4",
	cover: "terminal.png",
	body: `Speed Up Linux with advanced tips.
Commands:
<mcode>
sudo nano /etc/sysctl.conf
# vm.swappiness=10
sudo nano /etc/default/grub
# GRUB_CMDLINE_LINUX_DEFAULT="quiet splash profile"
sudo update-grub2
sudo apt-get purge rsyslog
sudo nano /etc/systemd/journald.conf
ReadKMsg=no
# .....
sudo nano /etc/modprobe.d/nowatchdog.conf
# blacklist iTCO_wdt
</mcode>
`,
	githubFileName: "",
	refrences: [
		"https://lbry.tv/@mlibre:e/advance-tips-to-increase-linux-mint:9"
	],
	youtube: "https://www.youtube.com/watch?v=X5OOXvSgSiU",
	donate: { "My ETH Address:": "0xc9b64496986E7b6D4A68fDF69eF132A35e91838e" },
	tags: [ "linux", "terminal", "tutorial" ],
	minds: {
		status: false,
		link: "https://www.minds.com/mlibre/blog/how-to-install-nodejs-in-android-using-termux-1217811823210479616"
	},
	gab: {
		status: false,
		link: "https://gab.com/mlibre/posts/105888205212811566"
	},
	wordpress: {
		status: false,
		link: "https://mlibrego.wordpress.com/2021/03/14/how-to-install-nodejs-in-android-using-termux/"
	},
	github: {
		status: false,
		link: "https://github.com/mlibre/contents/blob/master/posts/How to install Nodejs in android using Termux.md"
	},
	filepath: "users/mlibre/posts/How to install Nodejs in android using Termux/post.js",
	filename: "post.js",
	folderPath: "users/mlibre/posts/How to install Nodejs in android using Termux/"
};