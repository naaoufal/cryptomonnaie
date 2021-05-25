const express = require("express");
const router = express.Router();
const wallletController = require("../controllers/wallet.controller");

router.post("/add", wallletController.addWallet);
router.post("/sell", wallletController.sellCrypto);
router.get("/allWallet", wallletController.allWallet)
router.get("/:id", wallletController.findWallet);

module.exports = router;
