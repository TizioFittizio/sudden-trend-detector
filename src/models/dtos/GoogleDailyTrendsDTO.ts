export interface GoogleDailyTrendsDTO {
    default: {
        trendingSearchesDays: Array<{
            date: string;
            formattedDate: string;
            trendingSearches: Array<{
                title: { query: string; exploreLink: string};
                formattedTraffic: string;
                relatedQueries: Array<{ query: string; exploreLink: string }>;
                image: { newsUrl: string; source: string; imageUrl: string };
            }>;
        }>;
        endDateForNextRequest: string;
        rssFeedPageUrl: string;
    };
}