

require("dotenv").config();

const port = process.env.APP_PORT || 5001;

const app = require("./src/app")


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
