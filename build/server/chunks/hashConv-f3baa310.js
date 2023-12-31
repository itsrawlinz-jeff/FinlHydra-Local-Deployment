import { s as sha256 } from './sha256-dddbc214.js';

async function hashConv(conv) {
  const messages = conv.messages.map((message) => {
    return (({ from, id, content, webSearchId }) => ({ from, id, content, webSearchId }))(message);
  });
  const hash = await sha256(JSON.stringify(messages));
  return hash;
}

export { hashConv as h };
//# sourceMappingURL=hashConv-f3baa310.js.map
