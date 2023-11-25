import { c as create_ssr_component, e as escape, v as validate_component } from './ssr-2e76ef4d.js';
import { b as PUBLIC_APP_NAME } from './public-966d5c04.js';
import { f as findCurrentModel, C as ChatWindow } from './ChatWindow-2560721d.js';
import './Logo-fc57bb03.js';
import './stores-455a5c75.js';
import 'marked';
import './index2-05938230.js';
import './paths-05fee424.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let loading = false;
  let files = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1o4lg8n_START -->${$$result.title = `<title>${escape(PUBLIC_APP_NAME)}</title>`, ""}<!-- HEAD_svelte-1o4lg8n_END -->`, ""} ${validate_component(ChatWindow, "ChatWindow").$$render(
      $$result,
      {
        loading,
        currentModel: findCurrentModel([...data.models, ...data.oldModels], data.settings.activeModel),
        models: data.models,
        settings: data.settings,
        files
      },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-3500a2fe.js.map
