import { startOfMonth, subMonths, format } from "date-fns";

export async function generateLast12MonthsData(model: any) {

    const twelveMonthsAgo = subMonths(new Date(), 11);
    const startDate = startOfMonth(twelveMonthsAgo);


    const result = await model.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
            $group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                totalCourses: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Fill missing months
    const months = [];
    for (let i = 11; i >= 0; i--) {
        const date = subMonths(new Date(), i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const label = format(date, "MMM yyyy");

        const match = result.find((r: any) =>
            r._id.year === year && r._id.month === month
        );

        months.push({
            month: label,
            count: match ? match.totalCourses : 0,
        });
    };

    return months;


}