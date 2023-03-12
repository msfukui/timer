let timerIntervalId = null
let currentTime = null
let accumulatedTime = 0

const writeTimerDate = (now) => {
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

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

const writeTimerTime = (hour, min, sec, mill) => {
  const h  = hour.toString().padStart(2, '0')
  const m  = min.toString().padStart(2, '0')
  const s  = sec.toString().padStart(2, '0')
  const ms = mill.toString().padStart(3, '0')

  const time = `${h}:${m}:${s}.${ms}`

  document.querySelector(".timer-time").innerText = time
}

const timerStart = () => {
  timerStop()

  currentTime = new Date()
  timerIntervalId = setInterval(timerCount, 10)
}

const timerReset = () => {
  timerStop()

  accumulatedTime = 0

  writeTimerDate(new Date())
  writeTimerTime(0, 0, 0, 0) 
}

const timerStop = () => {
  if (timerIntervalId) {
    clearInterval(timerIntervalId)
  }
  timerIntervalId = null

  if (currentTime) {
    accumulatedTime += (new Date()) - currentTime
  }
  currentTime = null
}

const timerCount = () => {
  const now = new Date()
  const diff = now - currentTime + accumulatedTime

  const hour = Math.floor(diff / (60 * 60 * 1000))
  const min  = Math.floor(diff % (60 * 60 * 1000) / (60 * 1000))
  const sec  = Math.floor(diff % (60 * 1000) / 1000)
  const mill = Math.floor(diff % 1000)

  writeTimerDate(now)
  writeTimerTime(hour, min, sec, mill)
}

document.getElementById('timer-start').addEventListener('click', timerStart)
document.getElementById('timer-stop').addEventListener('click', timerStop)
document.getElementById('timer-reset').addEventListener('click', timerReset)
window.addEventListener('load', timerReset)
