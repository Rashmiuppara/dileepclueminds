var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name:    String,
  email:   String,
  phoneno: String,
  subject: String,
  message: String
}, {collection: 'contacts'});

/*
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.user.password);
};

userSchema.methods.updateUser = function(request, response){

	this.user.name = request.body.name;
	this.user.address = request.body.address;
	 this.user.save();
	response.redirect('/user');
};
*/

var Contacts = mongoose.model('Contacts', contactSchema);


module.exports = Contacts;
