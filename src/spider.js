const rp = require('request-promise');
const $ = require('cheerio');

const scrape = (userid) => {
    const url = `https://leetcode.com/${userid}/`;

    rp(url).then(html => {
        // success
        let name = $('.realname', html).text().replace("\n", "").trim();
        let username = $('.username', html).text().replace("\n", "").trim();
    
        let contest_panel = $('.panel-default:nth-child(2)', html);
        let finished = $('.list-group-item:nth-child(1) > span', contest_panel).text().replace("\n", "").trim();
        let rating = $('.list-group-item:nth-child(2) > span', contest_panel).text().replace("\n", "").trim();
        let ranking = $('.list-group-item:nth-child(3) > span', contest_panel).text().replace("\n", "").trim();
    
        let progress_panel = $('.panel-default:nth-child(3)', html);
        let solved = $('.list-group-item:nth-child(1) > span', progress_panel).text().replace("\n", "").trim();
        let accepted =  $('.list-group-item:nth-child(2) > span', progress_panel).text().replace("\n", "").trim();
        let rate =  $('.list-group-item:nth-child(3) > span', progress_panel).text().replace("\n", "").trim();
    
        let recent_list = $(`.panel-default:nth-child(5) > .list-group`, html);
        let items = $('a', recent_list);
    
        let recent_subs = [];
        for (let i = 0; i < items.length; i++) {
            let data = {
                name: $('b', items[i]).text().replace("\n", "").trim(),
                link: items[i].attribs.href,
                status: $('span:nth-child(1)', items[i]).text().replace("\n", "").trim(),
                lang: $('span:nth-child(2)', items[i]).text().replace("\n", "").trim(),
                time: $('.text-muted', items[i]).text().replace("\n", "").trim(),
            }
            recent_subs.push(data);
        }
    
        let res = {
            user:{
                realname: name,
                username: username
            },
            contest: {
                finished: finished,
                rating: rating,
                ranking: ranking
            },
            progress: {
                solved: solved,
                accepted: accepted,
                accepted_rate: rate
            },
            recent: recent_subs,
        };
    
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}