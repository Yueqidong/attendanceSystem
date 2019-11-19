import { Accounts } from 'meteor/accounts-base';
import '/lib/router.js'


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
