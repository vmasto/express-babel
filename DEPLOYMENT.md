# Deployment

This is a small walkthrough on publishing your app in some popular PaaS providers.

#### Contents

- [Heroku](#heroku)
- [App Engine](#app-engine)
- [Elastic Beanstalk on AWS](#elastic-beanstalk-on-aws)

### Heroku

Log in to [Heroku](https://heroku.com) or create a new account if you don't have one.

Then you'll need to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) on your machine. The previous link has detailed instructions.

Create a new app from the dropdown "New" on the top right of Heroku's dashboard screen. Give your app a name and select its servers' location.

Heroku uses [Yarn](https://yarnpkg.com) to install and run npm scripts by default (if it detects a `yarn.lock` file). Unfortunately Yarn has an [outstanding issue](https://github.com/yarnpkg/yarn/issues/761) that makes it hard to build production using it, so we'll need to use `npm` instead.

Create a `.slugignore` file at the root of your repo and add `yarn.lock`:

```sh
touch .slugignore
echo 'yarn.lock' >> .slugignore
```

Then check the file into git. This will instruct Heroku to use `npm` for all builds and commands ([relevant documentation](https://devcenter.heroku.com/articles/nodejs-support#build-behavior)).

On the "Deploy" tab of your new app, under "Deploy using Heroku Git", you will find all the instructions you need:

Log in to your Heroku account via the Heroku CLI:

```sh
heroku login
```

Initialize your git repository with Heroku:

```sh
heroku git:remote -a your-apps-name
```

Deploy your application:

```sh
git push heroku master
```

And you're done! Your app should be running at `https://your-apps-name.herokuapp.com/`.

Relevant documentation on Heroku: [https://devcenter.heroku.com/articles/getting-started-with-nodejs](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

### App Engine

Log in to [Google Cloud Platform](https://console.cloud.google.com/) or create an account if you don't have one.

Then you'll need to install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/) in your local machine.

Authorize `gcloud` to access Google Cloud Platform with:

```sh
gcloud auth login
```

You will be asked to enter your Google account's credentials in a new browser window. [Relevant Documentation](https://cloud.google.com/sdk/gcloud/reference/auth/login)

After you've done this create an `app.yaml` file at your project's root with the following contents:

```yaml
runtime: nodejs
env: flex
# Temporary setting to keep gcloud from uploading node_modules
skip_files:
 - ^node_modules$
```

Check it into git and then deploy your app:

```sh
gcloud app deploy
```

As an extra step, add the following script to your `package.json` `scripts`:

```
"deploy": "gcloud app deploy app.yaml --version=`echo $(date +%Y%m%dt%H%M%S)-$(git rev-parse HEAD | cut -c1-7)`"
```

Then deploy with:

```sh
yarn run deploy (or npm run deploy)
```

The above script will provide more reasonable versioning naming containing the date (`Y-m-d-H-M-S`) and the hash of your most current commit.

And you're done! Your app should be running at `https://your-project-id.appspot.com`

Relevant documentation on GCP: [https://cloud.google.com/appengine/docs/flexible/nodejs/quickstart](https://cloud.google.com/appengine/docs/flexible/nodejs/quickstart)

### Elastic Beanstalk on AWS

Login to [AWS](https://console.aws.amazon.com/) or create a new account if you don't have one. You should securely store the keys you get from Amazon's IAM service, you'll need them later. How you handle security and authorization is not part of this small guide; you should follow AWS's best practices and authorize with a new IAM user with limited permissions.

Install [AWS's Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html?icmpid=docs_elasticbeanstalk_console) on your local machine.

Then initialize EB CLI, at the root of your project:

```sh
eb init
```

This will prompt you with a set of questions about the project, after you auth your account by providing your access ID and secret key.

Relevant docs for `eb init`: [http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-init.html](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-init.html).

After succesfully creating your EB project, create the environment:

```sh
eb create your-desired-environment-name -d
```

This will create a new environment and deploy all your code to your EB project. Here's some more info on how to customize the environment via the create command: [https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html). For example, you can set your environmental variables in one go with `--envvars`.

Now if you need to deploy new updates simply run:

```sh
eb deploy
```

And you're done!

Note that all the above steps can be done via AWS's web interface as well but the EB CLI provides with a much simpler process.
