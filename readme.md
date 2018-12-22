主题基于hexo，你想要使用的话，请确保你已安装hexo系统。或者现在去下载并安装, ->[hexo官网](https://hexo.io)<-

## 安装主题
1. 下载主题
```
git clone git@github.com:lrnman/mayBe.git themes/mayBe
```
2. 下载[环境](https://github.com/lrnman/mayBe-dev)，包括source文件夹，和scaffolds文件夹，并覆盖到你的项目里。
3. 修改项目_config.yml文件的 `per_page: 5` ,  `theme: mayBe`

## 已知问题
- 在ios端的Safari上，me页画廊详情中iframe显示不正常

## 主题
1. 支持标签，不支持分类
2. 支持画廊
3. 支持开启或关闭目录功能
4. 支持代码高亮
5. 支持多语言
6. 支持ajax发送留言（me页)。后端代码请[参考](https://c.55to.top/2017/07/06/使用前后端分离技术，为mayBe主题增加留言功能支持/);
7. 对页面文字，图片，视频进行快速、方便、自由定义
8. 对浏览者保持良好的导向，且不影响页面的开阔性

- 使用sass
- 使用ejs

### 主题属性
详情见主题_config.yml文件

## 文章构成
### 属性 （*必须）
1. title
2. date*
3. classify     (属于随笔，还是文章还是日记)
4. cover （显示在主页的封面）
5. digest （显示在主页简介、概述之类的。 同样，也可以在文章内容内使用<!--more-->来规定）
6. tags （标签）
7. toc （目录 true开启，默认不开启）
8. 画廊 
- photos （数组。照片的路径）
- row （显示画廊的窗口的行数，默认为1）
9. link (网站路径。点击主页标题，会在新窗口跳转到目标网站)

### 内容元素
1. 图片
- ```![]() 例如：![](/assets/1.jpg)```
- 希望自定大小或者浮动，使用img标签。内置类fit, left, right, center，如: 
```<img src="https://via.placeholder.com/350x150.jpg" class="center" style="width:60%" />```   
2. 链接```[XXX](http://note.youdao.com/)```
3. 强调 ```**Strong text**```或 ```*Strong text*```
4. 划线 ```<u>Underline text</u>``` ```~~Deleted text~~```
5. 突出 ``` `Sed erat diam` ```
6. 引用块 ``` > XXXXXXX```、更多请见[hexo官网tag-plugins](https://hexo.io/zh-cn/docs/tag-plugins.html)
7. 列表 
 ```
 Ordered List (ol)
 
1. List Item 1
2. List Item 2
3. List Item 3
 ```
 ```
 Unordered List (ul)

- List Item 1
- List Item 2
- List Item 3
 ```
8. 表格
```
| Table Header 1 | Table Header 2 | Table Header 3 |
| - | - | - |
| Division 1 | Division 2 | Division 3 |
| Division 1 | Division 2 | Division 3 |
| Division 1 | Division 2 | Division 3 |
```
9. abbr, acronym, sub, sup, cite
```
<sup>superscript</sup>
<sub>subscript</sub>
<acronym title="National Basketball Association">NBA</acronym>
<abbr title="Avenue">AVE</abbr>
<cite>cite</cite>
```
10. 标签插件（引用，代码块，etc）, 详情 [hexo官网tag-plugins](https://hexo.io/zh-cn/docs/tag-plugins.html)