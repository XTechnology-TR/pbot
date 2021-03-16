module.exports =
{
  type: 'video',
  title: 'How to limit CPU usage of a process in Linux',
  address: 'video.mp4',
  cover: 'terminal.png',
  body: 'How to limit CPU usage of a process in Linux using cpulimit.\n' +
    'Commands:\n' +
    '<mcode>\n' +
    'sudo apt-get install cpulimit\n' +
    'cpulimit -f -l 30 -- ffmpeg -i sample.webm sample.mkv -y\n' +
    'htop\n' +
    'man cpulimit\n' +
    '</mcode>\n',
  githubFileName: 'How to limit CPU usage of a process in Linux',
  refrences: [
    'https://lbry.tv/@mlibre:e/how-to-limit-cpu-usage-of-a-process-in:b'
  ],
  youtube: 'https://youtu.be/RWHSycGXYMQ',
  donate: { 'My ETH Address:': '0xc9b64496986E7b6D4A68fDF69eF132A35e91838e' },
  tags: [ 'linux', 'terminal', 'tutorial' ],
  minds: {
    status: true,
    link: 'https://www.minds.com/mlibre/blog/how-to-limit-cpu-usage-of-a-process-in-linux-1218488413947400192'
  },
  gab: {
    status: true,
    link: 'https://gab.com/mlibre/posts/105899098390630141'
  },
  wordpress: {
    status: true,
    link: 'https://mlibrego.wordpress.com/2021/03/16/how-to-limit-cpu-usage-of-a-process-in-linux/'
  },
  github: {
    status: true,
    link: 'https://github.com/mlibre/contents/blob/master/posts/How to limit CPU usage of a process in Linux.md'
  },
  filepath: 'users/mlibre/posts/How to limit CPU usage of a process in Linux/post.js',
  filename: 'post.js',
  folderPath: 'users/mlibre/posts/How to limit CPU usage of a process in Linux/'
}