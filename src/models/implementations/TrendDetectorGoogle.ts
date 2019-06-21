import { TrendDetector } from '../abstractions/TrendDetector';
import { TrendNotifier } from '../abstractions/TrendNotifier';
import { GoogleDailyTrendsDTO } from '../dtos/GoogleDailyTrendsDTO';
import { GoogleDailyTrends } from './GoogleDailyTrends';
import { Trend } from '../abstractions/Trend';

export class TrendDetectorGoogle extends TrendDetector {

    private googleTrends: any;
    private activeTrends: Trend[] | null;

    constructor(trendNotifier: TrendNotifier){
        super(trendNotifier);
        this.googleTrends = require('google-trends-api');
        this.activeTrends = null;
    }

    public async init(): Promise<void> {
        return void 0;
    }

    public async start(): Promise<void> {
        setInterval(async () => {
            const dailyTrends = await this.getDailyTrends();
            if (this.activeTrends){
                this.updateActiveTrends(dailyTrends.getMostRecentTrends());
            }
            else {
                this.activeTrends = dailyTrends.getMostRecentTrends();
                this.activeTrends.forEach(x => this.notifyTrendDetected(x));
            }
        }, 10000);
    }

    private updateActiveTrends(trends: Trend[]){
        if (!this.activeTrends) throw new Error('No active trends');
        const newTrends = this.activeTrends.slice(0);
        newTrends.push(...trends);
        const newTrendsSorted = newTrends.sort((a, b) => a.impact - b.impact).slice(0, 10);
        newTrendsSorted.forEach(x => {
            if (!this.activeTrends!.find(y => y.title === x.title)) this.notifyTrendDetected(x);
        });
        this.activeTrends = newTrendsSorted;
    }

    private async getDailyTrends(): Promise<GoogleDailyTrends> {
        const trends = await this.googleTrends.dailyTrends({ geo: 'IT' });
        return new GoogleDailyTrends(JSON.parse(trends) as GoogleDailyTrendsDTO);
    }

}