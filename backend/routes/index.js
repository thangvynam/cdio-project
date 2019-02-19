var express = require('express');
var router = express.Router();
var pdf = require('pdfkit');
//var fs = require('fs');

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('hbs');
const path = require('path');
const moment = require('moment');

const compile = async function(templateName,data){
  const filePath = path.join(process.cwd(),'templates',`${templateName}.hbs`);
  const html = await fs.readFile(filePath,'utf-8');
  return hbs.compile(html)(data);
}
hbs.registerHelper('dateFormat',function(value,format){
  return moment(value).format(format);
});

/* GET export file page. */
router.get('/export-file', function(req, res, next) {

  // var myDoc = new pdf;
 
  // myDoc.pipe(fs.createWriteStream('file.pdf'));

  // myDoc.text('Đề cương môn học Nhập môn Công nghệ phần mềm', 20, myDoc.page.height - 50, {
  //   lineBreak: false
  // });

  // // // myDoc.fontSize(25).text('Here is some vector graphics...', 100, 80);

  // // // myDoc.font('Times-Roman')
  // // //     .fontSize(48)
  // // //     .text('NodeJS PDF Document',100,100);

  // // // // some vector graphics
  // // // myDoc
  // // //   .save()
  // // //   .moveTo(100, 150)
  // // //   .lineTo(100, 250)
  // // //   .lineTo(200, 250)
  // // //   .fill('#FF3300');
  // // // myDoc.circle(280, 200, 50).fill('#6600FF');
  //  myDoc.end();

  (async function(){
    try{
      console.log("aaa")
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const content =await compile('test',null);

      await page.setContent(content);
      await page.emulateMedia('screen');
      await page.pdf({
        path:'mypdf.pdf',
        format:'A4',
        printBackground:true
      });
      console.log("done");
      await browser.close();
      process.exit();

    }catch(e){
      console.log('error',e);
    }
  })();
    
  })

module.exports = router;
