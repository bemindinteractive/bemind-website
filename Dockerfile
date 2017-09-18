FROM jekyll/jekyll:3.5

COPY Gemfile Gemfile.lock /tmp/jekyll/

WORKDIR /tmp/jekyll

RUN bundle install

COPY . /tmp/jekyll/

ENV JEKYLL_ENV=production

RUN jekyll build && mv .htaccess dist/.htaccess

FROM httpd:2.4-alpine

COPY --from=0 /tmp/jekyll/dist /usr/local/apache2/htdocs

RUN sed -i 's,#LoadModule rewrite_module,LoadModule rewrite_module,g' /usr/local/apache2/conf/httpd.conf \
 && cat /usr/local/apache2/htdocs/.htaccess >> /usr/local/apache2/conf/httpd.conf