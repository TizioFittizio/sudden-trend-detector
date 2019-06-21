import { TrendNotifier } from './TrendNotifier';
import { Trend } from './Trend';

export abstract class TrendDetector {

    private trendNotifier: TrendNotifier;

    constructor(trendNotifier: TrendNotifier){
        this.trendNotifier = trendNotifier;
    }

    public abstract init(): Promise<void>;

    public abstract start(): Promise<void>;

    protected notifyTrendDetected(trend: Trend){
        this.trendNotifier.notifyTrend(trend);
    }

}