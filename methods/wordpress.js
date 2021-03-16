const common = require("./common");
const delay = require("delay");

async function logginCheck (page, username, sec)
{
	console.log(`Checking Login status as ${username} ...`);
	try
	{
		await page.goto(`https://wordpress.com/posts/my/${sec.siteAddress}` , common.waitUntil);
	}
	catch(error) { console.log("Error loggedInCheck, could not fully open the page"); }
	await common.randomWaitfor(page);
	const sel = "#secondary > div > ul > li > div.card.current-site > div > div:nth-child(1) > div > a";
	await page.waitForSelector(sel);
	const siteAddress = await page.$eval(sel, el => {return el.getAttribute("href");} );
	if (siteAddress.includes(sec.siteAddress))
	{
		console.log("Already logged-In");
		return true;
	}
	console.log("Not logged-in");
	throw false;
}

async function login(page, username, password, sec)
{
	console.log(`Logging in as ${username} ...`);
	await page.goto(`https://wordpress.com/log-in?site=${sec.siteAddress}` , common.waitUntil);
	const usernameSel = "#usernameOrEmail";
	const passwordSel = "#password";
	const submitSel = "#primary > div > main > div > div > form > div.card.login__form > div.login__form-action > button";
	await common.w8ClikType(page, usernameSel, username);
	const fSubmit = "#primary > div > main > div > div > form > div.card.login__form > div.login__form-action > button";
	await page.click(fSubmit , common.waitUntil);
	await delay(5000);
	await common.w8ClikType(page , passwordSel , password);
	await page.click(submitSel , common.waitUntil);
	await common.randomWaitfor(page);
}

exports.loginAll = async function (page, username , password , sec)
{
	try
	{
		await logginCheck(page, username , sec);
	}
	catch (e)
	{
		console.log(e);
		
		await login(page, username, password, sec);
	}
};

exports.post = async function (page, post, sec)
{
	try 
	{
		await common.goingToPage(page, `https://wordpress.com/post/${sec.siteAddress}`);
	}
	catch  {}
	await delay(7000);
	try 
	{
		console.log("Removing .inline-help element".yellow);
		await common.removeElement(page, ".inline-help");
	}
	catch (error) 
	{
		console.log(error);
	}
	page.waitForSelector("iframe");
	await delay(5000);
	const titleSel = "#post-title-0";
	for (const frame of page.mainFrame().childFrames())
	{
		const url = await frame.url();
		if(url.indexOf("post-new") != -1)
		{
			await common.w8ClikPasteEnter(frame, titleSel, post.title, page);
			const el = await common.getActiveElement(page);
			let youtubeAddress = post.youtube;
			if(post.youtube.startsWith("www."))
			{
				youtubeAddress = `https://${post.youtube}`;
			}
			await common.pasteOnCurrentEnterW8(frame , youtubeAddress , page);
			await el.focus();
			await common.w8TabW8EnterW8(page);
			let {body} = post;
			body = body.replace(/<mcode>/g, "```");
			body = body.replace(/<\/mcode>/g, "```");
			await common.pasteOnCurrentEnter(frame , body , page);
			await page.keyboard.press("ArrowDown");
			await delay(5000);
			await common.pasteOnCurrentEnter(frame , "References:" , page);
			for (let index = 0; index < post.refrences.length; index++)
			{
				const element = post.refrences[index];
				await common.currentPasteEndEnterW8(frame , element , page);
			}
			if(post.donate) 
			{
				for(const prop in post.donate) 
				{
					await common.pasteOnCurrentEnterW8(frame , `${prop}\n${post.donate[prop]}` , page);
				}
			}
			await delay(5000);
			const submitSel = "button.components-button.editor-post-publish-panel__toggle.editor-post-publish-button__button.is-primary";
			await frame.click(submitSel , common.waitUntil);
			await delay(10000);
			// await page.keyboard.press("Enter");
			// await page.keyboard.press("Enter");
			// const submitSel2 = "div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > div > div > div:nth-child(1) > div:nth-child(1) > button";
			// await frame.click(submitSel2 , common.waitUntil);
			try 
			{
				await page.keyboard.press("Enter");
				await delay(10000);
				await page.keyboard.press("Enter");
				await delay(10000);
				await page.keyboard.press("Enter");
				await delay(10000);
			}
			catch (error) 
			{
				console.log(error);
			}
			// const pageUrlSel = "[id^='inspector-text-control-']";
			// const pageUrl = await frame.$eval(pageUrlSel, el => {return el.value;} );
			const pageUrl = await page.url();
			if(pageUrl)
			{
				post.wordpress.status = true;
				post.wordpress.link = pageUrl;
			}
			else
			{
				console.log("Could not find page url".red);
			}
			return post;
		}
	}
};
