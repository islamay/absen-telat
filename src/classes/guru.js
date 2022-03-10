

export class GuruSignupInterface {
    constructor(namaLengkap, email, password, telepon) {
        this.namaLengkap = namaLengkap
        this.email = email,
        this.password = password,
        this.telepon = telepon
    }

    publicData() {
        return {
            namaLengkap: this.namaLengkap,
            email: this.email,
            password: this.password,
            telepon: this.telepon
        }
    }
}

