const userRepository = require('../users/repository');
const sha256 = require('sha256');

const authenticateController = (() => {
  const post = async (req, res) => {
    const { email, password } = req.body;
    try {
      let result;
      const passwordEntered = sha256(password);
      const userData = await userRepository.findOne({ email });
      if (!userData || !userData.role || passwordEntered !== userData.password) {
        result = { authorized: false }
      } else {
        result = {
          authorized: true,
          user: {
            _id: userData._id,
            name: userData.name,
            role: userData.role
          }
        }
      }
      if (!result.authorized) {
        console.log('EMAIL %s unauthorized', email);
        return res.sendStatus(401);
      }
      res.json(result);
    } catch (err) {
      console.log('Error on user email %s. Error %o', email, err);
      res.sendStatus(500);
    }
  };
  return {
    post
  };
})();

module.exports = authenticateController;
