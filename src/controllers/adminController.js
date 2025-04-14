import Donation from "../models/Donation.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const adminOverview = async (req, res, next) => {
  try {
    const [userCount, donationCount, eventCount] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      Event.countDocuments(),
    ]);

    // total amount of donations
    const totalDonationAmountResult = await Donation.aggregate([
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]);

    const totalDonationAmount = totalDonationAmountResult[0]?.totalAmount || 0;

    // monthly donations
    const monthlyDonations = await Donation.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // monthly donations format
    const formattedMonthlyDonations = monthlyDonations.map((donation) => {
      return {
        month: months[donation._id - 1],
        amount: donation.totalAmount,
      };
    });

    // user role distribution

    const [donorCount, volunteerCount] = await Promise.all([
      User.countDocuments({ role: "donor" }),
      User.countDocuments({ role: "volunteer" }),
    ]);

    // recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name role createdAt");

    // recent donations

    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("donor", "name email")
      .select("amount transactionId createdAt");

    res.status(200).json({
      success: true,
      error: false,
      data: {
        summaryStats: {
          users: userCount,
          totalDonations: totalDonationAmount,
          events: eventCount,
          avgDonation: parseInt(totalDonationAmount / donationCount),
        },
        recentUsers,
        roleDistribution: [
          { name: "Donors", value: donorCount },
          { name: "Volunteers", value: volunteerCount },
        ],

        donations: {
          monthlyDonations: formattedMonthlyDonations,
          recentDonations: recentDonations,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
