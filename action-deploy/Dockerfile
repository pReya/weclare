FROM node:10-alpine

LABEL "com.github.actions.name"="Build and deploy"
LABEL "com.github.actions.description"="Build and deploy Weclare to GitHub Pages."
LABEL "com.github.actions.icon"="alert-circle"
LABEL "com.github.actions.color"="gray-dark"

LABEL "repository"="https://github.com/pReya/weclare/"
LABEL "homepage"="https://github.com/pReya/weclare/"
LABEL "maintainer"="Moritz Stückler <moritz.stueckler@gmail.com>"

RUN set -xe \
&& apk add --no-cache bash git openssh util-linux \
&& npm install -g npm

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
