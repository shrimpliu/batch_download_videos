const superagent = require('superagent');
const cheerio = require('cheerio');
const shell = require('shelljs');

//node youku.js http://v.youku.com/v_show/id_XMjY4MjA5MDIxMg==.html 人民的名义

const url = process.argv[2];
const name = process.argv[3];

shell.exec('mkdir ' + name);

superagent.get(url).end(function (err, res) {
    if (err) {
        console.error(err);
    }

    const $ = cheerio.load(res.text);
    const items = $('.tvlists .items').children('.item');
    items.each(function (i, item) {
        const href = $(item).children('a').first().attr('href');
        if (href) {
            const cmd = `cd ${name} && you-get http:${href}`;
            console.log(cmd);
            shell.exec(cmd);
        }
    });

});

