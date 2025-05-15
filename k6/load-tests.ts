import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
    ],
    // https://grafana.com/docs/k6/latest/using-k6/thresholds/
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<1'], // 95% of requests should be below 200ms
    },
};

// load test stages
// export const options = {
//     stages: [
//         { duration: '30s', target: 1000 },
//         { duration: '30s', target: 100 },
//         { duration: '30s', target: 500 },
//         { duration: '30s', target: 200 },
//         { duration: '30s', target: 1000 },
//         { duration: '30s', target: 10 },
//     ],
// };

// stress test stages
// export const options1 = {
//     stages: [
//         { duration: '30s', target: 1000 },
//         { duration: '30s', target: 100 },
//         { duration: '30s', target: 500 },
//         { duration: '30s', target: 200 },
//         // 11.11 18:00
//         { duration: '2m', target: 200000 },
//         { duration: '1m', target: 100000 },
//     ],
// };

// soak test stages
// export const options2 = {
//     stages: [
//         { duration: '1m', target: 10000 },
//         { duration: '1h', target: 10000 },
//         { duration: '5m', target: 100 },
//     ],
// };

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
    // Make a GET request to the target URL
    const res = http.get('http://localhost:3000/hello-world');

    check(res, {
        'response code was 200': (res) => res.status == 200,
    });
}