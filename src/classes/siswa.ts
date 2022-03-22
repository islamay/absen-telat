
export class SiswaSignupInterface {
    constructor(namaLengkap, nis, email, password) {
        this.namaLengkap = namaLengkap
        this.nis = nis
        this.email = email
        this.password = password
    }

    returnObject() {
        return {
            namaLengkap: this.namaLengkap,
            nis: this.nis,
            email: this.email,
            password: this.password
        }
    }
}