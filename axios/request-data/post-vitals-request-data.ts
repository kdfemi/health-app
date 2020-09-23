export default interface PostVitalsRequestData {
    [key: string] : any;
    date: string;
    temp: number;
    mmHg: {
        low: number,
        high: number
    },
    spo2: number;
    bpm: number;
    user: string;
}