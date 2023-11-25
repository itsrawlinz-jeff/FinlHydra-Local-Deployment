import { b as authCondition } from './auth-e3062264.js';
import { c as collections } from './database-541a19be.js';
import { e as error } from './index-64aa7a5e.js';
import { ObjectId } from 'mongodb';
import 'openid-client';
import 'date-fns';
import './private-327f040b.js';
import './sha256-dddbc214.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

async function POST({ params, locals }) {
  const conversationId = new ObjectId(params.id);
  const conversation = await collections.conversations.findOne({
    _id: conversationId,
    ...authCondition(locals)
  });
  if (!conversation) {
    throw error(404, "Conversation not found");
  }
  await collections.abortedGenerations.updateOne(
    { conversationId },
    { $set: { updatedAt: /* @__PURE__ */ new Date() }, $setOnInsert: { createdAt: /* @__PURE__ */ new Date() } },
    { upsert: true }
  );
  return new Response();
}

export { POST };
//# sourceMappingURL=_server.ts-c703bbbf.js.map
