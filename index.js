var port = process.env.PORT || 3000

var app = require('express')()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

var server = require('http').Server(app)
server.listen(port)

var integrationTools = require('./lib/integrationTools')

app.post('/pull_request', function (req, res) {
  const {action, pull_request, label, repo, installation} = req.body
  switch (action) {
    case 'labeled':
      if (label.name === 'featuredeploy') {
        integrationTools.makeGithubFeatureDeployComments({
          installationId: installation.id,
          pullUrl: pull_request.url,
          message: 'deploying'
        })
      }
      break
    case 'unlabeled':
      if (label.name === 'featuredeploy') {

      }
      break
  }
  res.sendStatus(200)
})
