import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, distinctUntilChanged, map, subscribeOn } from 'rxjs/operators';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: true,
    imports: [SharedModule],
})

export class BreadcrumbComponent implements OnInit {


    public breadcrumbs!: Breadcrumb[];

    /**
    /*.filter(event => event instanceof NavigationEnd)
   .distinctUntilChanged()
   .map(event =>  this.buildBreadCrumb(this.activatedRoute.root)); */

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        let breadcrumb: Breadcrumb = {
            label: 'Home',
            url: ''
        };

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
            //set breadcrumbs
            let root: ActivatedRoute = this.route.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
            this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];

        });

    }


    private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = 'title';
        // debugger
        //get the child routes
        let children: ActivatedRoute[] = route.children;
        console.log(route);
        console.log(route.children);

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length == 0) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            //append route URL to URL
            url += `/${routeURL}`;

            //add breadcrumb
            let breadcrumb: Breadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                url: url
            };
            breadcrumbs.push(breadcrumb);

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }

    goToUrl(url: any) {
        this.router.navigateByUrl(url);
    }
    logout() {
        sessionStorage.clear();
        this.router.navigateByUrl('/customer-login');

        // this.router.navigate(['/all-schemes']);
        // this.router.navigate([this.route.snapshot.url.join('/')], {
        //     relativeTo: this.route
        // });


    }

}

export interface Breadcrumb {
    label: string;
    url: string;
}

