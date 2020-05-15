const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Category = require("../models/Category");
const { auth, isAdmin } = require("../middleware/auth");
const User = require("../models/User");

router.post(
  "/create/:userId",
  [[check("name", "Name is Required").not().isEmpty()]],
  auth,
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    req.profile = user;

    const { name } = req.body;
    try {
      let category = new Category({
        name,
      });
      await category.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

// get all categories

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(404).json("Categories not found");
    }
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// get an exist category by id
router.get("/:categoryId", async (req, res) => {
  try {
    let category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// update existing category

// router.put("/update/:categoryId", auth, isAdmin, async (req, res) => {
//   try {
//     let id = req.params.categoryId;
//     let { name } = req.body;
//     let updatedCategory = await Category.findOneAndUpdate(
//       { _id: id },
//       { name: name }
//     );
//     res.json(updatedCategory);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

router.put(
  "/update/:categoryId/:userId",
  [check("name", "Name is required").not().isEmpty()],
  auth,
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    req.category = category;

    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    req.profile = user;

    try {
      category.name = req.body.name;
      await category.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// delete an existing category

router.delete("/:categoryId/:userId", auth, isAdmin, async (req, res) => {
  let category = await Category.findById(req.params.categoryId);
  if (!category) {
    return res.status(404).json({ msg: "Category not found" });
  }
  req.category = category;

  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  req.profile = user;
  try {
    await category.remove();
    res.json({ msg: "Deleted!!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
