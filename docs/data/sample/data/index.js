import { init } from 'klinecharts'

function genData (timestamp = new Date().getTime(), length = 800) {
  let basePrice = 5000
  timestamp = Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000
  const dataList = []
  for (let i = 0; i < length; i++) {
    const prices = []
    for (let j = 0; j < 4; j++) {
      prices.push(basePrice + Math.random() * 60 - 30)
    }
    prices.sort()
    const open = +(prices[Math.round(Math.random() * 3)].toFixed(2))
    const high = +(prices[3].toFixed(2))
    const low = +(prices[0].toFixed(2))
    const close = +(prices[Math.round(Math.random() * 3)].toFixed(2))
    const volume = Math.round(Math.random() * 100) + 10
    const turnover = (open + high + low + close) / 4 * volume
    dataList.push({ timestamp, open, high,low, close, volume, turnover })

    basePrice = close
    timestamp += 60 * 1000
  }
  return dataList
}

const chart = init('k-line-chart')
chart.applyNewData(genData())
chart.loadMore((timestamp) => {
  loadMoreTimer = setTimeout(() => {
    chart.applyMoreData(genData(timestamp), true)
  }, 2000)
})
chart.applyNewData(genData(), true)
updateData()

function updateData () {
  setTimeout(() => {
    const dataList = chart.getDataList()
    const lastData = dataList[dataList.length - 1]
    const newData = { ...lastData }
    newData.close += (Math.random() * 20 - 10)
    newData.high = Math.max(newData.high, newData.close)
    newData.low = Math.min(newData.low, newData.close)
    newData.volume += Math.round(Math.random() * 10)
    chart.updateData(newData)
    updateData()
  }, 600)
}