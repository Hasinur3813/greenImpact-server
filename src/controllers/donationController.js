import Donation from "../models/Donation.js";

export const saveDonation = async (req, res, next) => {
  try {
    const data = req.body;

    const newDonation = await new Donation(data).save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Thank you for your awesome support!.",
      data: { donation: newDonation },
    });
  } catch (error) {
    next(error);
  }
};

// get all donation

export const getAllDonations = async (req, res, next) => {
  try {
    const donorId = req.params?.id;
    const search = req.query;
    console.log(search);
    const donations = await Donation.find({ donor: donorId }).populate(
      "donor",
      "name email"
    );

    if (!donations) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No donations found!",
      });
    }

    res.status(201).json({
      success: true,
      error: false,
      message: "Successfully Fetched All Donations.",
      data: { donations: donations },
    });
  } catch (error) {
    next(error);
  }
};

// delete donaion

export const deleteDonation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the donation by ID and delete it
    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Donation not found!",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Donation deleted successfully.",
      data: { donation: deletedDonation },
    });
  } catch (error) {
    next(error);
  }
};
