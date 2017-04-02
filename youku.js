const superagent = require('superagent');
const cheerio = require('cheerio');
const shell = require('shelljs');

//node youku.js http://v.youku.com/v_show/id_XMjY4MjA5MDIxMg==.html 人民的名义 1 5

const url = process.argv[2];
const name = process.argv[3];
let start = process.argv[4] || 1; //起始集数
let end = process.argv[5] || 0;   //结束集数，为0表示全部

if (start <= 0) start = 1;

shell.exec('mkdir ' + name);

superagent.get(url).end(function (err, res) {
    if (err) {
        console.error(err);
    }

    const $ = cheerio.load(res.text);
    const items = $('.tvlists .items').children('.item');
    if (end <= 0 || end > items.length) {
        end = items.length;
    }
    items.each(function (i, item) {
        if (i >= start - 1 && i < end) {
            const href = $(item).children('a').first().attr('href');
            if (href) {
                const cmd = `cd ${name} && you-get http:${href}`;
                console.log(cmd);
                shell.exec(cmd);
            }
        }
    });

});

