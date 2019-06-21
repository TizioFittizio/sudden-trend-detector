import { Trend } from './Trend';

export interface TrendNotifier {
    init(): Promise<void>;
    notifyTrend(trend: Trend): Promise<void>;
}