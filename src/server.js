const { ConnectDB } = require('./DB/ConnectDB');
require('dotenv').config();
const { app } = require('./app.js');


ConnectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed  ", error);
  });
