namespace TradeSheet {
    export function getHeader() {
        return [
            Header.date,
            Header.ticker,
            Header.quantity,
            Header.avgBuyPrice,
            Header.sellPrice,
            Header.profit,
            Header.profitPercentage,
        ]
    }

    export enum Header {
        date = 'date',
        ticker = 'ticker',
        quantity = 'quantity',
        avgBuyPrice = 'avgBuyPrice',
        sellPrice = 'sellPrice',
        profit = 'profit',
        profitPercentage = 'profitPercentage',
    }
}
