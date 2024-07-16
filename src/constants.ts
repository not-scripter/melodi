import { Track } from "react-native-track-player";

export const playlistData: Track[] = [
  {
    id: 1,
    title: "Maan Meri Jaan",
    artist: "King",
    album: "Champagne Talk",
    artwork:
      "https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500.jpg",
    url: require("../assets/audio/one.mp3"),
  },
  {
    id: 2,
    title: "Raataan Lambiyan",
    artist: "Tanishk Bagchi, Asees Kaur",
    album: "Shershaah",
    artwork:
      "https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg",
    url: require("../assets/audio/two.mp3"),
  },
  {
    id: 3,
    title: "Spirit of Fighter",
    artist: "Hritik Roshan",
    album: "Fighter",
    artwork:
      "https://c.saavncdn.com/187/Spirit-Of-Fighter-Hindi-2023-20230815052231-500x500.jpg",
    url: require("../assets/audio/three.mp3"),
  },
  {
    id: 4,
    title: "Team Side",
    artist: "Alan Walker",
    album: "RCB",
    artwork:
      "https://c.saavncdn.com/258/Team-Side-Feat-Rcb-English-2024-20240313152735-500x500.jpg",
    url: require("../assets/audio/four.mp3"),
  },
];
