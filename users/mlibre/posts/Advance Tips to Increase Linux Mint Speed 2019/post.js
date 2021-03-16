module.exports =
{
  type: 'video',
  title: 'Advance Tips to Increase Linux Mint Speed 2019',
  address: 'video.mp4',
  cover: 'terminal.png',
  body: 'Speed Up Linux with advanced tips.\n' +
    'Commands:\n' +
    '<mcode>\n' +
    'sudo nano /etc/sysctl.conf\n' +
    '# vm.swappiness=10\n' +
    'sudo nano /etc/default/grub\n' +
    '# GRUB_CMDLINE_LINUX_DEFAULT="quiet splash profile"\n' +
    'sudo update-grub2\n' +
    'sudo apt-get purge rsyslog\n' +
    'sudo nano /etc/systemd/journald.conf\n' +
    'ReadKMsg=no\n' +
    '# .....\n' +
    'sudo nano /etc/modprobe.d/nowatchdog.conf\n' +
    '# blacklist iTCO_wdt\n' +
    '</mcode>\n',
  refrences: [ 'https://lbry.tv/@mlibre:e/advance-tips-to-increase-linux-mint:9' ],
  youtube: 'https://www.youtube.com/watch?v=X5OOXvSgSiU',
  donate: { 'My ETH Address:': '0xc9b64496986E7b6D4A68fDF69eF132A35e91838e' },
  tags: [ 'linux', 'terminal', 'tutorial' ],
  minds: {
    status: true,
    link: 'https://www.minds.com/mlibre/blog/advance-tips-to-increase-linux-mint-speed-2019-1217898893506523136'
  },
  gab: {
    status: true,
    link: 'https://gab.com/mlibre/posts/105889520194264859'
  },
  wordpress: {
    status: true,
    link: 'https://mlibrego.wordpress.com/2021/03/14/advance-tips-to-increase-linux-mint-speed-2019/'
  },
  github: {
    status: true,
    link: 'https://github.com/mlibre/contents/blob/master/posts/Advance Tips to Increase Linux Mint Speed 2019.md'
  },
  filepath: 'users/mlibre/posts/Advance Tips to Increase Linux Mint Speed 2019/post.js',
  filename: 'post.js',
  folderPath: 'users/mlibre/posts/Advance Tips to Increase Linux Mint Speed 2019/',
  githubFileName: 'Advance Tips to Increase Linux Mint Speed 2019'
}