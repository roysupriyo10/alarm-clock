import { createEffect, createSignal, onCleanup } from "solid-js";
import { Timers } from "./@types";
import { convertToLocaleTime, remainingTime } from "./utils";
import alarmSoundUrl from './assets/alarm-sound.mp3';
import blankSoundUrl from './assets/blank-sound.mp3';

const blankSound = new Audio(blankSoundUrl);
const alarmSound = new Audio(alarmSoundUrl)
alarmSound.loop = true

function App() {
  const [timers, setTimers] = createSignal<Timers>({
    alarmTime: Number(localStorage.getItem("alarmTime") ?? 0),
    currentTime: Date.now(),
  });
  const [isAlarmActive, setIsAlarmActive] = createSignal<boolean>(
    JSON.parse(localStorage.getItem("isAlarmActive") || "false")
  );

  const timerInterval = setInterval(() => {
    setTimers((previous) => ({ ...previous, currentTime: Date.now() }));
    if (!isAlarmActive()) return
    if (timers().currentTime > timers().alarmTime) {
      alarmSound.play();
    }
  }, 1000);

  const blankSoundInterval = setInterval(() => {
    blankSound.play();
  }, 1000 * 60 * 4)

  onCleanup(() => {
    clearInterval(timerInterval);
    clearInterval(blankSoundInterval);
  });

  createEffect(() => {
    localStorage.setItem("isAlarmActive", JSON.stringify(isAlarmActive()));
    localStorage.setItem("alarmTime", JSON.stringify(timers().alarmTime));
  });

  return (
    <section>
      <input
        type="datetime-local"
        value={convertToLocaleTime(timers)}
        name="alarm-clock"
        onInput={(e) => {
          const toNumber = new Date(e.currentTarget.value).getTime();

            setTimers((previous) => ({ ...previous, alarmTime: toNumber }));
        }}
      />
      <button
        style={{
          "background-color": isAlarmActive() ? "lightblue" : "",
        }}
        onClick={() => setIsAlarmActive((previous) => !previous)}
      >
        Activate{isAlarmActive() ? "d" : ""}
      </button>
<button
  onClick={() => alarmSound.pause()}
>Pause</button>

      {timers().alarmTime !== 0 && <div>{remainingTime(timers)}</div>}
    </section>
  );
}

export default App;
