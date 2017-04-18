const Strategy = require('passport-local').Strategy;

let {findEmailUser} = require('../model/db.js');
let {decrypt_pass} = require('../model/crypto_passwd.js');

module.exports = function(passport) {

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(function(email,done){
      findEmailUser(email)
      .then(result => {
        done(null,result.rows[0]);
      }),
      err => { done(err,null);}
    }
  );

  passport.use(new Strategy({
      usernameField: 'email',
      passwordField: 'passwd'
    },
    (email,password,done) => {
      findEmailUser(email)
      .then(result => {
        if(!result.rowCount) {
          return done(null,false, { message: 'Unknown user ' + email });
        }

        if(decrypt_pass(result.rows[0].passwd) != password) {
          return done(null,false);
        } else {
          return done(null,result.rows[0]);
        }
      })
      .catch(err => {return done(err);});
    }
  ));
};
