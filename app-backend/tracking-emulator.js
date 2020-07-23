const Children = require("./models/children");


const updatePositions = async () => {
  let allChildrens = await Children.find();
  for (let children of allChildrens) {
    let position = { longitude: parseFloat(children.position.longitude) + 0.0005, latitude: parseFloat(children.position.latitude) + 0.0005 , time : Date.now() };
    await Children.findByIdAndUpdate(children._id, { position, $push: { positionHistory: position } });
  }
}




const trackingEmulator = () => {
  //call every 3 minutes
  setInterval(() => {
    updatePositions();
  }, 90000);
};

module.exports = trackingEmulator;