# node official image contains `yarn`
FROM node:8-jessie

# Without CI=true, test will fail due to ENOSPC of file-system watch
ENV CI true

COPY package*.json yarn.lock ./
# ref: https://github.com/yarnpkg/yarn/issues/749
RUN yarn install --frozen-lockfile --non-interactive && yarn cache clean
# Should cache above layer in CI/CD

ADD . .
# TODO: Remove --passWithNoTests flag when we add some tests (e.g. tests of model or infrastructure layer)
RUN yarn test --ci=true --color=false --passWithNoTests
RUN yarn build
# Districute ./build/**

# TODO: Run this in GitHub Actions to publish ./build/** contents into S3 or something.
