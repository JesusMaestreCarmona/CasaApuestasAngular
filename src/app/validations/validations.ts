import { AbstractControl, Form, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Md5 } from 'ts-md5';

export class Validations {

    static validacionPuntuaciones(form: FormGroup): ValidationErrors {
        switch (form.controls.resultado.value) {
            case "1":
                return (form.controls.puntuacion1.value <= form.controls.puntuacion2.value)? { 'errorPuntos1': true } : null        
            case "X":
                return (form.controls.puntuacion1.value != form.controls.puntuacion2.value)? { 'errorPuntosX': true } : null
            case "2":
                return (form.controls.puntuacion1.value >= form.controls.puntuacion2.value)? { 'errorPuntos2': true } : null
        }
        return  { 'errorPuntos': null }
    }

    static comprobarCurrentPassword(currentPassword): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const md5 = new Md5();
            return md5.appendStr(control.value).end().toString() != currentPassword ? { errorCurrentPassword: true } : null;
        };
    }    

}
