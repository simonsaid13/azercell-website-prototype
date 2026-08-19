/* HTTP Basic Auth — runs on Vercel Edge only (not the local Python server). */

var USER = 'azercell';
var PASS = 'Az3-o67wm5ZoYKvN6LrbTE';
var REALM = 'Azercell Prototype';

export default function middleware(request) {
  var auth = request.headers.get('authorization');

  if (auth && auth.indexOf('Basic ') === 0) {
    var encoded = auth.slice(6);
    var decoded = atob(encoded);
    var split = decoded.indexOf(':');
    var user = decoded.slice(0, split);
    var pass = decoded.slice(split + 1);

    if (user === USER && pass === PASS) return;
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="' + REALM + '", charset="UTF-8"'
    }
  });
}

export const config = {
  matcher: ['/((?!_vercel).*)']
};
