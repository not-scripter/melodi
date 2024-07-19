import { playlistData } from "@/constants";
import TrackPlayer, {
  Event,
  RepeatMode,
  Capability,
} from "react-native-track-player";

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    isSetup = true;

    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add(playlistData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemoteSeek, (to) => {
    TrackPlayer.seekTo(to.position);
  });
}
