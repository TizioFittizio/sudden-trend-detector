import { TrendNotifierConsole } from './models/implementations/TrendNotifierConsole';
import { TrendDetectorGoogle } from './models/implementations/TrendDetectorGoogle';

class Main {

    public static async main(){
        const trendNotifier = new TrendNotifierConsole();
        await trendNotifier.init();
        const trendDetector = new TrendDetectorGoogle(trendNotifier);
        await trendDetector.init();
        await trendDetector.start();

    }

}

Main.main();