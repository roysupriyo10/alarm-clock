import { Accessor } from "solid-js";
import { Timers } from "../@types";

export const remainingTime = (timers: Accessor<Timers>) => {
  const anHour = 1000 * 60 * 60;
  const aMinute = 1000 * 60;
  const aSecond = 1000;
  const remainingMilliseconds = timers().alarmTime - timers().currentTime;

  const hours = Math.floor(remainingMilliseconds / anHour);

  const minutes = Math.floor((remainingMilliseconds % anHour) / aMinute);

  const seconds = Math.floor((remainingMilliseconds % aMinute) / aSecond);

  const displayHours = hours.toString().padStart(2, "0");
  const displayMinutes = minutes.toString().padStart(2, "0");
  const displaySeconds = seconds.toString().padStart(2, "0");

  const formattedString = `${displayHours}:${displayMinutes}:${displaySeconds} to go`;

  return remainingMilliseconds > 0 ? formattedString : 'set new alarm';
};
