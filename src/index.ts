import { TrendNotifierConsole } from './models/implementations/TrendNotifierConsole';
import { TrendDetectorGoogleDailyTrends } from './models/implementations/TrendDetectorGoogleDailyTrends';
import { TrendNotifierDesktopNotification } from './models/implementations/TrendNotifierDesktopNotification';

class Main {

    public static async main(){
        const trendNotifier = new TrendNotifierDesktopNotification();
        await trendNotifier.init();
        const trendDetector = new TrendDetectorGoogleDailyTrends(trendNotifier);
        await trendDetector.init();
        await trendDetector.start();
        console.log('Trend Detector started');
    }

}

Main.main();