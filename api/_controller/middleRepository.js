const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");


const Repository = {
    select : async () => {
        let query = `select temperature, wind_speed, day, comment from weather`
        const [result] = await db.execute(query);
        return result;
    },
    selectOne : async (selectSequence) => {
        let query = `select temperature, wind_speed, day, comment from weather where sequence = ${selectSequence}`;
        const [result] = await db.execute(query);
        return result;
    },
    insert : async (params) => {
        const query = `insert into weather (temperature,wind_speed,day,comment)
                       values('${params.temperature}','${params.wind_speed}','${params.weather_date}','${params.comment}')`;
        const [result] = await db.execute(query);
        return result;
    },
    update : async (params,seq) => {
        const query = `update weather
        set temperature = '${params.temperature}', wind_speed = '${params.wind_speed}',comment = '${params.comment}'
        where sequence = ${seq}`
        await db.execute(query);
    },
    delete : async (seq) => {
        const query = `delete weather from weather where = sequence = ${seq}`;
        db.execute(query);
    }
}



module.exports = Repository;