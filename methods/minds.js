"use strict";

const delay = require("delay");
const common = require("./common");
const readline = require("readline");

exports.mindsLoggedInCheck = async function (page, username)
{
	console.log(`Checking Login status as ${username} ...`);
	try
	{
		await page.goto("https://www.minds.com/newsfeed/subscriptions" , common.waitUntil);
	}
	catch(error) { console.log("Error loggedInCheck, could not fully open the page"); }
	await common.randomWaitfor(page);
	const UNSel = "body > m-app > m-topbarwrapper > m-v3topbar > div.m-v3Topbar__top > div > div.m-pageLayout__pane--main > div.m-v3Topbar__rightColumn > div > m-usermenu__v3 > div.m-user-menu.m-dropdown > ul > li.m-dropdownList__item.m-userMenuDropdown__item.m-userMenuDropdown__username.ng-star-inserted > a";
	const res = await common.usernameCheck(page , UNSel , username , "@");
	if(res)
	{
		return true;
	}
	console.log("Not logged-in");
	throw false;
};

exports.mindsLogin = async function (page, username, password)
{
	console.log(`Logging in as ${username} ...`);
	await page.goto("https://www.minds.com/login" , common.waitUntil);
	await common.randomWaitfor(page);
	await page.waitForSelector("#username");
	await page.type("#username" , username , {delay: 50});
	await common.randomSleep(1,2);
	await page.type("#password" , password , {delay: 50});
	await common.randomSleep(1,2);
	const submitSel = "minds-form-login > form > div.m-layout__row.m-login__actions > m-button > button > div";
	await common.waitAndClick(page , submitSel);
	await common.randomWaitfor(page);
	await common.randomWaitFull(page, 3 , 8, 4000);
};

exports.login = async function (page, username , password)
{
	try
	{
		await exports.mindsLoggedInCheck(page, username);
	}
	catch (e)
	{
		console.log(e);
		await exports.mindsLogin(page, username, password);
	}
};

exports.post = async function (page, post)
{
	await page.goto("https://www.minds.com/blog/edit/new" , common.waitUntil);
	const coverSel = "#channel-v2-edit-avatar";
	const titleSel = "div > m-blogeditor--v2 > div > div > div.m-blogEditor__titleContainer > textarea";
	const bodySel = "div > m-blogeditor--v2 > div > div > div.m-blogEditor__bodyContainer > m-blog__editor > div > ckeditor > div";
		
	await page.waitForSelector(coverSel);
	await page.waitForSelector(bodySel);

	const coverFile = await page.$(coverSel);
	await coverFile.uploadFile(post.folderPath + post.cover);
	await delay(3000);
	await page.click(titleSel , common.waitUntil);
	await page.type(titleSel , post.title , {delay: 0});
	await delay(3000);

	if(post.youtube)
	{
		await page.keyboard.press("Tab");
		await delay(2000);
		let youtubeAddress =  post.youtube.replace("https://", "");
		youtubeAddress =  post.youtube.replace("http://", "");
		await common.pasteOnCurrentEnterW8(page , youtubeAddress);
		await page.keyboard.press("Enter");
		await delay(3000);

	}
	// let bodyDesSel = "m-body > div > div > m-blogeditor--v2 > div > div.m-blogEditor__container > div.m-blogEditor__bodyContainer > m-blog__editor > div > ckeditor > div > p:nth-child(2)";
	// await common.w8ClikType(page, bodyDesSel, post.body);
	await page.keyboard.press("Enter");
	let {body} = post;
	body = body.replace(/<mcode>/g, "```");
	body = body.replace(/<\/mcode>/g, "");
	await common.pasteOnCurrent(page, body);
	// await page.keyboard.type(body);
	for (let index = 0; index < post.refrences.length; index++)
	{
		const element = post.refrences[index];
		await page.keyboard.type(`\n${element}`);
	}
	console.log("Press enter here when you ready to enter the captcha");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const it = rl[Symbol.asyncIterator]();
	await it.next();
	rl.close();
	const submitSel = "div.m-blogEditor__saveButtons > m-button:nth-child(2) > button";
	await common.waitAndClick(page , submitSel);
	await delay(25000);
	const pageUrl = await page.url();
	if(pageUrl)
	{
		post.minds.status = true;
		post.minds.link = pageUrl;
	}
	return post;
};
