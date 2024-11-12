export class AppRoutes {
    static base = "/"
    static createOrganization = "/organization/create"
    static organization = "/organization/:name"
    static editOrganization = "/organization/edit/:name"
    static editFpf = "/organization/:organizationName/fpf/:fpfName"
}