import { d as dev } from './environment-03c3dd82.js';
import { b as base } from './paths-05fee424.js';
import { C as COOKIE_NAME } from './private-327f040b.js';
import { r as redirect } from './index-64aa7a5e.js';
import './prod-ssr-7cc47430.js';

const actions = {
  default: async function({ cookies }) {
    cookies.delete(COOKIE_NAME, {
      path: "/",
      // So that it works inside the space's iframe
      sameSite: "none",
      secure: !dev,
      httpOnly: true
    });
    throw redirect(303, `${base}/`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 7;
const server_id = "src/routes/logout/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-49b2e5ef.js.map
