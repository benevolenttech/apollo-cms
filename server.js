/**
 * server.js
 *
 * You can use the default server.js by simply running `next`,
 * but a custom one is required to do express and paramaterized urls like
 * blog/:slug.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * BENEVOLENT WEB LLC BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


const {createServer} = require('http')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

/**
 * Parameterized Routing with next-route
 *
 * Benefits: Less code, and easily handles complex url structures
 */

const routes = require('./routes')
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  createServer(handler)
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
})


// /**
//  * Parameterized Routing without next-route
//  *
//  * Benefits: More control, but more verbose and less featured
//  */
//
// const {parse} = require('url')
// const handle = app.getRequestHandler()
//
// const pathMatch = require('path-match')()
// var routes = [
//   {match: pathMatch('/blog/:id'), page: '/blog/entry'},
// ]
//
// app.prepare()
//   .then(() => {
//     createServer((req, res) => {
//       const {pathname, query} = parse(req.url, true)
//       // If route matches, render and return
//       for (var route of routes) {
//         var params = route.match(pathname)
//         if (params !== false) {
//           app.render(req, res, route.page, Object.assign(params, query))
//           return
//         }
//       }
//       // Else, render as usual
//       return handle(req, res)
//     })
//       .listen(port, (err) => {
//         if (err) throw err
//         console.log(`> Ready on http://localhost:${port}`)
//       })
//   })
