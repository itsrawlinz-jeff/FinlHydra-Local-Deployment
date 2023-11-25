import { b as base } from './paths-05fee424.js';
import { c as collections } from './database-541a19be.js';
import { r as redirect } from './index-64aa7a5e.js';
import { z } from 'zod';
import { v as validateModel, m as models } from './models-633cd2dd.js';
import { b as authCondition } from './auth-e3062264.js';
import { D as DEFAULT_SETTINGS } from './Settings-a185d4fa.js';
import './private-327f040b.js';
import 'mongodb';
import 'handlebars';
import 'date-fns';
import './downloadFile-841cb4f2.js';
import '@huggingface/inference';
import 'openid-client';
import './sha256-dddbc214.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

const booleanFormObject = z.union([z.literal("true"), z.literal("on"), z.literal("false"), z.null()]).transform((value) => {
  return value === "true" || value === "on";
});
const actions = {
  default: async function({ request, locals }) {
    const formData = await request.formData();
    const { ethicsModalAccepted, ...settings } = z.object({
      shareConversationsWithModelAuthors: booleanFormObject,
      hideEmojiOnSidebar: booleanFormObject,
      ethicsModalAccepted: z.boolean({ coerce: true }).optional(),
      activeModel: validateModel(models),
      customPrompts: z.record(z.string()).default({})
    }).parse({
      hideEmojiOnSidebar: formData.get("hideEmojiOnSidebar"),
      shareConversationsWithModelAuthors: formData.get("shareConversationsWithModelAuthors"),
      ethicsModalAccepted: formData.get("ethicsModalAccepted"),
      activeModel: formData.get("activeModel") ?? DEFAULT_SETTINGS.activeModel,
      customPrompts: JSON.parse(formData.get("customPrompts")?.toString() ?? "{}")
    });
    await collections.settings.updateOne(
      authCondition(locals),
      {
        $set: {
          ...settings,
          ...ethicsModalAccepted && { ethicsModalAcceptedAt: /* @__PURE__ */ new Date() },
          updatedAt: /* @__PURE__ */ new Date()
        },
        $setOnInsert: {
          createdAt: /* @__PURE__ */ new Date()
        }
      },
      {
        upsert: true
      }
    );
    throw redirect(303, request.headers.get("referer") || `${base}/`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 10;
const server_id = "src/routes/settings/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-241044ee.js.map
