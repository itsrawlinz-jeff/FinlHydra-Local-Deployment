import { c as create_ssr_component, a as subscribe, e as escape, v as validate_component } from './ssr-2e76ef4d.js';
import { f as findCurrentModel, w as webSearchParameters, C as ChatWindow } from './ChatWindow-2560721d.js';
import { w as writable } from './index2-05938230.js';
import { p as page } from './stores-455a5c75.js';
import { e as error } from './errors-d632a283.js';
import { t as titleUpdate } from './titleUpdate-ae4a3ca1.js';
import './Logo-fc57bb03.js';
import './public-966d5c04.js';
import 'marked';
import './paths-05fee424.js';

const pendingMessage = writable();
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_pendingMessage;
  let $$unsubscribe_error;
  let $$unsubscribe_titleUpdate;
  let $$unsubscribe_webSearchParameters;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_pendingMessage = subscribe(pendingMessage, (value) => value);
  $$unsubscribe_error = subscribe(error, (value) => value);
  $$unsubscribe_titleUpdate = subscribe(titleUpdate, (value) => value);
  $$unsubscribe_webSearchParameters = subscribe(webSearchParameters, (value) => value);
  let { data } = $$props;
  let messages = data.messages;
  let lastLoadedMessages = data.messages;
  let webSearchMessages = [];
  let loading = false;
  let pending = false;
  let files = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (data.messages !== lastLoadedMessages) {
        messages = data.messages;
        lastLoadedMessages = data.messages;
      }
    }
    {
      $page.params.id, loading = false;
    }
    title = data.conversations.find((conv) => conv.id === $page.params.id)?.title ?? data.title;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-626amo_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous"><!-- HEAD_svelte-626amo_END -->`, ""} ${validate_component(ChatWindow, "ChatWindow").$$render(
      $$result,
      {
        loading,
        pending,
        messages,
        shared: data.shared,
        preprompt: data.preprompt,
        models: data.models,
        currentModel: findCurrentModel([...data.models, ...data.oldModels], data.model),
        settings: data.settings,
        webSearchMessages,
        files
      },
      {
        webSearchMessages: ($$value) => {
          webSearchMessages = $$value;
          $$settled = false;
        },
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  $$unsubscribe_pendingMessage();
  $$unsubscribe_error();
  $$unsubscribe_titleUpdate();
  $$unsubscribe_webSearchParameters();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-0214b57c.js.map
