const YoutubeMp3Downloader = require("youtube-mp3-downloader");

const YD = new YoutubeMp3Downloader({
  ffmpegPath: "/usr/bin/ffmpeg", // FFmpeg binary location
  outputPath: "./src/track", // Output file location (default: the home directory)
  youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
  queueParallelism: 2, // Download parallelism (default: 1)
  progressTimeout: 200, // Interval in ms for the progress reports (default: 1000)
  allowWebm: true, // Enable download from WebM sources (default: false)
});

const convert = (url, title) => {
  url = extractUrl(url);

  return new Promise((resolve, reject) => {
    YD.download(url, title);
    // YD.on("progress", (err, data) => {
    //   console.log(JSON.stringify(data));
    // });
    YD.on("finished", () => {
      console.log("Hemos finalizado");
      resolve(true);
    });

    YD.on("error", function (error) {
      console.log(error);
    });
  });
};

const extractUrl = (url) => {
  return url.split("watch?v=")[1];
};

module.exports.convert = convert;
