---
title: hello reefish
date: 2016-02-15 17:50:07
tags: hexo
---

# hexo 自动化部署和备份

## hexo源码备份

1）安装hexo备份插件

```
npm install hexo-git-backup --save
```

2）编辑 _config.yml配置文件，增加配置内容（例子）：

```
# backup
backup:
  type: git
  theme: yilia
  message: 'updated: {{ now("YYYY-MM-DD HH:mm:ss") }}'
  repository:
    github: reefish:ReeFish/reefish-blog-backup.git,master
```

3）执行备份命令

```
hexo b
```

## 部署hexo时，执行（自动备份）脚本

1）在hexo根目录下，创建 scripts 文件夹

```
mkdir scripts
```

2）安装 shelljs 模块（下面的js文件中用到）

```
npm install shelljs --save
```

3）在scripts目录下，创建 js 文件，随便命名，比如： auto-backup.js

```
touch scripts/auto-backup.js
```

4）编辑内容如下：

```
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
  exec('hexo b'); //执行备份命令
  echo("－－－－－－－－－－Auto Backup Stop");
 }
}
```

5）当执行 hexo d 命令时，会自动执行上面的js脚本

```
hexo d -g
```

## 不同电脑迁移源码时，注意事项

1）clone时，需要带-o参数，来指定远端主机名称（比如，你配置的是github）

```
git clone -o github reefish:ReeFish/reefish-blog-backup.git
```

2）然后配置git提交的用户名和邮箱

```
git config  --add user.name  "reefish"
git config --add user.email  "reefish2015@163.com"
```
3）安装node.js依赖

```
npm install
```

4）执行部署任务

```
hexo d -g
```
