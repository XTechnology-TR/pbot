"use strict";

const publicIp = require("public-ip");
const sleep = require("sleep");
const random = require("random");
const fs = require("fs");
const internetAvailable = require("internet-available");
const delay = require("delay");
const defaults = require("../defaults.json");
const clipboardy = require("clipboardy");
var path = require("path");

/***************** common *****************/

exports.internetCheck = async function()
{
	await internetAvailable({
		timeout: 5000,
		retries: 5
	})
	.catch(() =>
	{
		console.log("NO internet!".red);
		process.exit(-2);
	});
};

exports.publicIP = async function()
{
	console.log(`public IP: ${await publicIp.v4()}`.yellow);
};

exports.getPosts = function (username)
{
	try
	{
		const posts = [];
		const postsPath = `users/${username}/posts`;
		const postsLists = fs.readdirSync(postsPath);		
		for (let index = 0; index < postsLists.length; index++) 
		{
			const element = postsLists[index];
			const fileList = fs.readdirSync(`${postsPath}/${element}`);
			const filename = fileList.find(function (str) 
			{
				return str.includes(".js") || str.includes(".json");
			});
			if(!filename)
			{
				console.log(`Could not find any post file here: ${element}`.yellow);
				continue;
			}
			posts.push(require(`../${postsPath}/${element}/${filename}`));
			posts[posts.length-1].folderPath = `${postsPath}/${element}/`;
			posts[posts.length-1].filename = filename;
			posts[posts.length-1].filepath = `${postsPath}/${element}/${filename}`;
		}
		return posts;
	}
	catch (error)
	{
		console.log("ERROR getUsersList", error);
		throw error;
	}
};

exports.updateJson = async function (post)
{
	const fileExt = path.extname(post.filepath);
	let content = "";
	if(fileExt == ".js")
	{
		content+=`module.exports =
`;
	}
	var util = require("util");

	await fs.writeFileSync(`./${post.filepath}`, content + util.inspect(post) , "utf-8");
	// await fs.writeFileSync(`./${post.filepath}`, content + JSON.stringify(post, null, "\t"), "utf8");
};

exports.youtubeVidId = function youtubeVidId(url)
{
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	var match = url.match(regExp);
	return match&&match[7].length==11? match[7] : false;
};

exports.waitUntil =
{
	"waitUntil" : ["domcontentloaded","load" , "networkidle0" , "networkidle2"]
};

exports.setWindowSize = async function (page, width, height) 
{
	const session = await page.target().createCDPSession();
	const {windowId} = await session.send("Browser.getWindowForTarget");
	await session.send("Browser.setWindowBounds", {windowId, bounds: {width, height}});
	await session.detach();
};

exports.randomWaitfor = async function (page, min=900 , max=4000)
{
	const r = random.int(min, max);
	await page.waitForTimeout(r);
};

exports.randomWaitFull = async function (page, min=1 , max=6, pd=1000)
{
	await page.waitForTimeout(pd);
	const r = random.int(min, max);
	sleep.sleep(r);
};

exports.randomSleep = function (min=1 , max=6)
{
	const r = random.int(min, max);
	sleep.sleep(r);
};

exports.scrol = async function (page)
{
	const res = await page.evaluate(_ =>
	{
		const ranNum = Math.floor(Math.random() * 65 + 10);
		window.scrollBy(0, window.innerHeight + ranNum);
		return document.body.scrollHeight;
	});	
	return res;
};

exports.scrols = async function (page, time)
{
	const resS = [];
	for (let index = 0; index < time; index++)
	{
		const tmp = await exports.scrol(page);
		resS.push(tmp);
		await exports.randomWaitfor(page);
		await exports.randomWaitfor(page);
		await exports.randomWaitFull(page, 10 , 15, 8000);
		const resSLen = resS.length;		
		if(resSLen > 1)
		{
			if( resS[resSLen-1] - resS[resSLen-2] == 0  )
			{
				// console.log('No More Scroll');
				return -2;
			}
		}
	}
};

exports.findTheSel = async function findTheSel(page , mRegex , childFrom, childTo, text)
{
	for (let index = childFrom; index <= childTo; index++)
	{
		let res = "";
		try
		{
			res = await page.$eval(mRegex.replace("SSSSMMMMSSSS" , index), el => {return el.innerText;} );			
		}
		catch (error)
		{
			console.log(error);
		}
		if(res == text)
		{
			return index;
		}
	}
	throw "findTheSel";
};

exports.removeElement = async function (page, sel) 
{
	await page.evaluate((sel) => 
	{
		var elements = document.querySelectorAll(sel);
		for(var i=0; i< elements.length; i++)
		{
			elements[i].parentNode.removeChild(elements[i]);
		}
	}, sel);
};

exports.goingToPage = async function (page, link)
{
	try
	{
		console.log(`Opening page "${link}"`.yellow);
		await page.goto(link , exports.waitUntil);
		await delay(5000);
		return true;
	}
	catch (error)
	{
		console.log(`ERROR loading: "${link}"`.red);
		throw error;
	}
};

exports.pageReload = async function pageReload(page)
{
	try 
	{
		console.log("Reloading the page".yellow);
		await page.reload(exports.waitUntil);
	}
	catch (error) 
	{
		console.log("Was not able to reload the page".red , error);
	}
};

exports.closingOtherTabs = async function (browser, page)
{
	let brWindows = await browser.pages();
	let i = 0;
	while(brWindows.length > 1)
	{
		// console.log(brWindows[i]._target._targetId);
		if(brWindows[i]._target._targetId != page._target._targetId)
		{
			await delay(1000);
			try { await brWindows[i].close(); }
			catch(error) { console.log("Page close error"); }
			brWindows = await browser.pages();
		}
		else
		{
			i++;
		}
	}
};

exports.closingBrowser = async function (browser, page)
{
	if(defaults.closeBrowser)
	{
		await exports.closingOtherTabs(browser, page);
		await delay(3000);
		try { await page.close(); }
		catch(error)
		{
			// console.log("Page close error");
		}
		await exports.randomWaitFull(page, 1 , 2, 1000);
		try { await browser.close(); }
		catch(error)
		{
			// console.log("browser close error");
		}
	}
};

exports.getTabIndex = async function (page)
{
	return await page.evaluateHandle(() => {return document.activeElement.tabIndex;});
};

exports.getActiveElement = async function (page)
{
	return await page.evaluateHandle(() => {return document.activeElement;});
};

exports.w8TabW8EnterW8 = async function w8TabW8EnterW8(page)
{
	await delay(2000);
	await page.keyboard.press("Tab");
	await delay(2000);
	await page.keyboard.press("Enter");
	await delay(2000);
};

exports.waitAndClick = async function waitAndClick(page, sel)
{
	await delay(1000);
	await page.waitForSelector(sel);
	await page.click(sel , exports.waitUntil);
	await delay(3000);
};

exports.w8ClikType = async function w8ClikType(page, sel, text)
{
	await page.waitForSelector(sel);
	await page.click(sel , exports.waitUntil);
	await delay(3000);
	await page.type(sel , text);
	await delay(1000);
};

exports.w8ClikTypeEnter = async function w8ClikTypeEnter(page, sel, text, mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await page.waitForSelector(sel);
	await page.click(sel , exports.waitUntil);
	await delay(3000);
	await page.type(sel , text, {delay: 0});
	await delay(1000);
	await mainPage.keyboard.press("Enter");
};

exports.w8ClikPasteEnter = async function w8ClikPasteEnter(page, sel, text, mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await page.waitForSelector(sel);
	await page.click(sel , exports.waitUntil);
	await delay(3000);
	clipboardy.writeSync(text);
	await mainPage.keyboard.down("Control");
	await mainPage.keyboard.press("V");
	await mainPage.keyboard.up("Control");
	await delay(1000);
	await mainPage.keyboard.press("Enter");
};

exports.typeOnCurrent = async function typeOnCurrent(page , text)
{
	await delay(2000);
	const el = await page.evaluateHandle(() => {return document.activeElement;});
	await el.type(text);
	await delay(2000);
};

exports.typeOnCurrentEnter = async function typeOnCurrentEnter(page , text , mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await delay(2000);
	const el = await page.evaluateHandle(() => {return document.activeElement;});
	await el.type(text);
	await delay(2000);
	await mainPage.keyboard.press("Enter");
	await delay(5000);
};

exports.pasteOnCurrent = async function pasteOnCurrent(page , text , mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await delay(2000);
	clipboardy.writeSync(text);
	await mainPage.keyboard.down("Control");
	await mainPage.keyboard.press("V");
	await mainPage.keyboard.up("Control");
	await delay(2000);
};

exports.pasteOnCurrentEnter = async function pasteOnCurrentEnter(page , text , mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await delay(2000);
	clipboardy.writeSync(text);
	await mainPage.keyboard.down("Control");
	await mainPage.keyboard.press("V");
	await mainPage.keyboard.up("Control");
	await delay(2000);
	await mainPage.keyboard.press("Enter");
	await delay(5000);
};

exports.pasteOnCurrentEnterW8 = async function pasteOnCurrentEnterW8(page , text , mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await delay(2000);
	clipboardy.writeSync(text);
	await mainPage.keyboard.down("Control");
	await mainPage.keyboard.press("V");
	await mainPage.keyboard.up("Control");
	await delay(8000);
	await mainPage.keyboard.press("Enter");
	await delay(8000);
};

exports.currentPasteEndEnterW8 = async function currentPasteEndEnterW8(page , text , mainPage)
{
	if(!mainPage)
	{
		mainPage = page;
	}
	await delay(2000);
	clipboardy.writeSync(text);
	await mainPage.keyboard.down("Control");
	await mainPage.keyboard.press("V");
	await mainPage.keyboard.up("Control");
	await delay(8000);
	await mainPage.keyboard.press("End");
	await mainPage.keyboard.press("Enter");
	await delay(8000);
};

exports.usernameCheck = async function usernameCheck(page , UNSel , username, usernamePrefix) 
{
	await page.waitForSelector(UNSel);
	let pageUn = await page.$eval(UNSel, el => {return el.innerText;} );
	pageUn = pageUn.trim();
	pageUn = pageUn.toLowerCase();
	username = username.trim();
	username = username.toLowerCase();
	if(usernamePrefix)
	{
		username = usernamePrefix + username;
	}
	if (pageUn == username)
	{
		return true;
	}
	else
	{
		return false;
	}
};