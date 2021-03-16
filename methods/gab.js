const common = require("./common");
const delay = require("delay");
const colors = require("colors");

async function loginCheck(page, username)
{
	console.log(`Checking Login status as ${username} ...`);
	try
	{
		await page.goto(`https://gab.com/${username}` , common.waitUntil);
	}
	catch(error) { console.log("Error loggedInCheck, could not fully open the page"); }
	await common.randomWaitfor(page);
	const sel = "#gabsocial > div > div:nth-child(2) > div:nth-child(1) > div > div > div:nth-child(2) > div > button:nth-child(10)";
	await page.waitForSelector(sel);
	const UN = await page.$eval(sel, el => {return el.getAttribute("title");} );
	if(UN == username)
	{
		console.log("Already logged-In");
		return true;
	}
	console.log("Not logged-in");
	throw false;
}

async function login (page, username, password)
{
	console.log(`Logging in as ${username} ...`.yellow);
	await page.goto("https://gab.com/auth/sign_in" , common.waitUntil);
	const usernameSel = "#user_email";
	await common.w8ClikType(page, usernameSel, username);
	await common.w8ClikType(page , "#user_password" , password);
	const submitSel = "#new_user > div.actions > button";
	await page.click(submitSel , common.waitUntil);
	await common.randomWaitfor(page);
	console.log("Logged in".green);
}

exports.loginAll = async function (page, username , password)
{
	try
	{
		await loginCheck(page, username);
	}
	catch (e)
	{
		console.log(e);
		await login(page, username, password);
	}
};

exports.post = async function (page, post, sec)
{
	try {await page.goto(`https://gab.com/${sec.username}` , common.waitUntil);}
	catch(error) {console.log("Error, could not fully open the page gab post page" ); }
	
	const postPopSel = "#gabsocial > div > div:nth-child(2) > main > div:nth-child(2) > button";
	await common.waitAndClick(page, postPopSel);

	const titleSel = "section > div > div > div:nth-child(1) > div:nth-child(2) > div > div > div > div > div > div > div";
	await common.w8ClikType(page, titleSel, post.title);		
	if(post.youtube)
	{
		await page.type(titleSel , `\n${  post.youtube}` );
	}
	for (let index = 0; index < post.refrences.length; index++)
	{
		const element = post.refrences[index];
		await page.type(titleSel , `\n${  element}`);
	}

	console.log("Uploading video".yellow);
	const videoSel = "section > div > div > div > div > div > button > label > input";
	const videoFileEl = await page.$(videoSel);
	await videoFileEl.uploadFile(post.folderPath + post.address);
	let submited = false;
	for (let index = 0; index < 10; index++)
	{
		try 
		{
			await delay(70000);
			// const submitSel = "div > div:nth-child(3) > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(3) > div > div > button";
			const submitSel2 = "div > div > div:nth-child(2) > section > div > div > div:nth-child(3) > div > div > button";
			if (await page.$(`${submitSel2}[disabled]`) !== null)
			{
				console.log("Button seems disabled".yellow);
				throw "Button seems disabled";
			}
			await common.waitAndClick(page , submitSel2);
			submited = true;
			break;
		}
		catch(error) 
		{
			console.log("Is it still uploading?!".yellow);
		}
	}
	if(submited == false)
	{
		console.log("There is no submit button".red);
		throw "There is no submit button";
	}
	console.log("Submitted".green);
	await delay(25000);
	await common.pageReload(page);
	await delay(25000);
	const lastPostSel = "article:nth-child(1) > div > div > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > a";
	const postURL = await page.$eval(lastPostSel, el => {return el.getAttribute("href");} );
	if(postURL)
	{
		post.gab.status = true;
		post.gab.link = `https://gab.com${postURL}`;
	}
	return post;
};
