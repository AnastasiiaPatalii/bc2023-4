const fs = require("node:fs")
const http = require("http")
const xml = require("fast-xml-parser")

const host = "localhost";
const port = "8000";

const parser = new xml.XMLParser();

let readData = fs.readFileSync("data.xml");
let parsedData = parser.parse(readData.toString());

let jsondata = {
    "data": {
        auction: []
    }
}

jsondata.data.auction = parsedData.auctions.auction.map(auction => ({
    "code": auction.StockCode,
    "currency": auction.ValCode,
    "attraction": auction.Attraction
}));


const builder = new xml.XMLBuilder();

let xmldata = builder.build(jsondata);

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/xml");
    res.writeHead(200);
    res.end(xmldata);
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log("Server is running on http://" + host + ":" + port);
})
