"use strict";
const fs = require("fs");
const random = require("random");
const puppeteer = require("puppeteer");
const common = require("./methods/common");
const defaults = require("./defaults.json");
const minds = require("./methods/minds.js");
const gab = require("./methods/gab.js");
const wordpress = require("./methods/wordpress.js");
const linkedin = require("./methods/linkedin.js");
const github = require("./methods/github.js");
const dtube = require("./methods/dtube.js");
const delay = require("delay");
const colors = require("colors");
const commandLineArgs = require("command-line-args");

const optionDefinitions = [
	{name: "user", alias: "u", type: String, defaultOption: true},
	{name: "headless", alias: "h", type: Boolean},
	{name: "closeBrowser", alias: "c", type: Boolean},
	{name: "sms", alias: "s", type: String, multiple: true},
];
const options = commandLineArgs(optionDefinitions);

let headlessMod = defaults.headless;
let username = defaults.defaultUser;
if(options.closeBrowser)
{
	defaults.closeBrowser = options.closeBrowser;
}
if(options.headless)
{
	headlessMod = options.headless;
}
if (options.user)
{
	username = options.user;
}
if (options.sms)
{
	defaults.sms = options.sms;
}
const userDataDir = `./users/${username}/chromData`;
const sec = require(`./users/${username}/sec.js`);

async function run() 
{
	await common.internetCheck();
	await common.publicIP();
	const posts = await common.getPosts(username);
	const args =
		[
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-infobars",
			"--window-position=0,0",
			"--ignore-certifcate-errors",
			"--ignore-certifcate-errors-spki-list",
			`--user-agent=${defaults.userAgent}`,
			"--noerrordialogs",
			"--disable-web-security",
			"--allow-file-access-from-file",
			"--start-maximized"
			// '--disable-features=site-per-process'
			// "--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure"
		];
	if (defaults.useTor != false)
	{
		const ra = random.int(defaults.torRange[ 0 ], defaults.torRange[ 1 ]);
		args.push(`--proxy-server=socks5://127.0.0.1:90${ra}`);
		console.log("Using Tor on", `90${ra}`);
	}
	const options =
	{
		args,
		// executablePath: "/usr/bin/chromium",
		// executablePath: "/usr/bin/google-chrome-stable",
		// executablePath: "/usr/bin/brave-browser",
		// executablePath: "/usr/bin/brave",
		// slowMo: 50,
		headless: headlessMod,
		ignoreHTTPSErrors: true,
		userDataDir,
		defaultViewport: null,
		appMode: true
	};

	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
	await page.evaluateOnNewDocument(require("./methods/preload.js"));
	await page.setDefaultNavigationTimeout(30000);
	await common.setWindowSize(page, defaults.viewport.width , defaults.viewport.height);
	await page.setViewport(defaults.viewport);
	await common.closingOtherTabs(browser, page);
	const newPostsLinks = [];
	for (let index = 0; index < posts.length;index++)
	{
		const post = posts [index];
		if (post[ "minds" ] && post[ "minds" ].status == false && defaults.sms.indexOf("minds") != -1)
		{
			console.log("******* Minds.com *******".cyan);
			console.warn("Currently supports canery mod".yellow);
			try
			{
				await minds.login(page, sec.minds.username, sec.minds.password);
				console.log(`Publishing "${post.title}"`.green);
				const updatedPost = await minds.post(page, post);
				await common.updateJson(updatedPost);
				newPostsLinks.push(updatedPost[ "minds" ].link);
				console.log(`Published here:\n${updatedPost ["minds"].link}`.green);
			}
			catch (error)
			{
				console.log(error);
				return await common.closingBrowser(browser, page);
			}
			await common.closingOtherTabs(browser, page);
			await delay(5000);
		}
		if (post[ "linkedin" ] && post[ "linkedin" ].status == false && defaults.sms.indexOf("linkedin") != -1)
		{
			console.log("******* linkedin.com *******".cyan);
			try
			{
				await linkedin.login(page, sec.linkedin.username, sec.linkedin.password , sec.linkedin);
				console.log(`Publishing "${post.title}"`.green);
				const updatedPost = await linkedin.post(page, post);
				await common.updateJson(updatedPost);
				newPostsLinks.push(updatedPost[ "linkedin" ].link);
				console.log(`Published here:\n${updatedPost ["linkedin"].link}`.green);
			}
			catch (error)
			{
				console.log(error);
			}
			await common.closingOtherTabs(browser, page);
			await delay(5000);
		}
		if (post[ "gab" ] && post[ "gab" ].status == false && defaults.sms.indexOf("gab") != -1)
		{
			console.log("******* gab.com *******".cyan);
			try
			{
				await gab.loginAll(page, sec.gab.username, sec.gab.password);
				console.log(`Publishing "${post.title}"`.green);
				const updatedPost = await gab.post(page, post, sec.gab);
				await common.updateJson( updatedPost );
				newPostsLinks.push( updatedPost["gab"].link );
				console.log( `Published here:\n${updatedPost["gab"].link}`.green );
			}
			catch (error)
			{
				console.log(error);
				return await common.closingBrowser(browser, page);
			}
			await common.closingOtherTabs(browser, page);
			await delay(5000);
		}
		if (post[ "wordpress" ] && post[ "wordpress" ].status == false && defaults.sms.indexOf("wordpress") != -1)
		{
			console.log("******* wordpress.com *******".cyan);
			try
			{
				await wordpress.loginAll(page, sec.wordpress.username, sec.wordpress.password, sec.wordpress);
				console.log(`Publishing "${post.title}"`.green);
				const updatedPost = await wordpress.post(page, post, sec.wordpress);
				await common.updateJson(updatedPost);
				newPostsLinks.push(updatedPost[ "wordpress" ].link);
				console.log(`Published here:\n${updatedPost[ "wordpress" ].link}`.green);
				
			}
			catch (error)
			{
				console.log(error);
				return await common.closingBrowser(browser, page);
			}
			await common.closingOtherTabs(browser, page);
			await delay(5000);
		}
		if (post[ "github" ] && post[ "github" ].status == false && defaults.sms.indexOf("github") != -1)
		{
			console.log("******* github.com *******".cyan);
			try
			{
				const updatedPost = await github.post(post, sec.github);
				await common.updateJson(updatedPost);
				newPostsLinks.push(updatedPost ["github"].link);
				console.log(`Published here:\n${updatedPost ["github"].link}`.green);
			}
			catch (error)
			{
				console.log(error);
				return await common.closingBrowser(browser, page);
			}
			await common.closingOtherTabs(browser, page);
			await delay(5000);
		}
		if (post[ "dtube" ] && post[ "dtube" ].status == false && defaults.sms.indexOf("dtube") != -1)
		{
			console.log(`Publishing "${post.title}" On d.tube`);
			try
			{
				await dtube.dtubeLoginAll(page, sec.dtube);
				const updatedPost = await dtube.dtubePost(page, post);
				await common.updateJson(updatedPost);
				newPostsLinks.push(updatedPost[ "dtube" ].link);
			}
			catch (error)
			{
				console.log(error);
			}
			await common.closingOtherTabs(browser, page);
			await delay(5000);
		}
	}
	console.log("Done :)".white);
	if(newPostsLinks.length > 0)
	{
		console.log("Here are the new links:".blue);
		console.log(newPostsLinks);
	}
	await common.closingBrowser(browser, page);
}

try
{
	run();
}
catch (error)
{
	console.log(error);
	process.exit(-2);
}

// Add preloadFile
// Signed-in Google
// Disable webrtc chrome://flags/#disable-webrtc
// Enable Javascript
// Allow Cookies on specific website
// 
// Use Google-Chrome
// sudo nano /etc/resolv.conf # 8.8.8.8

// Consider copying your own browser cahch in user's brower cache
// sudo cp -r ~/.config/chromium/Profile\ 1/* /run/media/mlibre/H/projects/thebot-next-gen/publish0x/users/thegoodearth/chromData/Default/
// sudo chown -R mlibre /run/media/mlibre/H/projects/thebot-next-gen/publish0x/users/
// chmod a+rwx -R /run/media/mlibre/H/projects/thebot-next-gen/publish0x/users/
// ~/.config/chromium/