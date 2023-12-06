import { frontLineSettings } from "../../Signals";
import { FrontlineData } from "../../layers/FronlineLayer";
import { v4 as uuidv4 } from "uuid";

const onMountFrontLineData: FrontlineData = {
  idNum: uuidv4(),
  points: [],
  topLeftPoint: { x: 0, y: 0 },
  endPoint : null,
  thickness: 4,
  color: frontLineSettings.value.frontLineColor,
};

export default onMountFrontLineData;
