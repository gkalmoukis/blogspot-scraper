const axios = require('axios');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const moment = require('moment');
const baseUrl = "https://geradinesmew.blogspot.com";
let subUrls = [
    "/2020/05/", "/2020/04/", "/2020/01/", "/2019/12/", "/2019/10/", "/2019/09/", 
    "/2019/08/", "/2019/07/", "/2019/06/", "/2019/05/", "/2019/04/", "/2019/03/", 
    "/2019/02/", "/2019/01/", "/2018/12/", "/2018/11/", "/2018/10/"
];
const csvWriter = createCsvWriter({
    path: 'posts.csv',
    header: [
        {id: 'title', title: 'Title'},
        {id: 'uploadedAt', title: 'Date'},
        {id: 'link', title: 'Link'},
        {id: 'body', title: 'Body'}
    ]
});
formatDate = (dateString) => {
    let dateFormated = moment(dateString);
    return dateFormated.format();
}
subUrls.forEach(subUrl => {
    axios.get(baseUrl+subUrl)
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
                uploadedAt: formatDate(uploadedAt),
                link: link,
                body: body
            };
            csvWriter.writeRecords([post])
            .then( () => {  
                console.info(`${title} saved to file`); 
            });
        });
    })
    .catch(error => {
        console.error(error);
    })
});