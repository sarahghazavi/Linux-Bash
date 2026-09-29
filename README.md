# جزوه لینوکس و بش

سایت استاتیک آموزشی. توضیح‌ها فارسی است و دستورها انگلیسی.

```bash
python3 -m http.server 8080
```

بعد در مرورگر: http://127.0.0.1:8080

## دیپلوی با SSH

```bash
export DEPLOY_HOST=user@your.server
export DEPLOY_PATH=/var/www/linux-bash-notes
./deploy.sh
```

روی سرور، یک `server` بلاک nginx کافی است که `root` را به همان مسیر بدهد و `index index.html` داشته باشد.
