import http from 'k6/http'
import { check, sleep } from 'k6'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

export const options = {
    stages: [
        { duration: '10s', target: 1 },
        { duration: '10s', target: 3 }, 
        { duration: '10s', target: 5 }, 
        { duration: '5s',  target: 0 }, 
    ],
};

export default function () {
    let res = http.get('https://school.moodledemo.net/login/index.php')

    const logintoken = res.html().find('input[name="logintoken"]').attr('value')

    res = http.post('https://school.moodledemo.net/login/index.php', {
        username: 'teacher',
        password: 'moodle25',
        logintoken: logintoken,
    });

    check(res, {
        'logado com sucesso': (r) => r.url.includes('/my/') || r.body.includes('Dashboard')
    })

    res = http.get('https://school.moodledemo.net/my/courses.php')
    
    check(res, {
        'página interna carregou': (r) => r.status === 200
    })

    sleep(1)

}

export function handleSummary(data) {
  return {
    'loadtest.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true })
  }

}
