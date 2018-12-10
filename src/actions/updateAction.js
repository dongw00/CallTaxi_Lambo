const LAMBDA_URL =
  'https://cyj1ma1ju7.execute-api.us-east-2.amazonaws.com/test/mylocation';

export function updateAction(selc) {
  let mLat = 0;
  let mLon = 0;
  switch (selc) {
    case 0:
      mLat = 35.158926;
      mLon = 126.850904;
      break;
    case 1:
      mLat = 35.158755;
      mLon = 126.850573;
      break;
    case 2:
      mLat = 35.155086;
      mLon = 126.848545;
      break;
    case 3:
      mLat = 35.158689;
      mLon = 126.855465;
      break;
    case 4:
      mLat = 35.155078;
      mLon = 126.852287;
      break;
    default:
      mLat = 35.158926;
      mLon = 126.850904;
      break;
  }

  const data = {
    select: selc,
    mLat: mLat,
    mLon: mLon,
  };
  return fetch(LAMBDA_URL, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch(err => err);
}
