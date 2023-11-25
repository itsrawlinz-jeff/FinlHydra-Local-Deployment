import { b as authCondition } from './auth-e3062264.js';
import { c as collections } from './database-541a19be.js';
import { e as error } from './index-64aa7a5e.js';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { d as downloadFile } from './downloadFile-841cb4f2.js';
import 'openid-client';
import 'date-fns';
import './private-327f040b.js';
import './sha256-dddbc214.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

const GET = async ({ locals, params }) => {
  const sha256 = z.string().parse(params.sha256);
  const userId = locals.user?._id ?? locals.sessionId;
  if (!userId) {
    throw error(401, "Unauthorized");
  }
  if (params.id.length !== 7) {
    const convId = new ObjectId(z.string().parse(params.id));
    const conv = await collections.conversations.findOne({
      _id: convId,
      ...authCondition(locals)
    });
    if (!conv) {
      throw error(404, "Conversation not found");
    }
  } else {
    const conv = await collections.sharedConversations.findOne({
      _id: params.id
    });
    if (!conv) {
      throw error(404, "Conversation not found");
    }
  }
  const { content, mime } = await downloadFile(sha256, params.id);
  return new Response(content, {
    headers: {
      "Content-Type": mime ?? "application/octet-stream"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-2ee640b5.js.map
