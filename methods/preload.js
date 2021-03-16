module.exports = function() 
{
	// Object.defineProperty(navigator, "languages",
	// {
	// 	get: function () {
	// 		return ["en-US", "en"];
	// 	},
	// });
	// Object.defineProperty(navigator, 'webdriver',
	// {
	// 	get: () => false,
	// });
	delete navigator.__proto__.webdriver;
	delete navigator.__proto__.webdriver;
	delete navigator.webdriver;
	window.navigator.chrome =
	{
		"app":
		{
			"isInstalled": false,
			"InstallState":
			{
				"DISABLED": "disabled",
				"INSTALLED": "installed", "NOT_INSTALLED": "not_installed"
			},
			"RunningState":
			{
				"CANNOT_RUN": "cannot_run", "READY_TO_RUN": "ready_to_run", "RUNNING": "running"
			}
		},
		"runtime":
		{
			"OnInstalledReason":
			{
				"CHROME_UPDATE": "chrome_update", "INSTALL": "install", "SHARED_MODULE_UPDATE": "shared_module_update", "UPDATE": "update"
			},
			"OnRestartRequiredReason":
			{
				"APP_UPDATE": "app_update", "OS_UPDATE": "os_update", "PERIODIC": "periodic"
			},
			"PlatformArch":
			{
				"ARM": "arm", "MIPS": "mips", "MIPS64": "mips64", "X86_32": "x86-32", "X86_64": "x86-64"
			},
			"PlatformNaclArch":
			{
				"ARM": "arm", "MIPS": "mips", "MIPS64": "mips64", "X86_32": "x86-32", "X86_64": "x86-64"
			},
			"PlatformOs":
			{
				"ANDROID": "android", "CROS": "cros", "LINUX": "linux", "MAC": "mac", "OPENBSD": "openbsd", "WIN": "win"
			},
			"RequestUpdateCheckStatus":
			{
				"NO_UPDATE": "no_update", "THROTTLED": "throttled", "UPDATE_AVAILABLE": "update_available"
			}
		}
	};
	window.navigator.languages = [ "en-US", "en" ];
};