import { settings } from "@/app/canvasEditor/Signals";

export   const findActiveFrontLine = () => {
    const activeFrontlineId =
      settings.value.frontLineSettings.activeFrontlineId;
    const activeFrontLine = null;
    if (activeFrontlineId) {
      const activeFrontline = settings.value.frontLineSettings.frontLines.find(
        (frontline) => frontline.idNum === activeFrontlineId
      );
      return activeFrontLine;
    } else {
        return null
    }

     
  };

export const findFrontLineObj = (id:string) => {
    
      const frontline = settings.value.frontLineSettings.frontLines.find(
        (frontline) => frontline.idNum === id
      );
      if (frontline === null){
        throw new Error(`PROBLEM WITH FINDING FRONTLINE ${id} ` )
      }
      return frontline;
    
     
  };