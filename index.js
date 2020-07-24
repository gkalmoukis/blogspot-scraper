const axios = require('axios');
const cheerio = require('cheerio');
let posts = [];
let urls = [
    "https://geradinesmew.blogspot.com/2020/05/",
    "https://geradinesmew.blogspot.com/2020/04/",
    "https://geradinesmew.blogspot.com/2020/01/",
    "https://geradinesmew.blogspot.com/2019/12/",
    "https://geradinesmew.blogspot.com/2019/10/",
    "https://geradinesmew.blogspot.com/2019/09/",
    "https://geradinesmew.blogspot.com/2019/08/",
    "https://geradinesmew.blogspot.com/2019/07/",
    "https://geradinesmew.blogspot.com/2019/06/",
    "https://geradinesmew.blogspot.com/2019/05/",
    "https://geradinesmew.blogspot.com/2019/04/",
    "https://geradinesmew.blogspot.com/2019/03/",
    "https://geradinesmew.blogspot.com/2019/02/",
    "https://geradinesmew.blogspot.com/2019/01/",
    "https://geradinesmew.blogspot.com/2018/12/",
    "https://geradinesmew.blogspot.com/2018/11/",
    "https://geradinesmew.blogspot.com/2018/10/"
];
urls.forEach(url => {
    axios.get(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        $('.post-outer').each(function(index, elem){
            let link = $(this).find('div > h3 > a').attr('href');
            let title = $(this).find('div > h3 > a').text().trim();
            let body = $(this).find('.post-body').text();
            let uploadedAt = $(this).find('div > div.post-footer > div.post-footer-line.post-footer-line-1 > span.post-timestamp > a').text();
            let post = {
                title: title,
                uploadedAt: uploadedAt,
                link: link,
                body: body
            }
            posts.push(post);
        });
    })
    .catch(error => {
        console.error(error);
    })
});