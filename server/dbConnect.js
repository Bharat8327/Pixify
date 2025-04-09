const mongoose = require('mongoose');
module.exports = async () => {
  const mongoUrl =
    'mongodb+srv://Patell98:Patell98@social-meida.9q754bx.mongodb.net/?retryWrites=true&w=majority&appName=Social-meida';
  try {
    const connect = await mongoose.connect(mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDb Connected', connect.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
