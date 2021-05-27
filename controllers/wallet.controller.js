const { Wallet } = require("../models");
const { User } = require("../models");

const findUsersWallet = async (req, res) => {
  try {
      await Wallet.findAll().then(data => {
          res.send(data)
      })
  } catch (error) {
      res.json(error)
  }
}

const addWallet = async (req, res) => {
  try {
    const idUser = req.body.id;
    const currencyPrice = req.body.currencyPrice;
    const cryptoName = req.body.cryp_name;
    const currencyValue = req.body.value;

    const user = await User.findOne({ where : { id: idUser } });
    const newSolde = user.solde - currencyPrice;

    if (user.solde >= currencyPrice) {
      //check existing wallet

      const userWallet = await Wallet.findAll({
        where: {
          id_user: idUser,
          cryp_name: cryptoName,
        },
      });

      if (userWallet.length > 0) {
        // update wallet

        const newValue = userWallet[0].value + currencyValue;

        const updatedWallet = await userWallet[0]
          .update({
            value: newValue,
          })
          .then(() => {
            user.update({
              solde: newSolde,
            });
            res.send(updatedWallet);
          });
      } else {
        const newWallet = await Wallet.create({
          id_user: idUser,
          cryp_name: cryptoName,
          value: currencyValue,
        }).then(() => {
          user.update({
            solde: newSolde,
          });
        });
        res.send(newWallet);
      }
    } else {
      res.send("Solde insuffisant !!!");
    }
  } catch (err) {
    res.json(err);
  }
};

const allWallet = async (req, res) => {
  try {
    await Wallet.findAll().then(data => {
      res.send(data)
      })
  } catch (error) {
    res.json(error)
  }
}

const sellCrypto = async (req, res) => {
  const idUser = req.body.idUser;
  const currencyName = req.body.currencyName;
  const value = req.body.value;
  const currencyPrice = req.body.currencyPrice;

  try {
    const findWallet = await Wallet.findAll({
      where: {
        id_user: idUser,
        cryp_name: currencyName,
      },
    });

    const user = await User.findOne({ where: { id: idUser } });
    const newSolde = user.solde + currencyPrice;

    if (findWallet.length > 0) {
      if (findWallet[0].value >= value) {
        let newValue = findWallet[0].value - value;

        if (newValue < 0) {
          newValue = 0;
        }

        await findWallet[0]
          .update({
            value: newValue,
          })
          .then( () => {
             user.update({
              solde: newSolde,
            });

            res.send(user);
          });
      } else {
        res.send(`Please set a value less than ${value}`);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

const findWallet = async (req, res) => {
  console.log(req.params);

  try {
    const wallet = await Wallet.findOne({ where: { id_user: req.params.id } });

    res.send(wallet);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { findUsersWallet, addWallet, sellCrypto, allWallet, findWallet };
