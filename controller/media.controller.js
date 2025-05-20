import Media from "../models/videoSchema/video.schema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createMedia = async (req, res) => {
  try {
    const {
      title,
      description,
      categories,
      languages,
      cast,
      releaseYear,
      rating,
      views,
      duration,
      free,
    } = req.body;
    // console.log(title);

    // Check files
    if (
      !req.files ||
      !req.files.banner ||
      !req.files.video ||
      !req.files.thumbnail
    ) {
      return res
        .status(400)
        .json({ error: "Banner, video and thumbnail files are required" });
    }

    const bannerFile = req.files.banner[0];
    const videoFile = req.files.video[0];
    const thumbnail = req.files.thumbnail[0];

    // Upload to Cloudinary
    const bannerUpload = await uploadOnCloudinary(bannerFile.path);
    const videoUpload = await uploadOnCloudinary(videoFile.path);
    const thumbnailUpload = await uploadOnCloudinary(thumbnail.path);

    if (!bannerUpload || !videoUpload || !thumbnailUpload) {
      return res
        .status(500)
        .json({ error: "Failed to upload media to Cloudinary" });
    }

    // Create media entry
    const media = new Media({
      title,
      description,
      banner: bannerUpload.secure_url,
      video: videoUpload.secure_url,
      thumbnail: thumbnailUpload.secure_url,
      categories: categories ? categories.split(",") : [],
      languages: languages ? languages.split(",") : [],
      cast: cast ? cast.split(",") : [],
      releaseYear,
      rating,
      views,
      duration,
      free,
    });

    await media.save();

    res.status(201).json({ success: true, media });
  } catch (error) {
    console.error("Create Media Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get media by language
const getMediaByLanguage = async (req, res) => {
  try {
    const { language } = req.query;

    if (!language) {
      return res.status(400).json({ error: "Language parameter is required" });
    }

    const mediaList = await Media.find({
      languages: { $in: [language] },
    });

    res.status(200).json({ success: true, media: mediaList });
  } catch (error) {
    console.error("Get Media By Language Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all media data
const getAllMediaData = async (req, res) => {
  try {
    const media = await Media.find(); // fetch all documents from the Media collection
    res.status(200).json(media);
  } catch (error) {
    console.error("Error fetching media data:", error);
    res.status(500).json({ message: "Failed to retrieve media data" });
  }
};

// for getting a single video details
const getVideoByid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Video id is required" });
    }

    const video = await Media.findById(id);
    if (!video) {
      return res
        .status(404)
        .json({ success: false, error: "Video not found by this id" });
    }

    return res.status(200).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve video data" });
  }
};

// getMediaByCategory
const getMediaByCategory = async (req, res) => {
  try {
    let { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category parameter is required" });
    }

    category = category.trim();

    // Query MongoDB directly to filter by category
    const mediaList = await Media.find({ categories: category });

    res.status(200).json({ success: true, media: mediaList });
  } catch (error) {
    console.error("Get Media By Category Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// for update
const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const {
      title,
      description,
      categories,
      languages,
      cast,
      releaseYear,
      rating,
      views,
      duration,
      free,
    } = req.body;

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (categories) updateData.categories = categories.split(",");
    if (languages) updateData.languages = languages.split(",");
    if (cast) updateData.cast = cast.split(",");
    if (releaseYear) updateData.releaseYear = releaseYear;
    if (rating) updateData.rating = rating;
    if (free) updateData.free = free;
    if (duration) updateData.duration = duration;
    if (views) updateData.views = views;

    // Handle media file updates if any
    if (req.files) {
      const { banner, video, thumbnail } = req.files;

      if (banner && banner.length > 0) {
        const bannerUpload = await uploadOnCloudinary(banner[0].path);
        if (bannerUpload) updateData.banner = bannerUpload.secure_url;
      }

      if (video && video.length > 0) {
        const videoUpload = await uploadOnCloudinary(video[0].path);
        if (videoUpload) updateData.video = videoUpload.secure_url;
      }

      if (thumbnail && thumbnail.length > 0) {
        const thumbnailUpload = await uploadOnCloudinary(thumbnail[0].path);
        if (thumbnailUpload) updateData.thumbnail = thumbnailUpload.secure_url;
      }
    }

    const updatedMedia = await Media.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedMedia) {
      return res.status(404).json({ error: "Media not found" });
    }

    res.status(200).json({ success: true, media: updatedMedia });
  } catch (error) {
    console.error("Update Media Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// for delete
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return res.status(404).json({ error: "Media not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    console.error("Delete Media Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createMedia,
  getMediaByLanguage,
  getMediaByCategory,
  getAllMediaData,
  updateMedia,
  deleteMedia,
  getVideoByid,
};
