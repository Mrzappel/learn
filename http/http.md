### http

#### http缓存

1. 强缓存
- http1.0使用`Expires`字段，http1.1使用`Cache-Control`字段，优先级高于`Expires`，`Cache-Control`字段的值为`max-age=3600`，单位为秒，表示资源在3600秒内有效，超过3600秒才会向服务器发起请求，否则直接使用本地缓存。如果同时存在`Expires`和`Cache-Control`，则`Cache-Control`的优先级高于`Expires`
- `Cache-Control`的值为`public`，表示可以被所有用户缓存，包括终端用户和CDN等中间代理服务器
- `Cache-Control`的值为`private`，表示只能被终端用户缓存，不能被CDN等中间代理服务器缓存
- `Cache-Control`的值为`max-stale=3600`，表示资源在3600秒内有效，超过3600秒才会向服务器发起请求，如果超过3600秒，但是本地缓存还没有失效，则继续使用本地缓存
- `Cache-Control`的值为`no-cache`，表示不使用强缓存，使用协商缓存
- `Cache-Control`的值为`no-store`，表示不使用强缓存，也不使用协商缓存，每次都向服务器发起请求
1. 协商缓存
- 使用`Last-Modified`和`If-Modified-Since`字段来验证资源是否有效，`Last-Modified`表示资源最后一次修改的时间，`If-Modified-Since`表示上一次请求资源时，服务器返回的`Last-Modified`的值，如果两者相等，则表示资源没有修改，可以使用本地缓存，否则向服务器发起请求
- 使用`Etag`和`If-None-Match`字段来验证资源是否有效，`Etag`表示资源的唯一标识，`If-None-Match`表示上一次请求资源时，服务器返回的`Etag`的值，如果两者相等，则表示资源没有修改，可以使用本地缓存，否则向服务器发起请求
- `Last-Modified`和`If-Modified-Since`的精确度是秒，如果在一秒内修改了多次，但是`Last-Modified`的值没有变化，那么`If-Modified-Since`的值也不会变化，这样就会导致缓存失效，所以http1.1提出了`Etag`和`If-None-Match`，`Etag`的精确度是毫秒，可以解决这个问题
- `Etag`和`If-None-Match`的优先级高于`Last-Modified`和`If-Modified-Since`
- `Etag`和`If-None-Match`的值是由服务器生成的，`Last-Modified`和`If-Modified-Since`的值是由浏览器生成的
- `Etag`和`If-None-Match`的值是字符串，`Last-Modified`和`If-Modified-Since`的值是时间戳
- `Etag`和`If-None-Match`的值是可以被修改的，`Last-Modified`和`If-Modified-Since`的值是只读的
- `Etag`和`If-None-Match`的值可以是任意的，`Last-Modified`和`If-Modified-Since`的值只能是时间戳