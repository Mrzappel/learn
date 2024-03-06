### vue2与vue3的区别是什么？哪些地方做了改进？
- 编程范式的改变-composition api代替了options api
  通过组合函数实现了更好的逻辑复用。在opitons api中，主要的逻辑复用机制是mixins，它会存在一些问题，比如命名冲突，数据来源不清晰、隐式的跨mixin交流。而composition api则是通过函数的组合来实现逻辑复用，解决了mixins的所有缺陷，更加灵活，更加清晰，也孵化了出了VueUse这样的工具库 
- 更灵活的代码组织
  options api将逻辑分散在不同的选项中，当逻辑复杂时，会导致代码难以维护，而composition api则可以将相关的逻辑组织在一起，使得代码更加清晰，降低了重构成本
- 组合式api由于主要利用基本的变量和函数，本身就是类型友好的，带来了更好的类型推导，
- 更小的生产包体积。搭配script setup形式书写的组件模版被编译为内联函数，无需从实例中代理，对代码压缩更友好
    vue3采用了typescript重写，使得类型推导更加友好，更加准确
- vue2采用的是基于对象的编程范式，而vue3采用的是基于函数的组合，但并不是函数式编程，因为函数式编程强调数据不可变，而组合式API是以数据可变的、细粒度的响应性系统为基础的
- vue2通过`options Api`来组织代码，这样会造成逻辑分散在组件各处，不利于维护和阅读，而vue3采用`Composition Api`，将相互关联的逻辑组织在一起，使得代码逻辑更加清晰
1. 响应式原理的改变
- vue2利用`Object.defineProterty`实现响应式，因此需要对data中所有的属性进行递归式的响应式处理，在数据嵌套层级比较深时会产生性能问题，并且由于这个api的限制，无法对新增和删除的属性进行响应式处理,vue2中给出了`$set`，`$delete`这样的api来对新增和删除的数据进行响应式处理，而vue3采用的是`Proxy`的方式来实现响应式，通过在访问数据时进行拦截，可以对新增和删除的属性进行响应式处理，而且不需要对所有的属性进行递归式的处理，性能更好
1. diff算法的改进
- vue2的diff算法是双端diff，vue3的diff算法是最长增长子序列算法，这样可以减少不必要的dom操作，提高性能
1. 编译的优化
- 


### 登陆问题总结

1. 单点登录
- oa：链接拼接ticket参数，
- 企微：先跳转到企业登录授权页，拿到code，再重定向到应用登录页，再区分来自哪个端，是pc还是h5，然后带参跳转到对应段的登录逻辑处理，调取登录接口，拿到登录信息，其他业务系统如营销系统，商用车系统，是不同的企业微信，所以回响的appid不同，区分后，跳转进行登录逻辑
- 闪布：构建链接，通过参数区分，跳转到登录页
- 指针：通过dsBridge获取token，然后调登录接口，拿登录信息
2. 走统一登录门户登录：链接会通过appKey区分，然后跳转到对应的登录页，登录成功后，会跳转到对应的应用，带上token，应用端拿到token，再去调取登录接口，拿到登录信息
3. 运营活动扫码进入
4. 企微@消息进入对应帖子详情

整合到同一个登录中转页下，通过构造登录链接区分
如company,end,activity,
可统一到一个字段，如type='activity',
pc登录失效则重定向到统一登陆页重新登录

### 缓存配置策略
html文件不启用强缓存，其他静态资源启用强缓存，过期之后使用协商缓存

```nginx
location / {
    root   www; # 访问根目录
    index  index.html index.htm; # 入口文件
}

location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    # 启用强缓存的静态资源， 强缓存过期之后使用协商缓存
    expires 7d; # 设置缓存时间为7天
     if_modified_since before;
    add_header Cache-Control "max-age=604800, public"; # 设置强缓存
}

location ~* \.html$ {
    # 不启用强缓存的 HTML 文件
    expires off;
}
```