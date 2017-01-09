FROM cp2017/xvfb

WORKDIR /usr/src/app

# Install ng
RUN npm install -g angular-cli
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/

CMD ["/usr/src/app/start.sh"]
