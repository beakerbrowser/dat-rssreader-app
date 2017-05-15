const html = require('choo/html')
const choo = require('choo')
const sourcesList = require('./lib/com/sources-list')
const inbox = require('./lib/com/inbox')

var app = choo()

app.route('/', mainView)
app.use(require('./lib/store/sources'))
app.use(require('./lib/store/inbox'))
app.mount('main')

function mainView (state, emit) {
  return html`
    <main>
      ${sourcesList(state, emit)}
      ${inbox(state, emit)}
    </main>
  `
}
