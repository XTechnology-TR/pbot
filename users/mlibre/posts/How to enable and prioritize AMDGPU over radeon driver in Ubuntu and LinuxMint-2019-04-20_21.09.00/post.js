module.exports =
{
	"type": "video",
	"title": "How to enable and prioritize AMDGPU over radeon driver in Ubuntu, Linuxmint or Debian",
	"address": "video.mp4",
	"cover": "terminal_os.png",
	"body": "How to enable and prioritize AMDGPU over Radeon driver in Ubuntu and LinuxMint.\n\tCommands:\n\tsudo nano /etc/default/grub\n\t# radeon.cik_support=0 amdgpu.cik_support=1 radeon.si_support=0 amdgpu.si_support=1\n\tsudo nano /etc/modprobe.d/amdgpu.conf\n\t# options amdgpu si_support=1\n\t# options amdgpu cik_support=1\n\tsudo nano /etc/modprobe.d/radeon.conf\n\t# options radeon si_support=0\n\t# options radeon cik_support=0\n\tsudo update-grub2\n\t# If system/Linux didn't come up, Just edit the grub in the startup by pressing E, and delete the added part, and press CTRL + X to start with edited grub.",
	"refrences": [
		"https://lbry.tv/@mlibre:e/how-to-enable-and-prioritize-amdgpu-over:2"
	],
	"youtube": "https://www.youtube.com/watch?v=Mr_UFL5ZeKQ",
	"githubFileName": "How to enable and prioritize AMDGPU over radeon driver in Ubuntu, Linuxmint or Debian",
	"donate": {
		"ETH": "0xc9b64496986E7b6D4A68fDF69eF132A35e91838e"
	},
	"tags": [
		"linux",
		"terminal",
		"tutorial"
	],
	"minds": {
		"status": true,
		"link": "https://www.minds.com/mlibre/blog/how-to-enable-and-prioritize-amdgpu-over-radeon-driver-in-ub-1217460514288381952"
	},
	"gab": {
		"status": true,
		"link": "https://gab.com/mlibre/posts/105882671915159948"
	},
	"wordpress": {
		"status": true,
		"link": "https://mlibrego.wordpress.com/2021/03/13/how-to-enable-and-prioritize-amdgpu-over-radeon-driver-in-ubuntu-linuxmint-or-debian/"
	},
	"github": {
		"status": true,
		"link": "https://github.com/mlibre/contents/blob/master/posts/How to enable and prioritize AMDGPU over radeon driver in Ubuntu, Linuxmint or Debian.md"
	},
	"filepath": "users/mlibre/posts/How to enable and prioritize AMDGPU over radeon driver in Ubuntu and LinuxMint-2019-04-20_21.09.00/post.js",
	"filename": "post.js",
	"folderPath": "users/mlibre/posts/How to enable and prioritize AMDGPU over radeon driver in Ubuntu and LinuxMint-2019-04-20_21.09.00/"
}