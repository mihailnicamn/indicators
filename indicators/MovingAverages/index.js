const SMA = (data, period) => { // simple moving average
    const sma = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            sma.push(null)
        } else {
            let sum = 0
            for (let j = 0; j < period; j++) {
                sum += data[i - j]
            }
            sma.push(sum / period)
        }
    }
    return sma
}
const WMA = (data, period) => { // weighted moving average
    const wma = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            wma.push(null)
        } else {
            let sum = 0
            let wsum = 0
            for (let j = 0; j < period; j++) {
                sum += data[i - j] * (period - j)
                wsum += period - j
            }
            wma.push(sum / wsum)
        }
    }
    return wma
}
const HMA = (data, period) => { // hull moving average
    const hma = []
    const wma1 = WMA(data, Math.round(period / 2))
    const wma2 = WMA(wma1, Math.round(period / 2))
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            hma.push(null)
        } else {
            hma.push(2 * wma1[i] - wma2[i])
        }
    }
    return hma
}
const VWAP = (data, period) => { // volume weighted average price
    const vwap = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            vwap.push(null)
        } else {
            let sum = 0
            let vol = 0
            for (let j = 0; j < period; j++) {
                sum += data[i - j].close * data[i - j].volume
                vol += data[i - j].volume
            }
            vwap.push(sum / vol)
        }
    }
    return vwap
}
const EMA = (data, period) => { // exponential moving average
    const ema = []
    let k = 2 / (period + 1)
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            ema.push(null)
        } else if (i === period) {
            let sum = 0
            for (let j = 0; j < period; j++) {
                sum += data[i - j]
            }
            ema.push(sum / period)
        } else {
            ema.push(data[i] * k + ema[i - 1] * (1 - k))
        }
    }
    return ema
}
const BolingerBands = (data, period, std) => { // bolinger bands
    const bb = []
    const sma = SMA(data, period)
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            bb.push({ upper: null, middle: null, lower: null })
        } else {
            let sum = 0
            for (let j = 0; j < period; j++) {
                sum += Math.pow(data[i - j] - sma[i], 2)
            }
            let sd = Math.sqrt(sum / period)
            bb.push({ upper: sma[i] + std * sd, middle: sma[i], lower: sma[i] - std * sd })
        }
    }
    return bb
}
const IchimokuCloud = (data, period1, period2, period3) => { // ichimoku cloud
    const ichimoku = []
    const tenkan = EMA(data, period1)
    const kijun = EMA(data, period2)
    const senkouA = []
    const senkouB = []
    for (let i = 0; i < data.length; i++) {
        if (i < period2) {
            senkouA.push(null)
            senkouB.push(null)
        } else {
            senkouA.push((tenkan[i] + kijun[i]) / 2)
            senkouB.push(EMA(data, period3)[i])
        }
    }
    const chikou = []
    for (let i = 0; i < data.length; i++) {
        if (i < period2) {
            chikou.push(null)
        } else {
            chikou.push(data[i - period2])
        }
    }
    for (let i = 0; i < data.length; i++) {
        ichimoku.push({ tenkan, kijun, senkouA, senkouB, chikou })
    }
    return ichimoku
}
const HeikenAshiSmoothed = (data, period) => { // heiken ashi smoothed
    const data_ = {
        open: SMA(data.map(d => d.open), period),
        close: SMA(data.map(d => d.close), period),
        high: SMA(data.map(d => d.high), period),
        low: SMA(data.map(d => d.low), period)
    }
    return data_
}







module.exports = {
    SMA,
    WMA,
    HMA,
    VWAP,
    EMA,
    BolingerBands,
    IchimokuCloud,
    HeikenAshiSmoothed
}
    