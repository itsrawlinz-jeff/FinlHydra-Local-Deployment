import { e as error, r as redirect } from './index-64aa7a5e.js';
import { v as validateAndParseCsrfToken, c as getOIDCUserData, a as refreshSessionCookie, b as authCondition } from './auth-e3062264.js';
import { z } from 'zod';
import { b as base } from './paths-05fee424.js';
import { c as collections } from './database-541a19be.js';
import { ObjectId } from 'mongodb';
import { D as DEFAULT_SETTINGS } from './Settings-a185d4fa.js';
import 'openid-client';
import 'date-fns';
import './private-327f040b.js';
import './sha256-dddbc214.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import './models-633cd2dd.js';
import 'handlebars';
import './downloadFile-841cb4f2.js';
import '@huggingface/inference';

async function updateUser(params) {
  const { userData, locals, cookies } = params;
  const {
    preferred_username: username,
    name,
    email,
    picture: avatarUrl,
    sub: hfUserId
  } = z.object({
    preferred_username: z.string().optional(),
    name: z.string(),
    picture: z.string(),
    sub: z.string(),
    email: z.string().email().optional()
  }).refine((data) => data.preferred_username || data.email, {
    message: "Either preferred_username or email must be provided by the provider."
  }).parse(userData);
  const existingUser = await collections.users.findOne({ hfUserId });
  let userId = existingUser?._id;
  if (existingUser) {
    await collections.users.updateOne(
      { _id: existingUser._id },
      { $set: { username, name, avatarUrl } }
    );
    refreshSessionCookie(cookies, existingUser.sessionId);
  } else {
    const { insertedId } = await collections.users.insertOne({
      _id: new ObjectId(),
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      username,
      name,
      email,
      avatarUrl,
      hfUserId,
      sessionId: locals.sessionId
    });
    userId = insertedId;
    const { matchedCount } = await collections.settings.updateOne(authCondition(locals), {
      $set: { userId, updatedAt: /* @__PURE__ */ new Date() },
      $unset: { sessionId: "" }
    });
    if (!matchedCount) {
      await collections.settings.insertOne({
        userId,
        ethicsModalAcceptedAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        createdAt: /* @__PURE__ */ new Date(),
        ...DEFAULT_SETTINGS
      });
    }
  }
  await collections.conversations.updateMany(authCondition(locals), {
    $set: { userId },
    $unset: { sessionId: "" }
  });
}
async function load({ url, locals, cookies }) {
  const { error: errorName, error_description: errorDescription } = z.object({
    error: z.string().optional(),
    error_description: z.string().optional()
  }).parse(Object.fromEntries(url.searchParams.entries()));
  if (errorName) {
    throw error(400, errorName + (errorDescription ? ": " + errorDescription : ""));
  }
  const { code, state } = z.object({
    code: z.string(),
    state: z.string()
  }).parse(Object.fromEntries(url.searchParams.entries()));
  const csrfToken = Buffer.from(state, "base64").toString("utf-8");
  const validatedToken = await validateAndParseCsrfToken(csrfToken, locals.sessionId);
  if (!validatedToken) {
    throw error(403, "Invalid or expired CSRF token");
  }
  const { userData } = await getOIDCUserData({ redirectURI: validatedToken.redirectUrl }, code);
  await updateUser({ userData, locals, cookies });
  throw redirect(302, `${base}/`);
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
const server_id = "src/routes/login/callback/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-7cd7d35e.js.map
