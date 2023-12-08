import { frontLineSettings } from "@/app/canvasEditor/Signals";
import onMountFrontLineData from "@/app/canvasEditor/settings/frontLineSettings/OnMountFrontLineData";
import { v4 as uuidv4 } from 'uuid';
export const addNewFrontLine = () => {
    console.log('new feonline is added')
    const newFrontline = {...onMountFrontLineData, idNum: uuidv4()}
    frontLineSettings.value.frontLines.push( newFrontline);
    frontLineSettings.value.activeFrontline = newFrontline
    console.log(  frontLineSettings.value.activeFrontline)
  }