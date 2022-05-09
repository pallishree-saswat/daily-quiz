const express = require("express");
const router = express.Router();

// middlewares
const { requireSignin } = require("../controllers/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

// routes
router.post("/category", requireSignin,  create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", requireSignin,update);
router.delete("/category/:slug", requireSignin, remove);


module.exports = router;