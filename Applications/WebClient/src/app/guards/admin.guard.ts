import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userRole = sessionStorage.getItem('role-user')
        if(userRole && userRole=='admin'){
            return true;
        }

        this.router.navigate(['login'])
        //const results = this.service.getData().find(e => e['_id'] == route.params.id)
        /* if (results) 
            return true; 
        else 
            this.r.navigate(['error']) */
        
        return  false;
    }
}