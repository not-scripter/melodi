import { playlistData } from "@/constants";
import { setActiveTrack } from "@/features/track/trackSlice";
import TrackPlayer, {
  Event,
  RepeatMode,
  Capability,
  AppKilledPlaybackBehavior,
} from "react-native-track-player";
import { useDispatch } from "react-redux";

export async function setupPlayer() {
  let isSetup = false;
  try {
    const res = await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    isSetup = true;

    console.log(res);
    return isSetup;

    // await TrackPlayer.getActiveTrackIndex();
    // isSetup = true;
  } catch (error) {
    console.log(error);
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
  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
    TrackPlayer.seekTo(position);
  });
  TrackPlayer.addEventListener(
    Event.PlaybackProgressUpdated,
    ({ track, position }) => {
      console.log(track.toString(), position.toString());
      console.log("playback proggress upfated");
      // dispatch(
      //   setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
      // );
    },
  );
}
