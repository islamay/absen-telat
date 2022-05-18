import 'dotenv/config'

export default {
    expo: {
        name: 'Absen smakenza',
        slug: 'AbsenSmakenza',
        description: '',
        version: '1.0.0',
        assetBundlePatterns: [
            '**/*'
        ],
        extra: {
            backend_url: process.env.BACKEND_URL
        }
    }
}