require('shelljs/global');

try {
	hexo.on('deployAfter', function() { //博客部署之后备份
		backup();
	});
} catch (e) {
	console.log("部署错误：" + e.toString());
}

function backup() {
	if (!which('git')) {
		echo('需要安装git');
		exit(1);
	} else {
		echo("－－－－－－－－－－Auto Backup Start");
		exec('hexo b');
		echo("－－－－－－－－－－Auto Backup Stop");
	}
}
