import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class ExamGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userRole = sessionStorage.getItem('role-user')
        if(userRole && userRole=='ProspectiveStudent'){
            return true;
        }

        this.router.navigate([''])
        
        return  false;
    }
}