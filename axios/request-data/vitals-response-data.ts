export default interface VitalsResponseData {
    [key: string] : any;
    _id: string;
    date: string;
    temp: number;
    mmHg: {
        low: number,
        high: number
    },
    spo2: number;
    bpm: number;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}