export class AppRoutes {
    static base = "/"
    static createOrganization = "/organization/create"
    static organization = "/organization/:name"
    static editFpf = "/organization/:organizationName/fpf/:fpfName/edit"
    static displayFpf = "/organization/:organizationName/fpf/:fpfName"
    static editUserProfile = "/userprofile/edit"
}