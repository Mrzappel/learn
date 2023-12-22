## menorepo
利用`pnpm`的`workspace`(工作空间)机制可实现一般项目的`menorepo`管理

要求在根目录下有`pnpm-workspace.yaml`文件，例如：
```yaml
packages:
  - packages/*
```
其中`packages`为`pnpm`的工作空间，`packages/*`表示所有子目录都是工作空间

`pnpm`是通过目录下的`package.json`文件中的`name`字段去识别各模块，而不是目录名称

需要互相调用的包安装到根目录，`-w`安装到工作空间，`workspace:*`将来发布的时候会被转换成具体的版本号。

如果不使用pnpm，直接把各项目放在同一个文件夹下管理实现menorepo，会造成很多问题，比如
1. 