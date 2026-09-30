#!/bin/sh
# Adds a content-based version to styles.css and main.js links in every page,
# so browsers always fetch the latest files after an update. Run after editing CSS/JS.
cd "$(dirname "$0")"
CSS=$(md5sum assets/css/styles.css | cut -c1-8)
JS=$(md5sum assets/js/main.js | cut -c1-8)
sed -i -E "s#assets/css/styles\.css(\?v=[a-z0-9]+)?\"#assets/css/styles.css?v=$CSS\"#; s#assets/js/main\.js(\?v=[a-z0-9]+)?\"#assets/js/main.js?v=$JS\"#" *.html
echo "css=$CSS js=$JS"
