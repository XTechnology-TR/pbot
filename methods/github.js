const common = require("./common");
const exec = require("await-exec");
const fs = require("fs");

exports.post = async function (post, sec)
{
	let {body} = post;
	body = body.replace(/\n/g, "  \n");
	body = body.replace(/<mcode>/g, "````");
	body = body.replace(/<\/mcode>/g, "````");
	let mdFile = `# ${post.title}`;
	if(post.youtube)
	{
		mdFile = `${mdFile}
<a href="${post.youtube}">
<p align="center">
<img src="http://img.youtube.com/vi/${common.youtubeVidId(post.youtube)}/0.jpg" alt="${post.title}">
</p></a>

`;
	}
		
	mdFile = `${mdFile}
${body}`;
	if(post.refrences.length > 0)
	{
		mdFile += "References:";
	}
	for (let index = 0; index < post.refrences.length; index++)
	{
		const element = post.refrences[index];
		mdFile +=`

${element}`;
	}
	if(post.donate) 
	{
		for(const address in post.donate) 
		{
			mdFile +=`

${address}
> ${post.donate[address]}`;
		}
	}
	if(!post.githubFileName || post.githubFileName == "")
	{
		post.githubFileName = post.title;
	}
	await fs.writeFileSync(`./${sec.specifiFolder}${post.githubFileName}.md`, mdFile, "utf8");
	await exec(`cd ${sec.localRepoAddress}; git pull; git add --all; git commit -m 'new post'; git push; cd ..;cd ..`);
	const pageUrl = `${sec.fullRepoAddress}${post.githubFileName}.md`;
	post.github.status = true;
	post.github.link = pageUrl;
	return post;
};
