const app = require("express")();
const mp3 = require("./controllers/save-mp3");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const uniqid = require("uniqid");
require("dotenv").config();
require("./connection");
const Lyrics = require("./models/Lyrics");
const Test = require("./models/Test");
const Dictionary = require("./models/Dictionary");
const PORT = 8080;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/save", (req, res) => {
  const soundName = uniqid();

  const lyrics = new Lyrics({
    title: req.body.title,
    soundName: `${soundName}.mp3`,
    url: req.body.url,
    lyrics: req.body.lyrics,
  });

  mp3.convert(req.body.url, `${soundName}.mp3`).then((resp) => {
    lyrics
      .save()
      .then((_) => {
        res.json({
          status: 200,
          lyrics: req.body.lyrics,
        });
      })
      .catch((err) => {
        res.json({ error: "Hemos experimentado un error", error: err });
      });
  });
});

app.get("/sound", async (req, res) => {
  const sounds = await Lyrics.find({});
  res.json({
    sounds,
  });
});

// test ##########################################################################################

app.post("/test", async (req, res) => {
  const test = await new Test();
  test.dpto = req.body.dpto;
  test.city = req.body.city;
  test.country = req.body.country;

  test.children.push({
    name: req.body.children.name,
    age: req.body.children.age,
  });

  test
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/test/addsub", async (req, res) => {
  const test = await Test.findOne({ _id: req.body.id });
  test.children.push({
    name: req.body.name,
    age: req.body.age,
  });

  test
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/test/get/:id", async (req, res) => {
  const test = await Test.findOne({ _id: req.params.id });
  const doc = await test.children.id("60aec45d809992035bfbdd0d");

  doc.name = "Maria Azucena";
  doc.age = 1.5;

  await test
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => console.log(err));
});

app.post("/test/remove", async (req, res) => {
  const test = await Test.deleteOne({ _id: req.body.id });
  const status = test.deletedCount > 0 ? true : false;
  res.json({ status });
});

// Fin de test ###################################################################################

app.post("/sound/track-data", async (req, res) => {
  const track = await Lyrics.find({ _id: req.body.id });
  return res.json({
    trackData: track[0],
  });
});

app.post("/sound/remove", async (req, res) => {
  const test = await Lyrics.deleteOne({ _id: req.body.id });
  const status = test.deletedCount > 0 ? true : false;
  res.json({ status });
});

app.post("/sound/update-lyrics/:id", async (req, res) => {
  const speech = await Lyrics.findOne({ _id: req.body.id });
  speech.tracks.push({
    eng: req.body.english,
    spa: req.body.spanish,
    mStart: req.body.mStart,
    mEnd: req.body.mEnd,
  });
  await speech.save();
  return res.json({
    trackData: speech,
  });
});

app.get("/sound/update-lyrics/:id", async (req, res) => {
  const speech = await Lyrics.find({ _id: req.params.id });
  console.log(speech);
});

app.post("/sound/update-chunk", async (req, res) => {
  const speech = await Lyrics.findOne({ _id: "60a1a8c0af285200313cbaf6" });
  const algo = await speech.tracks.id(req.body.id);
  console.log(algo);
  return res.json({
    data: "tu data",
  });
});

app.get("/sound/:id", async (req, res) => {
  try {
    const track = await Lyrics.find({ _id: req.params.id });
    const audioPath = `./src/track/${track[0].soundName}`;
    trackData = track[0];
    const audioSize = fs.statSync(audioPath).size;

    const start = 0;
    const end = Math.min(start + audioSize, audioSize - 1);

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}}/${audioSize}`,
      "Accept-Ranges": `bytes`,
      "Content-Length": contentLength,
      "Content-Type": `audio/mpeg`,
    };
    res.writeHead(200, headers);
    const audioStream = fs.createReadStream(audioPath);
    audioStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

app.post("/dictionary/save-word", async (req, res) => {
  const dictionary = new Dictionary({
    infinitive: req.body.infinitive,
    infinitivo: req.body.infinitivo,
    pastWord: req.body.pastWord,
    pasado: req.body.pasado,
    pastParticiple: req.body.pastParticiple,
    pasadoParticipio: req.body.pasadoParticipio,
  });

  dictionary
    .save()
    .then((_) => {
      res.json({
        status: 200,
        lyrics: req.body,
      });
    })
    .catch((err) => {
      res.json({ error: "Hemos experimentado un error", error: err });
    });
});

app.get("/dictionary/getAll", async (req, res) => {
  const data = await Dictionary.find({});

  return res.json({
    data,
  });
});

app.listen(PORT, () => {
  console.log("Escuchando en el puerto", PORT);
});
