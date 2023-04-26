const router = require('express').Router();
const todoController = require('./_controller/middleRepository');
const moment = require("../util/moment");

class weather{
    temperature;
    wind_speed;
    weather_date;
    comment;
    constructor(tem,wind,date,com) {
        this.comment = com;
        this.weather_date = date;
        this.wind_speed = wind;
        this.temperature = tem;
    }
}

router.get("/marin",async (req,res) => {
    console.log("marin");
    res.json("{marin : 17}");
});

router.get("/weather/selectAll",async (req,res) => {
    const result = await todoController.select();
    res.json(result);
});

router.get("/weather/select", async (req,res) => {
    const result = await todoController.selectOne(req.query.num);
    res.json(result);
});

router.post("/weather/insert",async (req,res) => {
    const params = new weather(req.body.temperature,req.body.wind_speed,moment().format('L'),req.body.comment);
    console.log(weather);
    const result = await todoController.insert(params);
    res.json("200 :se");
});

router.post("/weather/update",async (req,res) => {
    const params = new weather(req.body.temperature,req.body.wind_speed,moment().format('L'),req.body.comment);
    const result = await todoController.update(params,req.body.seq);
    res.json("200 : se");
});
router.post("/weather/delete",async (req,res) => {
    await todoController.delete(req.body.seq);
    res.json("200 : se");
});
module.exports = router;