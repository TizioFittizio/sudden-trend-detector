import { TrendNotifier } from '../abstractions/TrendNotifier';
import { Trend } from '../abstractions/Trend';

export class TrendNotifierConsole implements TrendNotifier {

    public async init(): Promise<void> {
        return void 0;
    }

    public async notifyTrend(trend: Trend): Promise<void> {
        console.log('New trend detected', JSON.stringify(trend, null, 2));
    }

}