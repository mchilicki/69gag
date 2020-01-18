import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

    static MatchPassword(ac: AbstractControl) {
        let password = ac.get('password').value;
        let confirmPassword = ac.get('repeatPassword').value;

        if (password != confirmPassword) {
            ac.get('repeatPassword').setErrors({ matchpassword: true })
        }
    }
}