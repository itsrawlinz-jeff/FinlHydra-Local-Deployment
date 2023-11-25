import { r as redirect } from './index-64aa7a5e.js';
import { g as getOIDCAuthorizationUrl } from './auth-e3062264.js';
import { b as base } from './paths-05fee424.js';
import 'openid-client';
import 'date-fns';
import './private-327f040b.js';
import './sha256-dddbc214.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

const actions = {
  default: async function({ url, locals, request }) {
    const referer = request.headers.get("referer");
    const authorizationUrl = await getOIDCAuthorizationUrl(
      { redirectURI: `${(referer ? new URL(referer) : url).origin}${base}/login/callback` },
      { sessionId: locals.sessionId }
    );
    throw redirect(303, authorizationUrl);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 5;
const server_id = "src/routes/login/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-282364e9.js.map
