// 创建 Blob 对象
const data = ['Hello, world!'];
const blob = new Blob(data, { type: 'text/plain' });

// 创建 File 对象
const file = new File(data, 'hello.txt', { type: 'text/plain' });


const reader = new FileReader();
reader.addEventListener('load', event => {
  const text = event.target.result;
  console.log(text); // 输出 'Hello, world!'
});

reader.readAsText(blob);
//如果二进制数据是一个图片、视频等等，则可以使用 readAsDataURL 方法将其转化为 Base64 编码字符串读取。