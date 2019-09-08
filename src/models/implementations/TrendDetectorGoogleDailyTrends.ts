import { TrendDetector } from '../abstractions/TrendDetector';
import { TrendNotifier } from '../abstractions/TrendNotifier';
import { GoogleDailyTrendsDTO } from '../dtos/GoogleDailyTrendsDTO';
import { GoogleDailyTrends } from './GoogleDailyTrends';
import { Trend } from '../abstractions/Trend';

export class TrendDetectorGoogleDailyTrends extends TrendDetector {

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
            if (!dailyTrends) return;
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
        const mergedTrend = this.mergeTrendsKeepingMostRelevant(...this.activeTrends.slice(0), ...trends);
        for (const newTrendSorted of mergedTrend){
            if (this.isTrendNew(newTrendSorted)) this.notifyTrendDetected(newTrendSorted);
        }
        this.activeTrends = mergedTrend;
    }

    private async getDailyTrends(): Promise<GoogleDailyTrends | null> {
        try {
            const trends = await this.googleTrends.dailyTrends({ geo: 'IT' });
            return new GoogleDailyTrends(JSON.parse(trends) as GoogleDailyTrendsDTO);
        }
        catch (e){
            console.error(e.message);
            return null;
        }
    }

    private mergeTrendsKeepingMostRelevant(...trends: Trend[]){
        return trends
            .filter((x, i, a) => {
                return a.findIndex(y => y.title === x.title) === i;
            })
            .sort((a, b) => {
                if (a.impact !== b.impact) return b.impact > a.impact ? 1 : -1;
                else return b.title > a.title ? 1 : -1;
            })
            .slice(0, 12);
    }

    private isTrendNew(trend: Trend){
        if (!this.activeTrends) throw new Error('No active trends');
        return !this.activeTrends.find(x => x.title === trend.title);
    }

}