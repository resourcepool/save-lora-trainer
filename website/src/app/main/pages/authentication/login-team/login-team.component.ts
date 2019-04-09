import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { first, takeUntil } from 'rxjs/operators';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from '../i18n/en';
import { locale as french } from '../i18n/fr';

import { AuthenticationService } from 'app/_services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService, UserService } from '../../../../_services';
import { Subject } from 'rxjs';

@Component({
    selector   : 'login-team',
    templateUrl: './login-team.component.html',
    styleUrls  : ['./login-team.component.scss'],
    animations : fuseAnimations
})
export class LoginTeamComponent implements OnInit, OnDestroy
{
    loginForm: FormGroup;
    error: any = null;
    returnUrl: string;
    loading = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param {FuseTranslationLoaderService} translationLoader
     * @param {AuthenticationService} authenticationService
     * @param {ActivatedRoute} route
     * @param {Router} router
     * @param {UserService} userService
     * @param {Title} titleService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private translationLoader: FuseTranslationLoaderService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private titleService: TitleService,
    )
    {
        this.translationLoader.loadTranslations(english, french);
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.checkLogin();
        this._unsubscribeAll = new Subject();
        this.titleService.setTitle('Login');
        this.loginForm = this._formBuilder.group({
            clientId   : ['', [Validators.required]],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(): void {
        this.loading = true;
        this.authenticationService
            .authenticateTeam(this.loginForm.get('clientId').value)
            .pipe(
                first(),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                },
                () => { this.loading = false; }
            );
    }

    checkLogin() {
        if (this.userService.getClientId().length) {
            this.router.navigate(['/']);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
