import cron from "node-cron";
import ReviewService from "#services/review";

cron.schedule("0 0 * * *", async () => {
  try {
    const reviewData = await ReviewService.getWithAggregate([
      {
        $group: {
          _id: "$photographerId",
          rating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const data = reviewData.map((ele) => {
      ReviewService.update(ele.photographerId, { rating: ele.rating });
    });

    await Promise.all(data);
  } catch (err) {
    cosnole.log(err);
  }
});
