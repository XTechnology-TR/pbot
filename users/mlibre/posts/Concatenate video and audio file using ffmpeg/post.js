module.exports =
{
  type: 'video',
  title: 'Concatenate video and audio file using ffmpeg',
  address: 'video.mp4',
  cover: 'terminal.png',
  body: 'Merge video and audio files with ffmpeg in Linux Terminal.\n' +
    'Commands:\n' +
    '<mcode>\n' +
    'nano input.txt\n' +
    '# input.txt content:\n' +
    "# file 'file_1.mkv'\n" +
    "# file 'file_2.mkv'\n" +
    'ffmpeg -f concat -i input.txt -c copy output.mkv\n' +
    '</mcode>',
  githubFileName: 'Concatenate video and audio file using ffmpeg',
  refrences: [
    'https://lbry.tv/@mlibre:e/concatenate-video-and-audio-file-using:a'
  ],
  youtube: 'https://youtu.be/e7-hAQO_fe0',
  donate: { 'My ETH Address:': '0xc9b64496986E7b6D4A68fDF69eF132A35e91838e' },
  tags: [ 'linux', 'terminal', 'tutorial' ],
  minds: {
    status: true,
    link: 'https://www.minds.com/mlibre/blog/concatenate-video-and-audio-file-using-ffmpeg-1218520860921970688'
  },
  gab: {
    status: true,
    link: 'https://gab.com/mlibre/posts/105899242044760948'
  },
  wordpress: {
    status: true,
    link: 'https://mlibrego.wordpress.com/2021/03/16/concatenate-video-and-audio-file-using-ffmpeg-2/'
  },
  github: {
    status: true,
    link: 'https://github.com/mlibre/contents/blob/master/posts/Concatenate video and audio file using ffmpeg.md'
  },
  filepath: 'users/mlibre/posts/Concatenate video and audio file using ffmpeg/post.js',
  filename: 'post.js',
  folderPath: 'users/mlibre/posts/Concatenate video and audio file using ffmpeg/'
}