const skins = require('../data/skins.json');
const WSManager = require('../client/ws/WebSocketManager.js');

var ws = new WSManager(this, ws);

module.exports.getItemNum = skinName => {
    let num = 0;
    const arrayLength = skins.length;
    var itemNum = 0;
    while (num < arrayLength) {

        if (skins[num].name.toLowerCase() == skinName.toLowerCase()) {
            itemNum = num;
        };
        num++;
    };
    if (itemNum == 0 && skinName.toLowerCase() !== "arctic hunt") {
        return undefined;
    };
    return itemNum;
};

module.exports.getItemSales = skinName => {
    function averageSales(days) {
        return ws.request(
            ["st", module.exports.getItemNum(skinName).toString(), days],
            x => x[1],
            data => {
                return data;
            },
            true,
        );
    };

    function getSaleData(data) {
        let totalSales = 0;
        let itemsSold = 0;
        let num = 0;
        while (num < data.length) {
            totalSales = (totalSales + data[num].f);
            itemsSold = (itemsSold + data[num].t);
            num++;
        };
        return [itemsSold, totalSales];
    };

    function itemSales() {
        return ws.request(
            ["r", "itemsales", null, null, null, null, 0, module.exports.getItemNum(skinName).toString()],
            x => x[3],
            data => {
                return data;
            },
            true,
        );
    };
    var modifiedData = {
        "name": skinName,
        "itemNumber": undefined,
        "High": undefined,
        "Low": undefined,
        "inCirculation": undefined,
        "onSale": undefined,
        "7Days": {},
        "30Days": {},
        "90Days": {},
        "120Days": {}
    }
    var done = [false, false, false, false, false];
    var itemSalesData = itemSales();
    var averageSalesData7 = averageSales(7);
    var averageSalesData30 = averageSales(30);
    var averageSalesData90 = averageSales(90);
    var averageSalesData120 = averageSales(120);
    const WSPromise = new Promise(function (resolve) {
        itemSalesData.then((value) => {
                itemSalesData = value;
                modifiedData.itemNumber = parseInt(itemSalesData.ind);
                modifiedData.High = itemSalesData.high;
                modifiedData.Low = itemSalesData.low;
                modifiedData.inCirculation = itemSalesData.inC;
                modifiedData.onSale = itemSalesData.onS;
                done[0] = true;
                if (done[1] == true && done[2] == true && done[3] == true && done[4] == true) {
                    resolve(modifiedData);
                };
            }),
            averageSalesData7.then((value) => {
                averageSalesData7 = value;
                let data = getSaleData(averageSalesData7);
                modifiedData["7Days"] = {
                    "itemsSold": data[0],
                    "totalSales": data[1],
                    "averagePrice": (data[1] / data[0])
                };
                done[1] = true;
                if (done[0] == true && done[2] == true && done[3] == true && done[4] == true) {
                    resolve(modifiedData);
                };
            }),
            averageSalesData30.then((value) => {
                averageSalesData30 = value;
                let data = getSaleData(averageSalesData30);
                modifiedData["30Days"] = {
                    "itemsSold": data[0],
                    "totalSales": data[1],
                    "averagePrice": (data[1] / data[0])
                };
                done[2] = true;
                if (done[0] == true && done[1] == true && done[3] == true && done[4] == true) {
                    resolve(modifiedData);
                };
            }),
            averageSalesData90.then((value) => {
                averageSalesData90 = value;
                let data = getSaleData(averageSalesData90);
                modifiedData["90Days"] = {
                    "itemsSold": data[0],
                    "totalSales": data[1],
                    "averagePrice": (data[1] / data[0])
                };
                done[3] = true;
                if (done[0] == true && done[1] == true && done[2] == true && done[4] == true) {
                    resolve(modifiedData);
                };
            }),
            averageSalesData120.then((value) => {
                averageSalesData120 = value;
                let data = getSaleData(averageSalesData120);
                modifiedData["120Days"] = {
                    "itemsSold": data[0],
                    "totalSales": data[1],
                    "averagePrice": (data[1] / data[0])
                };
                done[4] = true;
                if (done[1] == true && done[2] == true && done[3] == true && done[0] == true) {
                    resolve(modifiedData);
                };
            });
    });

    return WSPromise;
}
