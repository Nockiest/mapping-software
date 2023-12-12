"use client";
import React, {
  useRef,
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import CanvasToImage from "../components/utility/CanvasToImg";
import CanvasEditor from "./CanvasEditor";
import CanvasSettings from "./settings/CanvasSettings";
import DebugInfo from "../components/global/Debugger";
import Timeline from "./Timeline";
import {
  CanvasContext,
  CanvasProvider,

  useCanvas,
  useGlobalValue,
} from "./CanvasContext"; //CanvasSettingsContext
import { editorTopLeftPosition, markers, settings } from "./Signals";
import LayerSplicer from "../components/utility/LayerSplicer";
import { Button, Typography, Paper } from '@mui/material';
import { Vector2 } from "@/public/types/GeometryTypes";
import { theme } from "./theme/theme";
import { ThemeProvider, createTheme} from "@mui/material"
import DiscordInviteBtn from "../components/global/DiscordInviteBtn";
// import { MousePositionContext, MousePositionProvider } from "./MouseContext";
import {InlineFollowButtons} from 'sharethis-reactjs';

const Page: React.FC = () => {
  const {   canvasRef, frontlineCanvasRef, markerCanvasRef,backgroundCanvasRef } =
    useCanvas();

  const { GlobalData, updateGlobalData } = useGlobalValue();
  const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState<number | null>(
    null
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const handleMouseDown = (e:  MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault();
    }
    setMouseDownTimeStamp(Date.now());
  };

  const handleMouseUp = (e:  MouseEvent) => {
    e.preventDefault();

    // Using requestAnimationFrame to delay the execution until the next frame
    requestAnimationFrame(() => {
      setElapsedTime(0);
      setMouseDownTimeStamp(null);
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp, true)
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp, true);
    };
  }, []);

  useEffect(() => {
    // Update elapsed time while the button is pressed
    if (mouseDownTimeStamp !== null) {
      const intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 100);
        updateGlobalData("mouseDownTime", elapsedTime + 100); // Use the current state value directly
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [mouseDownTimeStamp, elapsedTime]);

  useEffect(() => {
    updateGlobalData("mouseDownTime", elapsedTime); // Use the current state value directly
  }, [elapsedTime]);

  return (
    <  >
      {/* <DebugInfo
        data={{
          // radius: settings.value.radius,
          // canvasState: canvasState,
          // color: settings.value.color,
          // layer: settings.value.activeLayer,
          mousePosition: GlobalData.mousePosition,
          relativePosition: GlobalData.editorRelativePosition,
          mousDownTime: elapsedTime,
          TopLeftOffset: editorTopLeftPosition,

          // markerImage: markerSettings.value.imageURL
          // activeFrontLine: frontLineSettings.value.activeFrontline?.idNum,

        }}
      /> */}
      <CanvasSettings />
      <CanvasEditor />
      {/* <InlineFollowButtons
        //   config={{
        //     action: 'Follow us:', // call to action (STRING)
        //     action_enable: true,  // show/hide call to action (true, false)
        //     action_pos: 'bottom', // position of call to action (left, top, right)
        //     alignment: 'center',  // alignment of buttons (left, center, right)
        //     color: 'white',       // set the color of buttons (social, white)
        //     enabled: true,        // show/hide buttons (true, false)
        //     networks: [           // which networks to include (see FOLLOW NETWORKS)
        //       'twitter',
        //       'facebook',
        //       'instagram',
        //       'youtube'
        //     ],
        //     padding: 8,           // padding within buttons (INTEGER)
        //     profiles: {
        //       // discord:  'https://discord.com/api/oauth2/authorize?client_id=1183464624717312134&permissions=2165312&scope=bot',       // social profile links for buttons
        //       twitter: 'sharethis',
        //       facebook: 'sharethis',
        //       instagram: 'sharethis',
        //       youtube: '/channel/UCbM93niCmdc2RD9RZbLMP6A?view_as=subscriber'
        //     },
        //     radius: 9,            // the corner radius on each button (INTEGER)
        //     size: 32,             // the size of each button (INTEGER)
        //     spacing: 8            // the spacing between buttons (INTEGER)
        //   }}
          />*/}

      <Timeline />
    </>
  );
};

const App: React.FC = () => {
  return (
    <CanvasProvider>
      {/* <MousePositionProvider> */}
        <ThemeProvider theme = {theme}>
            <Page />
        </ThemeProvider>

      {/* </MousePositionProvider> */}
    </CanvasProvider>
  );
};

export default App;
