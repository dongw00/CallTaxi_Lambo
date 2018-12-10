const LAMBDA_URL =
  'https://cyj1ma1ju7.execute-api.us-east-2.amazonaws.com/test/getcarlocation';

export function getAction() {
  return fetch(LAMBDA_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) throw Error('Network request failed');
      return res;
    })
    .then(data => data.json())
    .then(resData => console.log(`resData is ${resData}`))
    .catch(err => err);
}
