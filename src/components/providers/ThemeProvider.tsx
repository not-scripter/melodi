import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import ImageColors from "react-native-image-colors";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import TrackPlayer, { Event } from "react-native-track-player";

export interface ThemeProps {
  colors: ImageColorsResult | undefined;
}

const defaultValue: ThemeProps = {
  colors: undefined,
};
const ThemeContext = createContext(defaultValue);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [colors, setcolora] = useState<ImageColorsResult>();

  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    ({ track }) => {
      ImageColors.getColors(track?.artwork!, {
        fallback: "#ff0000",
        cache: true,
        key: track?.artwork,
        quality: "highest",
      }).then((res) => setcolora(res));
    },
  );

  return (
    <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
