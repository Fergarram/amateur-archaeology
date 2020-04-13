<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/fergarram/amateur-archaeology">
    <img src="app-core/assets/title.png" alt="Amateur Archaeology Logo" width="232px" style="image-rendering: pixelated;">
  </a>

  <p align="center">
    A small game made for KaiOS devices, available in the KaiStore.
    <br />
    <br />
    <br />
    <a href="https://fernando.works/amateur-archaeology">View Demo</a>
    ·
    <a href="https://github.com/fergarram/amateur-archaeology/issues">Report Bug</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Building The Project](#building-the-project)
  * [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

I originally made this game for PC a few years ago for a game jam, you can take a look at it on [fergarram.itch.io](https://fergarram.itch.io/amateur-archaeology-iii).

I also wrote a devlog for this project which you can read at [dev.to/fergarram](dev.to/fergarram).

The game is written in ES6 using Canvas with a WebGL context. I didn't use any wrapper, library or framework for WebGL except for a math utility lib written by [webglfundamentals.org](https://webglfundamentals.org/).

The simulator was made using [Svelte](svelte.dev), and the device graphics were traced by hand using a photo of my real Banana Phone using Sketch.

I also created a [template](https://github.com/Fergarram/banana-app) for creating similarly-styled KaiOS apps which includes the source code for the simulator.

<!-- GETTING STARTED -->
## Building The Project

To get a local copy up and running follow these simple steps.

### Simulator And Bundling
For using the simulator and packaging the app you only need NPM:

```sh
git clone https://github.com/fergarram/amateur-archaeology.git

npm install

# Local server for the simulator (game included)
npm run dev

# Static files for the simulator (game included)
npm run build:sim

# KaiOS App Package (Develpment)
npm run build

# KaiOS App Package (Production)
npm run build:prod
```

### Using KaiOS Devices

If you want to run this on your real KaiOS device, you need to first enable development mode on it by dialing `*#*#33284#*#*`. You should be able to see a small bug icon on the status bar of your device.

Then, you need to make sure your device is detected by the adb tool:
```
> adb devices

List of devices attached
4939400 device
```

After making sure your device is connected, you need to run the following command to forward your devices debugging TCP port:
```
adb forward tcp:6000 localfilesystem:/data/local/debugger-socket
```

Open up Firefox 49.0 (Version is very important!) WebIDE and click on the "Remote Runtime" and then click ok when the popup message appears. Lastly, you select the app-package folder and simply click on the play button.

Setting up the environment for developing on for KaiOS can be tricky at first, you can take a look at this [article](https://nolanlawson.com/2019/09/22/the-joy-and-challenge-of-developing-for-kaios/) for more info on that, or read the official documentation at [developer.kaiostech.com](https://developer.kaiostech.com/).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

You can reach out to me through [LinkedIn](https://linkedin.com/in/fergarram), [Dev.to](dev.to/fergarram), or [Twitter](https://twitter.com/_fergarram_).


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/fergarram/amateur-archaeology.svg?style=flat-square
[contributors-url]: https://github.com/fergarram/amateur-archaeology/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/fergarram/amateur-archaeology.svg?style=flat-square
[forks-url]: https://github.com/fergarram/amateur-archaeology/network/members
[stars-shield]: https://img.shields.io/github/stars/fergarram/amateur-archaeology.svg?style=flat-square
[stars-url]: https://github.com/fergarram/amateur-archaeology/stargazers
[issues-shield]: https://img.shields.io/github/issues/fergarram/amateur-archaeology.svg?style=flat-square
[issues-url]: https://github.com/fergarram/amateur-archaeology/issues
[license-shield]: https://img.shields.io/github/license/fergarram/amateur-archaeology.svg?style=flat-square
[license-url]: https://github.com/fergarram/amateur-archaeology/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/fergarram