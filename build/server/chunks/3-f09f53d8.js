import { c as collections } from './database-541a19be.js';
import { ObjectId } from 'mongodb';
import { e as error } from './index-64aa7a5e.js';
import { b as authCondition } from './auth-e3062264.js';
import { U as UrlDependency } from './UrlDependency-114c02d5.js';
import './private-327f040b.js';
import 'openid-client';
import 'date-fns';
import './sha256-dddbc214.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

const load = async ({ params, depends, locals }) => {
  let conversation;
  let shared = false;
  if (params.id.length === 7) {
    conversation = await collections.sharedConversations.findOne({
      _id: params.id
    });
    shared = true;
    if (!conversation) {
      throw error(404, "Conversation not found");
    }
  } else {
    conversation = await collections.conversations.findOne({
      _id: new ObjectId(params.id),
      ...authCondition(locals)
    });
    depends(UrlDependency.Conversation);
    if (!conversation) {
      const conversationExists = await collections.conversations.countDocuments({
        _id: new ObjectId(params.id)
      }) !== 0;
      if (conversationExists) {
        throw error(
          403,
          "You don't have access to this conversation. If someone gave you this link, ask them to use the 'share' feature instead."
        );
      }
      throw error(404, "Conversation not found.");
    }
  }
  return {
    messages: conversation.messages,
    title: conversation.title,
    model: conversation.model,
    preprompt: conversation.preprompt,
    shared
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-0214b57c.js')).default;
const server_id = "src/routes/conversation/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/3.687ab424.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.953cfe2b.js","_app/immutable/chunks/index.1fa04a18.js","_app/immutable/chunks/pendingMessage.dfacf87f.js","_app/immutable/chunks/forms.af2b0274.js","_app/immutable/chunks/singletons.021c165b.js","_app/immutable/chunks/stores.2ffbda4a.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/marked.esm.76161808.js","_app/immutable/chunks/titleUpdate.5d1a632c.js"];
const stylesheets = ["_app/immutable/assets/pendingMessage.9da0802e.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-f09f53d8.js.map
