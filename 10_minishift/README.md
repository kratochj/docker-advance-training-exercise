# Minishift quick intro #

## Prerequisities ##

- Install minishift from [Minishift release page](https://github.com/minishift/minishift/releases)
- Install openshift client tool
  - openshift-origin-client-tools from [Openshift release page](https://github.com/openshift/origin/releases)
  - On Fedora install package `origin-clients`


## Getting started ##

- Deploy application from repo: https://github.com/openshift/nodejs-ex
  - `oc new-app https://github.com/openshift/cakephp-ex`
- Add route to service
