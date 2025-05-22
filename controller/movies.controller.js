import Movie from "../models/moviesSchema/movies.schema.js";

const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      language,
      releaseDate,
      cast,
      director,
      duration,
      qualityLinks,
      views,
      rating,
      isFree,
      releaseYear,
      type,
      featured,
      trending,
      tags,
      trailerUrl,
      isPublished,
    } = req.body;

    if (
      !title ||
      !description ||
      !genre ||
      !language ||
      !releaseDate ||
      !director ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }
    // console.log(req.body);

    if (!req.files || !req.files.bannerUrl || !req.files.thumbnailUrl) {
      return res.status(400).json({
        success: false,
        message: "Banner and thumbnail images are required.",
      });
    }

    const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
    const bannerUrl = `${serverUrl}/temp/${req.files.bannerUrl[0].filename}`;
    const thumbnailUrl = `${serverUrl}/temp/${req.files.thumbnailUrl[0].filename}`;

    const movie = await Movie.create({
      title,
      description,
      genre,
      language,
      releaseDate,
      cast,
      director,
      duration,
      qualityLinks,
      bannerUrl,
      thumbnailUrl,
      trailerUrl,
      views,
      rating,
      isFree,
      releaseYear,
      type,
      featured,
      trending,
      tags,
      isPublished,
    });

    return res.status(201).json({ success: true, movie });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, movies });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/movies?genre=Drama&language=English&releaseYear=2023&type=movie&isFree=true
const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required." });
    }

    const searchRegex = new RegExp(query, "i");

    const movies = await Movie.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { genre: searchRegex },
        { language: searchRegex },
        { cast: searchRegex },
        { director: searchRegex },
        { tags: searchRegex },
      ],
    });

    return res.status(200).json({ success: true, movies });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    return res.status(200).json({ success: true, movie });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const updateData = req.body;

    if (updateData.title && typeof updateData.title !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Title must be a string." });
    }

    const serverUrl = process.env.SERVER_URL || "http://localhost:5000";
    if (req.files) {
      if (req.files.banner)
        updateData.bannerUrl = `${serverUrl}/temp/${req.files.banner[0].filename}`;
      if (req.files.thumbnail)
        updateData.thumbnailUrl = `${serverUrl}/temp/${req.files.thumbnail[0].filename}`;
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!movie)
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    return res.status(200).json({ success: true, movie });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
      return res
        .status(404)
        .json({ success: false, message: "Movie not found" });
    return res
      .status(200)
      .json({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const searchAndFilterMovies = async (req, res) => {
  try {
    const { query, genre, language, releaseYear, isFree, type } = req.query;
    const searchRegex = query ? new RegExp(query, "i") : null;
    const filter = {};
    if (genre) filter.genre = genre;
    if (language) filter.language = language;
    if (releaseYear) filter.releaseYear = releaseYear;
    if (isFree !== undefined) filter.isFree = isFree === "true";
    if (type) filter.type = type;
    if (searchRegex) {
      filter.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { genre: searchRegex },
        { language: searchRegex },
        { cast: searchRegex },
        { director: searchRegex },
        { tags: searchRegex },
      ];
    }
    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, movies });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getDashboardOverview = async (req, res) => {
  try {
    const [
      totalMovies,
      totalSeries,
      totalUsers,
      totalViewsAgg,
      activeSubscriptions,
      totalRevenueAgg,
      recentMovies,
      recentUsers,
      topViewedMovies,
      revenueByMonth,
      subscriptionBreakdown,
      contentTypeDistribution,
      languageDistribution,
    ] = await Promise.all([
      Movie.countDocuments({ type: "movie" }),
      Movie.countDocuments({ type: "series" }),
      User.countDocuments(),
      Movie.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      Subscription.countDocuments({ status: "active" }),
      Payment.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Movie.find().sort({ createdAt: -1 }).limit(5),
      User.find().sort({ createdAt: -1 }).limit(5),
      Movie.find().sort({ views: -1 }).limit(10),

      Payment.aggregate([
        { $match: { status: "success" } },
        {
          $group: {
            _id: { $substr: ["$createdAt", 0, 7] },
            total: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      Subscription.aggregate([
        { $group: { _id: "$planName", count: { $sum: 1 } } },
      ]),

      Movie.aggregate([{ $group: { _id: "$type", count: { $sum: 1 } } }]),

      Movie.aggregate([
        { $group: { _id: "$language", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalMovies,
          totalSeries,
          totalUsers,
          totalViews: totalViewsAgg[0]?.total || 0,
          activeSubscriptions,
          totalRevenue: totalRevenueAgg[0]?.total || 0,
        },
        recentMovies,
        recentUsers,
        topViewedMovies,
        charts: {
          revenueByMonth,
          subscriptionBreakdown,
          contentTypeDistribution,
          languageDistribution,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
export {
  createMovie,
  getAllMovies,
  searchMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  searchAndFilterMovies,
  getDashboardOverview,
};
