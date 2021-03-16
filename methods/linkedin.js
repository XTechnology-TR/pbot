"use strict";

const delay = require("delay");
const common = require("./common");
const colors = require("colors");




/***************** linkedin.com *****************/
exports.LogInCheck = async function (page, profile)
{
	console.log(`Checking Login status as ${profile} ...`);
	try
	{
		await page.goto(profile , common.waitUntil);
	}
	catch(error) { console.log("Error loggedInCheck, could not fully open the page"); }
	await common.randomWaitfor(page);
	const sel = "#primary-navigation > ul > li:nth-child(6) > div > button > span";
	await page.waitForSelector(sel);
	const UN = await page.$eval(sel, el => {return el.innerText;} );		
	if (UN == "Me")
	{
		console.log("Already logged-In");
		return true;
	}
	console.log("Not logged-in");
	throw false;
};

exports.linkedinLogin = async function (page, username, password)
{
	console.log(`Logging in as ${username} ...`);
	await page.goto("https://www.linkedin.com/uas/login" , common.waitUntil);
	await common.randomWaitfor(page);
	await page.waitForSelector("#username");
	await page.type("#username" , username , {delay: 50});
	await common.randomSleep(1,2);
	await page.type("#password" , password , {delay: 50});
	await common.randomSleep(1,2);
	await page.click("form > div.login__form_action_container > button" , common.waitUntil);
	console.warn("If you are asked for verification code, pase it".yellow);
	await common.randomSleep(5,7);
	await common.randomWaitfor(page);
	await common.randomWaitFull(page, 3 , 8, 4000);
};

exports.login = async function (page, username , password, sec)
{
	try
	{
		await exports.LogInCheck(page, sec.profile);
	}
	catch (e)
	{
		console.log(e);
		await exports.linkedinLogin(page, username, password);
	}
};

exports.post = async function (page, post)
{
	try 
	{
		await page.goto("https://www.linkedin.com/post/new/" , common.waitUntil);
	}
	catch(error) 
	{
		console.log("Could not fully load the page https://www.linkedin.com/post/new/".red); 
	}
	const coverSel = "#cover-image__file-input";
	const titleSel = "section > section.post-container.relative > label > textarea";
	await page.waitForSelector(coverSel);
	await page.waitForSelector(titleSel);
	console.log("Uploading cover".yellow);
	const coverFile = await page.$(coverSel);
	await coverFile.uploadFile(post.folderPath + post.cover);
	await common.randomWaitFull(page, 10 , 12, 12000);

	await page.click(titleSel , common.waitUntil);
	await common.randomWaitFull(page, 3 , 12, 3000);
	await page.type(titleSel , post.title);
	await common.randomWaitFull(page, 3 , 12, 3000);
	if(post.youtube)
	{
		const textAreaSel = "article > section > section.post-container.relative > div.post-editor.ember-view.ql-container.ql-slate > button";
		await page.click(textAreaSel , common.waitUntil);
		await common.randomWaitFull(page, 3 , 12, 3000);
		const addVideoSel = "article > section > section.post-container.relative > div.post-editor.ember-view.ql-container.ql-slate > div.ql-editor > div > div > button:nth-child(2)";
		await common.waitAndClick(page, addVideoSel);
		const addLinkSel = "#slate-embed-placeholder-input";
		await common.waitAndClick(page, addLinkSel);
		await page.focus(addLinkSel);
		await page.type(addLinkSel , post.youtube);
		await page.keyboard.press("Enter");
		await common.randomWaitFull(page, 3 , 12, 3000);
		await common.randomWaitFull(page, 5 , 12, 10000);
	}
	const bodySel = "article > section > section.post-container.relative > div.post-editor.ember-view.ql-container.ql-slate > div.ql-editor > p";
	await page.waitForSelector(bodySel);
	await page.click(bodySel , common.waitUntil);
	await common.randomWaitFull(page, 3 , 12, 3000);
	let {body} = post;
	body = body.replace(/<mcode>/g, "");
	body = body.replace(/<\/mcode>/g, "");
	await page.type(bodySel , body);
	for (let index = 0; index < post.refrences.length; index++)
	{
		const element = post.refrences[index];
		await page.type(bodySel , `\n${  element}`);
	}

	await delay(5000);
	// frist publish button
	const submitSel = "div.application-outlet > div.authentication-outlet > article > nav > div > span > button";
	await page.click(submitSel , common.waitUntil);
	await delay(5000);

	const secondTitleSel = "div > div > div > div > div > div.ql-editor > p";
	await page.waitForSelector(secondTitleSel);
	await page.click(secondTitleSel , common.waitUntil);
	await delay(3000);
	await page.type(secondTitleSel , post.title);

	await delay(5000);
	const secondSubmitSel = "div > div.share-creation-state__footer > div.share-box_actions > button";
	await page.click(secondSubmitSel , common.waitUntil);
	await delay(5000);


	const pageUrl = await page.url();
	if(pageUrl)
	{
		post.linkedin.status = true;
		post.linkedin.link = pageUrl;
	}
	return post;
};
/***************** linkedin.com End *****************/