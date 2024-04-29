namespace Manager {
    export class Report {
        totalSoldPerYearPerMonth: Map<string, Map<string, number>>

        constructor() {
            this.totalSoldPerYearPerMonth = new Map<string, Map<string, number>>()
        }

        processTrade(trade: Sheet.Trade | null): void {
            if (trade === null) {
                return
            }
            const [year, month] = this.getYearAndMonthFromStockTrade(trade)
            if (!this.totalSoldPerYearPerMonth.has(year)) {
                this.totalSoldPerYearPerMonth.set(year, new Map<string, number>())
            }
            const totalSoldPerMonth = this.totalSoldPerYearPerMonth.get(year)!
            if (!totalSoldPerMonth.has(month)) {
                totalSoldPerMonth.set(month, 0)
            }
            const previousValue = totalSoldPerMonth.get(month)!
            const amountToAdd = trade.quantity * trade.sellPrice
            const newValue = previousValue + amountToAdd
            totalSoldPerMonth.set(month, newValue)
        }

        createMonthlyTradeReportSheet(sheetName?: string, header?: string[]): void {
            sheetName = sheetName ?? 'generatedMonthlyReport'
            header = header ?? Sheet.MonthlyTradeReport.getHeader()
            const monthlyTradeReport = this.generateMonthlyTradeReport()
            SheetUtil.createSheet(sheetName, header, monthlyTradeReport)
        }

        private generateMonthlyTradeReport(): Sheet.MonthlyTradeReport[] {
            const monthlyTradeReportList: Sheet.MonthlyTradeReport[] = []
            for (const [year, totalSoldPerMonth] of this.totalSoldPerYearPerMonth) {
                for (const [month, totalSold] of totalSoldPerMonth) {
                    const report = new Sheet.MonthlyTradeReport(year, month, totalSold)
                    monthlyTradeReportList.push(report)
                }
            }
            return monthlyTradeReportList
        }

        private getMonthFromStockTrade(stockTrade: Sheet.Trade): string {
            const dateParts = stockTrade.date.split('/')
            return dateParts[1]
        }

        private getYearFromStockTrade(stockTrade: Sheet.Trade): string {
            const dateParts = stockTrade.date.split('/')
            return dateParts[2]
        }

        private getYearAndMonthFromStockTrade(stockTrade: Sheet.Trade): [string, string] {
            return [
                this.getYearFromStockTrade(stockTrade),
                this.getMonthFromStockTrade(stockTrade),
            ]
        }
    }
}
