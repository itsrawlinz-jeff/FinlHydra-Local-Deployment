import { r as redirect } from './index-64aa7a5e.js';
import { c as collections } from './database-541a19be.js';
import { U as UrlDependency } from './UrlDependency-114c02d5.js';
import { v as validateModel, d as defaultModel, m as models, o as oldModels } from './models-633cd2dd.js';
import { b as authCondition, r as requiresUser } from './auth-e3062264.js';
import { D as DEFAULT_SETTINGS } from './Settings-a185d4fa.js';
import { U as USE_LOCAL_WEBSEARCH } from './private-327f040b.js';
import 'mongodb';
import 'handlebars';
import 'zod';
import 'date-fns';
import './downloadFile-841cb4f2.js';
import '@huggingface/inference';
import 'openid-client';
import './sha256-dddbc214.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

const load = async ({ locals, depends, url }) => {
  const { conversations } = collections;
  const urlModel = url.searchParams.get("model");
  depends(UrlDependency.ConversationList);
  if (urlModel) {
    const isValidModel = validateModel(models).safeParse(urlModel).success;
    if (isValidModel) {
      await collections.settings.updateOne(
        authCondition(locals),
        { $set: { activeModel: urlModel } },
        { upsert: true }
      );
    }
    throw redirect(302, url.pathname);
  }
  const settings = await collections.settings.findOne(authCondition(locals));
  if (settings && !validateModel(models).safeParse(settings?.activeModel).success) {
    settings.activeModel = defaultModel.id;
    await collections.settings.updateOne(authCondition(locals), {
      $set: { activeModel: defaultModel.id }
    });
  }
  const totalMessages = (await conversations.aggregate([
    { $match: authCondition(locals) },
    { $project: { messages: 1 } },
    { $unwind: "$messages" },
    { $match: { "messages.from": "assistant" } },
    { $count: "messages" }
  ]).toArray())[0]?.messages ?? 0;
  const messagesBeforeLogin = 0;
  const userHasExceededMessages = messagesBeforeLogin > 0 && totalMessages > messagesBeforeLogin;
  const loginRequired = requiresUser && !locals.user && userHasExceededMessages;
  return {
    conversations: await conversations.find(authCondition(locals)).sort({ updatedAt: -1 }).project({
      title: 1,
      model: 1,
      _id: 1,
      updatedAt: 1,
      createdAt: 1
    }).map((conv) => ({
      id: conv._id.toString(),
      title: settings?.hideEmojiOnSidebar ? conv.title.replace(/\p{Emoji}/gu, "") : conv.title,
      model: conv.model ?? defaultModel
    })).toArray(),
    settings: {
      shareConversationsWithModelAuthors: settings?.shareConversationsWithModelAuthors ?? DEFAULT_SETTINGS.shareConversationsWithModelAuthors,
      ethicsModalAcceptedAt: settings?.ethicsModalAcceptedAt ?? null,
      activeModel: settings?.activeModel ?? DEFAULT_SETTINGS.activeModel,
      hideEmojiOnSidebar: settings?.hideEmojiOnSidebar ?? false,
      searchEnabled: !!USE_LOCAL_WEBSEARCH,
      customPrompts: settings?.customPrompts ?? {}
    },
    models: models.map((model) => ({
      id: model.id,
      name: model.name,
      websiteUrl: model.websiteUrl,
      modelUrl: model.modelUrl,
      datasetName: model.datasetName,
      datasetUrl: model.datasetUrl,
      displayName: model.displayName,
      description: model.description,
      promptExamples: model.promptExamples,
      parameters: model.parameters,
      preprompt: model.preprompt,
      multimodal: model.multimodal
    })),
    oldModels,
    user: locals.user && {
      username: locals.user.username,
      avatarUrl: locals.user.avatarUrl,
      email: locals.user.email
    },
    loginRequired,
    loginEnabled: requiresUser,
    guestMode: requiresUser && messagesBeforeLogin > 0
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-9055572c.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.af21a609.js","_app/immutable/chunks/scheduler.953cfe2b.js","_app/immutable/chunks/index.1fa04a18.js","_app/immutable/chunks/forms.af2b0274.js","_app/immutable/chunks/singletons.021c165b.js","_app/immutable/chunks/stores.2ffbda4a.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/titleUpdate.5d1a632c.js"];
const stylesheets = ["_app/immutable/assets/0.42a1e4fb.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-4d3c685d.js.map
