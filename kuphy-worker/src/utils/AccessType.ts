import { error } from "console";

class AccessType {

    private constructor(access: any) { }

    static User: AccessType = "user"

    static Admin: AccessType = "admin"

    static Invalid: AccessType = "invalid"


    static IsValid(value: string) {

        return this.GetAccess(value) !== this.Invalid
    }

    static GetAccess(access: any) {

        if (!access) return AccessType.Invalid;

        const value = (access.toString() || "").toLowerCase().trim()

        if (value === this.User.toString()) return this.User

        if (value === this.Admin.toString()) return this.Admin

        return this.Invalid
    }
}

export default AccessType