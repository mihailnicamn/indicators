const ATR = (data, period) => {
    const atr = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            atr.push(null)
        } else {
            let sum = 0
            for (let j = 0; j < period; j++) {
                sum += Math.abs(data[i - j].high - data[i - j].low)
            }
            atr.push(sum / period)
        }
    }
    return atr
}
const PivotPoints = (data, period) => {
    const pivotPoints = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            pivotPoints.push(null)
        } else {
            let high = 0
            let low = 100000000
            let close = 0
            for (let j = 0; j < period; j++) {
                if (data[i - j].high > high) {
                    high = data[i - j].high
                }
                if (data[i - j].low < low) {
                    low = data[i - j].low
                }
                close = data[i - j].close
            }
            const pivot = (high + low + close) / 3
            const r1 = 2 * pivot - low
            const s1 = 2 * pivot - high
            const r2 = pivot + high - low
            const s2 = pivot - high + low
            const r3 = high + 2 * (pivot - low)
            const s3 = low - 2 * (high - pivot)
            pivotPoints.push({ pivot, r1, s1, r2, s2, r3, s3 })
        }
    }
    return pivotPoints
}
const HigherHighs = (data, period) => {
    const higherHighs = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            higherHighs.push(null)
        } else {
            let high = 0
            for (let j = 0; j < period; j++) {
                if (data[i - j].high > high) {
                    high = data[i - j].high
                }
            }
            higherHighs.push(high)
        }
    }
    return higherHighs
}
const LowerLows = (data, period) => {
    const lowerLows = []
    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            lowerLows.push(null)
        } else {
            let low = 100000000
            for (let j = 0; j < period; j++) {
                if (data[i - j].low < low) {
                    low = data[i - j].low
                }
            }
            lowerLows.push(low)
        }
    }
    return lowerLows
}

module.exports = {
    ATR,
    PivotPoints,
    HigherHighs,
    LowerLows,
}