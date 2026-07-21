export default {
  async fetch(request, env) {
    const expected = 'Basic ' + btoa(`dcramere:${env.ACCESS_PASSWORD}`);
    const auth = request.headers.get('Authorization');

    if (auth !== expected) {
      return new Response('Authentication required.', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="DCRAMERE — enter the access password from your purchase receipt"' },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
