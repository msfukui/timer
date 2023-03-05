let timerHour = 0
let timerMin  = 0
let timerSec  = 0

let timerIntervalId = null

const writeTimerDate = () => {
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const now = new Date()

  const year  = now.getFullYear()
  const month = now.getMonth() + 1
  const date  = now.getDate()
  const week  = now.getDay()

  const y = year.toString()
  const m = month.toString().padStart(2, '0')
  const d = date.toString().padStart(2, '0')
  const w = weekday[week]

  const today = `${y}.${m}.${d} ${w}`

  document.querySelector(".timer-date").innerText = today
}

const writeTimerTime = (hour, min, sec) => {
  const h = hour.toString().padStart(2, '0')
  const m = min.toString().padStart(2, '0')
  const s = sec.toString().padStart(2, '0')

  const time = `${h}:${m}:${s}`

  document.querySelector(".timer-time").innerText = time
}

const timerStart = () => {
  timerStop()

  timerIntervalId = setInterval(timerCount, 1000)
}

const timerReset = () => {
  timerStop()

  const hour = 0
  const min  = 0
  const sec  = 0

  timerHour = 0
  timerMin  = 0
  timerSec  = 0

  writeTimerDate()
  writeTimerTime(hour, min, sec)
}

const timerStop = () => {
  if (timerIntervalId) {
    clearInterval(timerIntervalId)
  }
  timerIntervalId = null
}

const timerCount = () => {
  timerSec += 1
  if (timerSec >= 60) {
    timerMin += 1
    timerSec = 0
  }
  if (timerMin >= 60) {
    timerHour += 1
    timerMin = 0
  }
  if (timerHour >= 100) {
    timerHour = 0
  }

  const hour = timerHour
  const min  = timerMin
  const sec  = timerSec

  writeTimerDate()
  writeTimerTime(hour, min, sec)
}

document.getElementById('timer-start').addEventListener('click', timerStart)
document.getElementById('timer-stop').addEventListener('click', timerStop)
document.getElementById('timer-reset').addEventListener('click', timerReset)
window.addEventListener('load', timerReset)
