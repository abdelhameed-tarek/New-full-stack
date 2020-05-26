const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const User = require("../models/User");
const Category = require("../models/Category");
const { check, validationResult } = require("express-validator");
const { auth, isAdmin } = require("../middleware/auth");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

router.get("/:pId", async (req, res) => {
  try {
    let product = await Product.findById(req.params.pId)
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(400).json({ msg: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    let products = await Product.find({});
    if (!products) {
      return res.status(400).json({ msg: "Products not found" });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/create", auth, async (req, res) => {
  let product;
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  req.profile = user;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err || !files) {
      return res.status(400).json({ msg: "please enter a vaild photo" });
    }
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    product = new Product(fields);

    if (!files.photo) {
      return res.status(400).json({ msg: "please enter a vaild photo" });
    } else {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    await product.save();
    if (err || !product) {
      return res.status(400).json({ msg: "server error" });
    }
    res.json(product);
  });
});

// router.post(
//   "/create/:userId",
//   [
//     check("name", "Name is required")
//       .not()
//       .isEmpty()
//       .isLength({ min: 5 })
//       .withMessage("Name must be more then 5 characters"),
//     check("description", "Description is required").not().isEmpty(),
//     check("price", "Price is required").not().isEmpty(),
//     check("quantity", "Quantity is required").not().isEmpty(),
//     check("shipping", "Shipping is required").not().isEmpty(),
//     check("category", "Category is required").not().isEmpty(),
//   ],
//   auth,
//   isAdmin,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }
//     req.user = user;

//     const { name, description, price, quantity, shipping, category } = req.body;
//     try {
//       let product = new Product({
//         name,
//         price,
//         description,
//         quantity,
//         shipping,
//         category,
//       });
//       await product.save();
//       res.json(product);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: "Server error" });
//     }
//   }
// );

router.put("/update/:pId/:userId", auth, isAdmin, async (req, res) => {
  let product;

  product = await Product.findById(req.params.pId);
  if (!product) {
    return res.status(400).json({ msg: "Product not found" });
  }

  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  req.profile = user;

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err || !files) {
      return res.status(400).json({ msg: "please enter a vaild photo" });
    }
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    product = _.extend(product, fields);

    if (!files.photo) {
      return res.status(400).json({ msg: "please enter a vaild photo" });
    } else {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    await product.save();
    if (err || !product) {
      return res.status(400).json({ msg: "server error" });
    }
    res.json(product);
  });
});

router.delete("/:pId/:userId", async (req, res) => {
  const product = await Product.findById(req.params.pId);
  if (!product) {
    return res.status(400).json({ msg: "Product not found" });
  }

  req.product = product;

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  req.user = user;
  try {
    await product.remove();
    res.json({ msg: "Deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/// get products list with query params

router.get("/list/of/products", async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    let products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/related/products/:pId", async (req, res) => {
  let product = await Product.findById(req.params.pId);
  if (!product) {
    return res.status(400).json({ msg: "Products not found" });
  }
  req.product = product;
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;

    product = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .select("-photo")
      .limit(limit)
      .populate("category");
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/list/by/search", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          msg: "Products not found",
        });
      }
      res.json({ size: data.length, data });
    });
  // try {
  //   let order = req.body.order ? req.body.order : "desc";
  //   let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  //   let limit = req.body.limit ? parseInt(req.body.limit) : 6;
  //   let skip = parseInt(req.body.skip);
  //   let findArgs = {};

  //   for (let key in req.body.filters) {
  //     if (req.body.filters[key].length > 0) {
  //       if (key === "price") {
  //         // gte -  greater than price [0-10]
  //         // lte - less than
  //         findArgs[key] = {
  //           $gte: req.body.filters[key][0],
  //           $lte: req.body.filters[key][1],
  //         };
  //       } else {
  //         findArgs[key] = req.body.filters[key];
  //       }
  //     }
  //   }

  //   let products = await Product.find(findArgs)
  //     .select("-photo")
  //     .populate("category")
  //     .sort([[sortBy, order]])
  //     .skip(skip)
  //     .limit(limit);
  //   if (!products) {
  //     return res.status(400).json({ msg: "Not found" });
  //   } else {
  //     res.json({ size: products.length, data: products });
  //   }
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).json({ msg: "Server error" });
  // }
});

router.get("/list/categories", async (req, res) => {
  try {
    let productsInCategory = await Product.distinct("category", {});
    res.json(productsInCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/photo/:pId", async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.pId);
    if (!product) {
      return res.status(400).json({
        msg: "Product Not Found",
      });
    }
    req.product = product;

    if (req.product.photo.data) {
      res.set("Content-Type", req.product.photo.contentType);
      return res.send(req.product.photo.data);
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/products/search", (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category !== "All") {
      query.category = req.query.category;
    }
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          msg: "not found",
        });
      }
      res.json(products);
    }).select("-photo");
  }
});

module.exports = router;
