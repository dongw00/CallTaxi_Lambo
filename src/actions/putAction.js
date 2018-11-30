const PUT_URL =
  'https://cyj1ma1ju7.execute-api.us-east-2.amazonaws.com/test/mylocation';

export function putAction(lat, lng) {
  const data = {
    mLat: 1.1122,
    mLon: 1.3333,
  };
  /*
  const data = {
    mLat: `${lat}`,
    mLon: `${lng}`
  };
  */
  console.log(data);
  return fetch(PUT_URL, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res;
    })
    .catch(err => err);
}
