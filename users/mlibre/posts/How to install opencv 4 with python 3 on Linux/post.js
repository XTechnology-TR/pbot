module.exports =
{
  type: 'video',
  title: 'How to install OpenCV 4 with python 3 on Ubuntu 18.04, Linux Mint 19',
  address: 'video.mp4',
  cover: 'terminal.png',
  body: 'Install OpenCV 4 with Python 3 on Ubuntu 18.04, Linux Mint 19.\n' +
    'Commands:\n' +
    '<mcode>\n' +
    'mkdir ~/opencv_install\n' +
    'cd opencv_install\n' +
    'sudo apt-get update \n' +
    'sudo apt-get dist-upgrade\n' +
    'sudo apt purge libx264-dev x264\n' +
    'sudo apt-get install build-essential cmake pkg-config libjpeg8-dev libtiff5-dev libpng12-0\n' +
    'sudo apt install v4l-utils libv4l-dev libgphoto2-dev libgstreamer1.0-0 libgstreamer1.0-dev x264\n' +
    'cd /usr/include/linux/\n' +
    'sudo ln -s -f ../libv4l1-videodev.h videodev.h\n' +
    'cd ~/opencv_install\n' +
    'sudo apt install libavcodec-dev libavformat-dev libswscale-dev libxvidcore-dev \n' +
    'sudo apt install libgtk-3-dev libatlas-base-dev gfortran python3.6-dev python2.7-dev libtiff-dev\n' +
    '@ install pip\n' +
    'aria2c "https://bootstrap.pypa.io/get-pip.py"\n' +
    'sudo python3 get-pip.py\n' +
    'sudo pip install numpy\n' +
    'sudo pip3 install numpy\n' +
    'aria2c "https://github.com/opencv/opencv/archive/4.0.1.zip"\n' +
    'aria2c "https://github.com/opencv/opencv_contrib/archive/4.0.1.tar.gz"\n' +
    'tar xvf opencv_contrib-4.0.1.tar.gz\n' +
    'mkdir opencv\n' +
    'cd opencv/\n' +
    'cp ../opencv-4.0.1.zip .\n' +
    'unzip opencv-4.0.1.zip\n' +
    'cd opencv-4.0.1/\n' +
    'mkdir build\n' +
    'cd build\n' +
    'cmake -D CMAKE_BUILD_TYPE=RELEASE -D WITH_V4L=ON -D CMAKE_INSTALL_PREFIX=/usr/local -D INSTALL_PYTHON_EXAMPLES=ON  -D INSTALL_C_EXAMPLES=OFF -D PYTHON_EXECUTABLE=/usr/bin/python3.6  -D BUILD_EXAMPLES=ON -D OPENCV_EXTRA_MODULES_PATH=../../../opencv_contrib-4.0.1/modules ..\n' +
    'make -j4\n' +
    'make\n' +
    'sudo make install\n' +
    'sudo ldconfig\n' +
    'python3.6\n' +
    'import cv2\n' +
    'cv2.__version__\n' +
    '</mcode>',
  githubFileName: 'How to install OpenCV 4 with python 3 on Ubuntu 18.04, Linux Mint 19',
  refrences: [
    'https://lbry.tv/@mlibre:e/how-to-install-opencv-4-with-python-3-on:2'
  ],
  youtube: 'https://youtu.be/FDjsLK9M6Sc',
  donate: { 'My ETH Address:': '0xc9b64496986E7b6D4A68fDF69eF132A35e91838e' },
  tags: [ 'linux', 'terminal', 'tutorial' ],
  minds: {
    status: true,
    link: 'https://www.minds.com/mlibre/blog/how-to-install-opencv-4-with-python-3-on-ubuntu-18-04-linux-1218575735996870656'
  },
  gab: {
    status: true,
    link: 'https://gab.com/mlibre/posts/105900124722900914'
  },
  wordpress: {
    status: true,
    link: 'https://mlibrego.wordpress.com/2021/03/16/how-to-install-opencv-4-with-python-3-on-ubuntu-18-04-linux-mint-19/'
  },
  github: {
    status: true,
    link: 'https://github.com/mlibre/contents/blob/master/posts/How to install OpenCV 4 with python 3 on Ubuntu 18.04, Linux Mint 19.md'
  },
  filepath: 'users/mlibre/posts/How to install opencv 4 with python 3 on Linux/post.js',
  filename: 'post.js',
  folderPath: 'users/mlibre/posts/How to install opencv 4 with python 3 on Linux/'
}