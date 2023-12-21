# benchmark-ionic-react-app
Ionic React APP benchmark


#### Run browser (hot reload)

```
$ ionic serve
```

#### Run extenally Emulator/Device (hot reload)

```
$ ionic cap run android -l --external
```

#### Copy ionic to native (e.g. android, ios)
```
$ ionic capacitor copy [platform] [options]
```
- Perform an Ionic build, which compiles web assets;
- Copy web assets to Capacitor native platform(s);

#### Run ionic build
```
$ ionic capacitor build [platform] [options]
```
- Perform ionic build;
- Copy web assets into the specified native platform;
- Open the IDE for your native project (Xcode for iOS, Android Studio for Android);

---
### - [ionicframework DOC](https://ionicframework.com/docs/)
### - [ionicframework CLI](https://ionicframework.com/docs/intro/cli)
### - [Ionic Build](https://ionicframework.com/docs/cli/commands/capacitor-build)