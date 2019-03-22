import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { first } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as french } from '../i18n/fr';

import { TitleService, TeamService, UserService } from '../../../../_services';
import { Router } from '@angular/router';
import { replace, forEach, join } from 'lodash';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    error = '';
    loading = false;
    serverError = false;
    private prefixDevEUI = '13:37:00:00:';

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private translationLoader: FuseTranslationLoaderService,
        private teamService: TeamService,
        private router: Router,
        private titleService: TitleService,
        private userService: UserService,
    ) {
        this.translationLoader.loadTranslations(english, french);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.titleService.setTitle('Register a team');
        this.userService.hasTeam() && this.router.navigate(['/']);
        const devEUIPattern = '13:37:00:00(:[A-Fa-f0-9]{2}){4}';

        this.registerForm = this._formBuilder.group({
            name: ['', Validators.required],
            clientId: ['', [Validators.required, Validators.pattern('[A-Za-z0-9_\-]{3,15}')]],
            devEUI: ['', [Validators.required, Validators.pattern(devEUIPattern)]],
        });
        this.registerForm.get('devEUI').valueChanges.subscribe(currentValue => {
            if (!this.prefixDevEUI.length) {
                this.prefixDevEUI = currentValue;
            }
            if (currentValue.length > this.prefixDevEUI.length) {
                this.onKeyPressed();
            } else if (currentValue.length < this.prefixDevEUI.length) {
                this.onKeyBackspace();
            }
        });


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.serverError = false;

        this.loading = true;
        this.teamService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                () => {
                    this.userService.setTeam(this.registerForm.get('clientId').value);
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;
                    this.error = error;
                    this.serverError = Boolean(error.length);
                });
    }

    onFocus(): void {
        if (!this.registerForm.get('devEUI').value.length) {
            this.registerForm.patchValue({devEUI: this.prefixDevEUI});
        }
    }

    onKeyBackspace(): void {
        const fieldValue = this.registerForm.get('devEUI').value;
        if (fieldValue.length < 12) {
            this.prefixDevEUI = '13:37:00:00:';
            this.registerForm.patchValue({devEUI: this.prefixDevEUI});
        }
    }

    onKeyPressed(): void {
        const fieldValue = this.registerForm.get('devEUI').value;
        const cleanField = fieldValue.split('').filter(letter => letter !== ':');
        let result = [];
        forEach(cleanField, (letter: string, key: number) => {
            result = [...result, letter.toUpperCase()];
            if (key > 0 && key < cleanField.length - 1 && key % 2 === 1) {
                result = [...result, ':'];
            }
        });
        const formattedEUI = join(result, '');
        console.log(formattedEUI, formattedEUI.length);
        this.prefixDevEUI = formattedEUI;
        this.registerForm.patchValue({devEUI: formattedEUI});
    }
}
