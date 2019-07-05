# yzcloud-ui

> A Vue.js project

## Build Setup

本地开发:
  git clone https://gitee.com/aiyunzhi/yzcloud-ui.git  // 克隆 拉取代码到本地
  yarn install // 安装依赖
  npm run dev/npm start   // 启动项目

  http://localhost:9999/vue  客户端  微信内
  http://localhost:9999/     admin后端  pc浏览器
部署开发:
  git clone https://gitee.com/aiyunzhi/yzcloud-ui.git  // 克隆 拉取代码
  yarn install // 安装依赖
  npm run build   // 打包项目

  项目静态文件：dist文件
  index.html  admin后端
  vue.html    微信客户端


  nginx 配置

  server {
    listen       80;
    server_name  test.aiyunzhi.cn;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    # admin客户端  
    location / {
        root   /usr/share/nginx/html;
	      try_files $uri $uri/ /index.html last;
        index  index.html index.htm;
    }
    # 微信客户端  
    location /vue {
        root   /usr/share/nginx/html;
	      try_files $uri $uri/ /vue.html last;
        index  vue.html vue.htm;
    }
    # 接口代理
    location /api/ {
	      proxy_pass  http://127.0.0.1:8001/;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
