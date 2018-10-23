const html = require('choo/html')

module.exports = function (state, emit) {
  return html`<div class="inbox">
    ${state.inbox.length === 0 ? html`<div class="intro">
      <p>Add a dat:// RSS xml file as a source to get started.</p>
    </div>` : ''}
    ${state.inbox.map(item => {
      var url = getUrl(item)
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

function getUrl (item) {
  var link = item.link
  if (link && link.href) {
    link = link.href
  }
  if (link.startsWith('/')) {
    if (item.source.origin.endsWith('/')) {
      link = item.source.origin + link.slice(1)
    } else {
      link = item.source.origin + link      
    }
  }
  return link
}