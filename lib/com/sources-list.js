const html = require('choo/html')

module.exports = function (state, emit) {
  return html`<div class="sources-list">
    <form onsubmit=${onAdd}>
      <input name="sourceUrl" type="text" placeholder="Add source" />
      <button>Add</button>
    </form>
    ${state.sources.length === 0 ? html`<div class="source">No sources.</div>` : ''}
    ${state.sources.map(source => {
      return html`<div class="source">
        <a href=${source.url} target="_blank">${getTitle(source)}</a>
        <span class="remove" onclick=${onRemove(source.url)}>${times()}</span>
        ${renderError(source.error)}
      </div>`
    })}
  </div>`

  function onAdd (e) {
    e.preventDefault()
    emit('add-source', e.target.sourceUrl.value)
  }

  function onRemove (sourceUrl) {
    return e => emit('remove-source', sourceUrl)
  }
}

function renderError (err) {
  if (!err) return ''
  return html`<div class="error">${err.toString()}</div>`
}

function getTitle (source) {
  if (source.feed) {
    return source.feed.title || source.origin
  }
  return 'loading...'
}

function times () {
  var el = html`<span />`
  el.innerHTML = '&times;'
  return el
}