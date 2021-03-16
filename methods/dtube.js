const common = require("./common");
const delay = require("delay");

async function dtubeLoggedInCheck(page, username, name)
{
	console.log(`Checking Login status as ${username} ...`);
	try
	{
		await page.goto(`https://d.tube/#!/c/${name}` , common.waitUntil);
	}
	catch(error){ console.log("Error loggedInCheck, could not fully open the page"); }
	await common.randomWaitfor(page);
	// let sel = "body > div.ui.large.borderless.main.menu.fixed > div.right.floated.menu > div.ui.item.top.inline.right.floated.dropdown.dropdownaccounts.needsclick.active.visible > div:nth-child(2)";
	const sel = "body > div.ui.large.borderless.main.menu.fixed > div.right.floated.menu > a.ui.item.top.inline.right.floated > div";
	// let sel = "body > div.ui.large.borderless.main.menu.fixed > div.right.floated.menu > div:nth-child(8) > div:nth-child(2)";
	await page.waitForSelector(sel);
	const UN = await page.$eval(sel, el => {return el.innerText;} );		
	if (UN == username)
	{
		console.log("Already logged-In");
		return true;
	}
	console.log("Not logged-in");
	throw false;
}

async function dtubeLogin(page, username, password)
{
	console.log(`Logging in as ${username} ...`);
	await page.goto("https://d.tube/#!/login" , common.waitUntil);
	// let dtubeSel = "body > div.pusher > div > main > div > div:nth-child(SSSSMMMMSSSS) > span";
	// let index = await common.findTheSel(page, dtubeSel, 2 , 4 , "DTube");		
	// dtubeSel = `body > div.pusher > div > main > div > div:nth-child(${index}) > span`;
	const usernameSel = "body > div.pusher > div > main > div > div > form > div > div > div:nth-child(1) > div > input[type=text]";
	const passwordSel = "body > div.pusher > div > main > div > div > form > div > div > div:nth-child(2) > div > input[type=password]";
	const submitSel = "#loginbutton > button";
	// await common.waitAndClick(page , dtubeSel);
	await common.w8ClikType(page, usernameSel, username);
	await common.w8ClikType(page , passwordSel , password);
	await delay(25000);
	await common.waitAndClick(page , submitSel);
	await common.waitAndClick(page , submitSel);
	await common.waitAndClick(page , submitSel);
	await common.waitAndClick(page , submitSel);
}

exports.dtubeLoginAll = async function (page, sec)
{
	try
	{
		await dtubeLoggedInCheck(page, sec.username, sec.name);
	}
	catch (e)
	{
		console.log(e);
		await dtubeLogin(page, sec.username, sec.password);
	}
};

exports.dtubePost = async function (page, post)
{
	const link = "https://d.tube/#!/publish";		
	await common.goingToPage(page , link);
	try
	{
		const perviousPublishSel = "#trashVideo > button";
		await common.waitAndClick(page, perviousPublishSel);
		await common.goingToPage(page , link);
	}
	catch (error) {}
	const thirdParty = "body > div.pusher > div > main > div > div > div > div:nth-child(2) > div";	
	const insertUrlSel = "#remotelink";
	const nextSel = "#addvideonext > button";
	const tagSel = "#infozone > div.ui.centered.stackable.grid > div:nth-child(3) > form > div.two.fields > div.field.publishfield > div > input";
	const publishSel = "#publishVideo > button";
	await common.waitAndClick(page, thirdParty);
	await common.w8ClikType(page, insertUrlSel, post.youtube);
	await common.waitAndClick(page, nextSel);
	console.log("YOu can click on Original COntent if you want");
	await delay(5000);
	await common.w8ClikType(page, tagSel, post.tags[0] || "tag");
	await common.waitAndClick(page , publishSel);
	await delay(5000);
	const pageUrl = await page.url();
	// let pageUrl = await page.$eval(pageUrlSel, el => el.value );
	if(pageUrl)
	{
		post.dtube.status = true;
		post.dtube.link = pageUrl;
	}
	return post;
};