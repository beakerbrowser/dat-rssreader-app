const html = require('choo/html')

module.exports = function (state, emit) {
  return html`<div class="inbox">
    ${state.inbox.length === 0 ? html`<div class="intro">
      <p>Add a dat:// RSS xml file as a source to get started.</p>
    </div>` : ''}
    ${state.inbox.map(item => {
      var url = fixUrl(item.link, item.source.origin)
      return html`<div class="item">
        <div class="source">
          <a href=${item.source.origin} target="_blank">${item.source.feed.title}</a>
        </div>
        <div class="title">
          <a href=${url} target="_blank">${item.title}</a>
        </div>
        <div class="pubdate">
          ${item.pubdate.fromNow()}
        </div>
      </div>`
    })}
  </div>`
}

function fixUrl (link, sourceOrigin) {
  if (link && link.href) {
    link = link.href
  }
  // make sure the link is the dat address
  if (!link.startsWith('dat://')) {
    try {
      var urlp = new URL(link)
      link = urlp.pathname + urlp.hash
    } catch (e) {}
  }
  // make sure the link has an origin
  if (link.startsWith('/')) {
    if (sourceOrigin.endsWith('/')) {
      return sourceOrigin + link.slice(1)
    }
    return sourceOrigin + link
  }
  return link
}