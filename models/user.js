var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  profile: {
    name: { type: String, default: '' },
    picture: { type: String, default: '' }
  },
  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: 0 },
    // item: { type: Schema.Types.}
  }]
});

UserSchema.pre('save', function(next) {
  var user = this;
  console.log('pre');
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    console.log('inside gensalt', err, salt);
    if(err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      console.log('inside hash', err, hash);
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);