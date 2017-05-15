module.exports = (state, emitter) => {
  state.inbox = []

  emitter.on('source-added', onSourcesChange)
  emitter.on('source-removed', onSourcesChange)
  function onSourcesChange () {
    state.inbox = [].concat(...state.sources.filter(s => s.feed).map(s => s.feed.items))
    state.inbox.sort((a, b) => (+b.pubdate) - (+a.pubdate))
    emitter.emit('render')
  }
}