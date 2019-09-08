import { TrendNotifier } from '../abstractions/TrendNotifier';
import { Trend } from '../abstractions/Trend';

export class TrendNotifierDesktopNotification implements TrendNotifier {

    private notifier: any;
    private open: any;

    constructor(){
        this.notifier = require('node-notifier');
        this.open = require('open');
    }

    public async init(): Promise<void> {
        this.notifier.on('click', (notifierObject: any, options: any, event: any) => {
            this.open(options.open);
        });
    }

    public async notifyTrend(trend: Trend): Promise<void> {
        this.notifier.notify({
            title: `${trend.title} - (${trend.impact})`,
            subtitle: 'New Trend Detected',
            message: trend.source,
            open: trend.url,
            sound: true,
            wait: true
        });
    }

}