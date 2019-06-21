const googleTrends = require('google-trends-api');

class Main {

    public static async main(){
        const dailyTrends = await this.getDailyTrends();
        console.log(JSON.stringify(JSON.parse(dailyTrends), null, 4));
    }

    private static async getDailyTrends(){
        const trends = await googleTrends.dailyTrends({ geo: 'IT' });
        return trends;
    }

}

Main.main();