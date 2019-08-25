import { CanLoad, CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean {
        const isLoggedIn = this.loginService.isLoggedIn()

        if (!isLoggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }

        return isLoggedIn
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
     }

     canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
     }
}