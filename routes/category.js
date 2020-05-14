const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Category = require("../models/Category");
const { auth, isAdmin } = require("../middleware/auth");

// post a new category
router.post(
  "/create",
  [check("name", "Name is Required").not().isEmpty()],
  auth,
  isAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      let category = new Category({
        name,
      });
      await category.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
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

router.put("/update/:categoryId", auth, isAdmin, async (req, res) => {
  try {
    let id = req.params.categoryId;
    let { name } = req.body;
    let updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { name: name }
    );
    res.json(updatedCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
// delete an existing category

router.delete("/:categoryId", auth, isAdmin, async (req, res) => {
  try {
    await Category.remove({ _id: req.params.categoryId });
    res.json({ msg: "deleted!!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
