import { Accessor } from "solid-js";
import { Timers } from "../@types";

export const convertToLocaleTime = (timers: Accessor<Timers>) => {
  let dateObject: Date;
  if (timers().alarmTime < Date.now()) {
    dateObject = new Date();
  } else {
    dateObject = new Date(timers().alarmTime);
  }

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  // Format the result as yyyy-MM-ddThh:mm
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDateTime;
};
