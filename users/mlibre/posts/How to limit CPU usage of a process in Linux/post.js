module.exports =
{
	type: "video",
	title: "How to overlay an audio file with an image file using ffmpeg and upload to youtube",
	address: "video.mp4",
	cover: "terminal.png",
	body: "How to upload an audio file to youtube using FFmpeg in Linux.\n" +
    "Adding an image file to an audio file and creating a video file.\n" +
    "Commands:\n" +
    "ffmpeg -loop 1 -i kid.jpg -i Tours.mp3 -c:v libx264 -strict experimental -b:a 256k -shortest out.mp4\n" +
    "  ",
	githubFileName: "How to overlay an audio file with an image file using ffmpeg and upload to youtube",
	refrences: [
		"https://lbry.tv/@mlibre:e/how-to-overlay-an-audio-file-with-an:b"
	],
	youtube: "https://youtu.be/oXEb8D8r0lw",
	donate: { "My ETH Address:": "0xc9b64496986E7b6D4A68fDF69eF132A35e91838e" },
	tags: [ "linux", "terminal", "tutorial" ],
	minds: {
		status: true,
		link: "https://www.minds.com/mlibre/blog/how-to-overlay-an-audio-file-with-an-image-file-using-ffmpeg-1218581973616730112"
	},
	gab: {
		status: true,
		link: "https://gab.com/mlibre/posts/105900202020297134"
	},
	wordpress: {
		status: true,
		link: "https://mlibrego.wordpress.com/2021/03/16/how-to-overlay-an-audio-file-with-an-image-file-using-ffmpeg-and-upload-to-youtube/"
	},
	github: {
		status: true,
		link: "https://github.com/mlibre/contents/blob/master/posts/How to overlay an audio file with an image file using ffmpeg and upload to youtube.md"
	},
	filepath: "users/mlibre/posts/How to limit CPU usage of a process in Linux/post.js",
	filename: "post.js",
	folderPath: "users/mlibre/posts/How to limit CPU usage of a process in Linux/"
};