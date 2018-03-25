# tbd_dot_space

The public site for tbd_.

## Setting things up

1. `git clone`
2. `npm install`

## Running in dev

1. `npm run dev`

## Deploying to staging

1. `now --dotenv=.env.staging`
2. Go to https://manage.auth0.com/#/clients, select the tbd "regular web application" client.
3. In Settings, add "[the now deployment URL on your clipboard]/auth0-callback" to Allowed Callback URLs. This will make it possible to sign in on that staging URL. Hoping to find a better way to do this, but Auth0 doesn't allow wildcards in that field, the `now` deployments all get unique URLs (a new one for each [immutable deployment](https://zeit.co/docs/other/faq#how-do-i-update-my-deployment's-files-or-code)).


## Deploying to production

1. `now --dotenv=.env.production`
2. `now alias [url that now copied to your clipboard] tbd.space`
