const { SMA, EMA, WMA, HMA, VWAP } = require('./MovingAverages')

const RSI = (data,period) => {
    const rsi = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            rsi.push(null)
        } else {
            let up = 0
            let down = 0
            for (let j = 0; j < period; j++) {
                if (data[i - j] > data[i - j - 1]) {
                    up += data[i - j] - data[i - j - 1]
                } else {
                    down += data[i - j - 1] - data[i - j]
                }
            }
            rsi.push(100 - (100 / (1 + (up / down))))
        }
    }
    return rsi
}

const MACD = (data, fast, slow, signal) => {
    const macd = []
    const ema1 = EMA(data, fast)
    const ema2 = EMA(data, slow)
    for (let i = 0; i < data.length; i++) {
        if (i < slow) {
            macd.push(null)
        } else {
            macd.push(ema1[i] - ema2[i])
        }
    }
    const macdSignal = EMA(macd, signal)
    const macdHist = []
    for (let i = 0; i < data.length; i++) {
        if (i < slow) {
            macdHist.push(null)
        } else {
            macdHist.push(macd[i] - macdSignal[i])
        }
    }
    return { macd, macdSignal, macdHist }
}

const Stochastic = (data, period, kPeriod, dPeriod) => {
    const stochastic = []
    const k = []
    const d = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            stochastic.push(null)
            k.push(null)
            d.push(null)
        } else {
            let high = 0
            let low = 100000000
            for (let j = 0; j < period; j++) {
                if (data[i - j].high > high) {
                    high = data[i - j].high
                }
                if (data[i - j].low < low) {
                    low = data[i - j].low
                }
            }
            stochastic.push((data[i].close - low) / (high - low) * 100)
            k.push(SMA(stochastic.slice(i - kPeriod + 1, i + 1), kPeriod))
            d.push(SMA(k.slice(i - dPeriod + 1, i + 1), dPeriod))
        }
    }
    return { stochastic, k, d }
}

module.exports = {
    RSI,
    MACD,
    Stochastic
}