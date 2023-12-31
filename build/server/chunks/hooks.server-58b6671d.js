import { C as COOKIE_NAME } from './private-327f040b.js';
import { P as PUBLIC_APP_DISCLAIMER, a as PUBLIC_GOOGLE_ANALYTICS_ID } from './public-966d5c04.js';
import { c as collections } from './database-541a19be.js';
import { b as base } from './paths-05fee424.js';
import { r as requiresUser, a as refreshSessionCookie } from './auth-e3062264.js';
import { E as ERROR_MESSAGES } from './errors-d632a283.js';
import 'mongodb';
import 'openid-client';
import 'date-fns';
import './sha256-dddbc214.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import './index2-05938230.js';
import './ssr-2e76ef4d.js';

const handle = async ({ event, resolve }) => {
  const token = event.cookies.get(COOKIE_NAME);
  event.locals.sessionId = token || crypto.randomUUID();
  const user = await collections.users.findOne({ sessionId: event.locals.sessionId });
  if (user) {
    event.locals.user = user;
  }
  function errorResponse(status, message) {
    const sendJson = event.request.headers.get("accept")?.includes("application/json") || event.request.headers.get("content-type")?.includes("application/json");
    return new Response(sendJson ? JSON.stringify({ error: message }) : message, {
      status,
      headers: {
        "content-type": sendJson ? "application/json" : "text/plain"
      }
    });
  }
  const requestContentType = event.request.headers.get("content-type")?.split(";")[0] ?? "";
  const nativeFormContentTypes = [
    "multipart/form-data",
    "application/x-www-form-urlencoded",
    "text/plain"
  ];
  if (event.request.method === "POST" && nativeFormContentTypes.includes(requestContentType)) {
    const referer = event.request.headers.get("referer");
    if (!referer) {
      return errorResponse(403, "Non-JSON form requests need to have a referer");
    }
    const validOrigins = [
      new URL(event.request.url).origin,
      ...[]
    ];
    if (!validOrigins.includes(new URL(referer).origin)) {
      return errorResponse(403, "Invalid referer for POST request");
    }
  }
  if (!event.url.pathname.startsWith(`${base}/login`) && !event.url.pathname.startsWith(`${base}/admin`) && !["GET", "OPTIONS", "HEAD"].includes(event.request.method)) {
    if (!user && requiresUser && !(0 > 0)) {
      return errorResponse(401, ERROR_MESSAGES.authOnly);
    }
    if (!requiresUser && !event.url.pathname.startsWith(`${base}/settings`) && !!PUBLIC_APP_DISCLAIMER) {
      const hasAcceptedEthicsModal = await collections.settings.countDocuments({
        sessionId: event.locals.sessionId,
        ethicsModalAcceptedAt: { $exists: true }
      });
      if (!hasAcceptedEthicsModal) {
        return errorResponse(405, "You need to accept the welcome modal first");
      }
    }
  }
  refreshSessionCookie(event.cookies, event.locals.sessionId);
  let replaced = false;
  const response = await resolve(event, {
    transformPageChunk: (chunk) => {
      if (replaced || !chunk.html.includes("%gaId%")) {
        return chunk.html;
      }
      replaced = true;
      return chunk.html.replace("%gaId%", PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  });
  return response;
};

export { handle };
//# sourceMappingURL=hooks.server-58b6671d.js.map
