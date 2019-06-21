import { GoogleDailyTrendsDTO } from '../dtos/GoogleDailyTrendsDTO';
import { Trend } from '../abstractions/Trend';

export class GoogleDailyTrends {

    private dto: GoogleDailyTrendsDTO;

    constructor(dto: GoogleDailyTrendsDTO){
        this.dto = dto;
    }

    public getMostRecentTrends(): Trend[] {
        return this.dto.default.trendingSearchesDays[0].trendingSearches.map(x => ({
            title: x.title.query,
            related: JSON.stringify(x.relatedQueries),
            time: this.dto.default.trendingSearchesDays[0].formattedDate,
            source: x.image.newsUrl,
            url: x.image.newsUrl,
            impact: Number(x.formattedTraffic.replace(/\D/g, ''))
        }));
    }

}