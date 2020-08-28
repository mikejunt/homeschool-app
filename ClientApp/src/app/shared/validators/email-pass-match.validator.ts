import { FormGroup } from "@angular/forms";

export const MatchValidator = function(control: FormGroup) {
    let pswd = control.get('password') || control.get('newPassword') || control.get('email');
    let confirm = control.get('confirm');
    if(!pswd.value && !confirm.dirty && confirm.untouched){
      return null;
    }
    return (pswd.value === confirm.value) ? null : { 'mismatch': true };
}