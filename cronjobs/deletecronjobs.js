const cron = require("node-cron");
const News = require("../modules/news");

cron.schedule("* * * * *", async () => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); // today at 00:00:00

        const now = new Date(); // current time

        const result = await News.deleteMany({
            createdAt: {
                $gte: startOfDay,
                $lte: now
            }
        });

        console.log(`[${now.toISOString()}] Deleted ${result.deletedCount} news created today`);
    } catch (err) {
        console.error("Error in cron job:", err);
    }
});
