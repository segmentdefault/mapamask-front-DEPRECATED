export interface Business{
    _id?: string,
    distance: number,
    name: string,
    images: string[],
    email: string,
    phone: string,
    description: string,
    sectors: string[],
    job: string,
    latitude: string,
    longitude: string,
    city: string,
    country: string,
    web: string,
    online: boolean,
    owner: string,
    discount: number
}