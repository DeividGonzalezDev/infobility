import puppeteer from "puppeteer";

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

export async function init (){
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport:{
            width: 1080,
            height: 720
        }, 
        args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('https://wheeltheworld.com/destinations/accessible-travel-argentina/buenos-aires?travelers=2&adults=2&children=0&formattedDate=')
    await page.waitForSelector('.chakra-input')
    return page;
}

export async function search(page, query){
try {
    const input = await page.$('.chakra-input');
    await input.click({ clickCount: 3 })
    await page.type('.chakra-input',query);
    await page.waitForTimeout(1000);
    //await page.click('.chakra-heading .css-1damnhi');
    await page.click('.css-167ztkh');
    try {
        await delay(2000)
        await page.waitForSelector('.css-dcy673 img.chakra-image.css-t6orrj', {timeout: 5000})
        
    } catch (error) {
        await page.goto('https://wheeltheworld.com/destinations/accessible-travel-argentina/buenos-aires?travelers=2&adults=2&children=0&formattedDate=')
        await page.waitForSelector('.chakra-input')
        return [{error: 'No se han encontrado Lugares, Pronto estaran disponibles'}]
    }
    await scrollToBottom(page);
    const elements = await page.evaluate(()=>{
        const elements = document.querySelectorAll('.css-1ljzhcy');
        let arrayOfElements=[];
        elements.forEach(e=>{
            let obj = {
                url: '',
                img: '',
                title: '',
                description: '',
                calification: '',
                location: ''
            }
            try {
                obj.url = e.children[0].href !== undefined ? e.children[0].href : 'Any Url';
            } catch (error) {
            }

            try {
                obj.img = e.children[0].children[0].children[0].children[0].src !== undefined ?e.children[0].children[0].children[0].children[0].src:'Any url Image';
                
            } catch (error) {
            }
            //----***----//
            try {
                obj.title = e.children[0].children[0].children[1].children[0].children[0].children[0].children[1].innerText !== undefined ?  e.children[0].children[0].children[1].children[0].children[0].children[0].children[1].innerText : 'Any Title';
            } catch (error) {
            }
            //---
            try {
                obj.description = e.children[0].children[0].children[1].children[0].children[0].children[2].innerText !== undefined?e.children[0].children[0].children[1].children[0].children[0].children[2].innerText: 'Any Description';

            } catch (error) {
            }
            //---
            try {
                obj.calification = e.children[0].children[0].children[1].children[0].children[0].children[0].children[0].innerText !== undefined ?  e.children[0].children[0].children[1].children[0].children[0].children[0].children[0].innerText:'Any Calification';
            } catch (error) {
                
            }
            //---
            try {
                obj.location = e.children[0].children[0].children[1].children[0].children[0].children[1].children[1].innerText !== undefined ? e.children[0].children[0].children[1].children[0].children[0].children[1].children[1].innerText : 'Any Location';
            } catch (error) {
                
            }
            arrayOfElements.push(obj);
        })

        return arrayOfElements;
    })
    return elements;
} catch (error) {
    await page.goto('https://wheeltheworld.com/destinations/accessible-travel-argentina/buenos-aires?travelers=2&adults=2&children=0&formattedDate=')
    await page.waitForSelector('.chakra-input')
    return [{error: 'No se han encontrado Lugares, Pronto estaran disponibles'}]
}
}

async function scrollToBottom(page) {
    const distance = 100; // should be less than or equal to window.innerHeight
    const delayTime = 100;
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
      await delay(delayTime);
    }
  }