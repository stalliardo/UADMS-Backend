// models/Device.js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true },
  deviceName: { type: String, required: true },
  status: { type: String, default: 'inactive' },
  lastUpdated: { type: Date, default: Date.now },
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
