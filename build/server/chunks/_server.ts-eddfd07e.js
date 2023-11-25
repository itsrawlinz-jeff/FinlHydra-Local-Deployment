import { b as authCondition } from './auth-e3062264.js';
import { c as collections } from './database-541a19be.js';
import { e as error } from './index-64aa7a5e.js';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import 'openid-client';
import 'date-fns';
import './private-327f040b.js';
import './sha256-dddbc214.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

async function POST({ params, request, locals }) {
  const { score } = z.object({
    score: z.number().int().min(-1).max(1)
  }).parse(await request.json());
  const conversationId = new ObjectId(params.id);
  const messageId = params.messageId;
  const document = await collections.conversations.updateOne(
    {
      _id: conversationId,
      ...authCondition(locals),
      "messages.id": messageId
    },
    {
      ...score !== 0 ? {
        $set: {
          "messages.$.score": score
        }
      } : { $unset: { "messages.$.score": "" } }
    }
  );
  if (!document.matchedCount) {
    throw error(404, "Message not found");
  }
  return new Response();
}

export { POST };
//# sourceMappingURL=_server.ts-eddfd07e.js.map
