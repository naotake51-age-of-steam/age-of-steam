## 開発環境構築手順

### リポジトリをローカルにクローン

```bash
mkdir age-of-steam
cd ./age-of-steam

git clone git@github.com:naotake51-age-of-steam/age-of-steam.git
git clone git@github.com:naotake51-age-of-steam/age-of-steam-firebase.git
git clone git@github.com:naotake51-age-of-steam/rust-belt-core.git
```

### Firebase 開発用エミュレータを起動

```bash
cd ./age-of-steam-firebase
cd ./functions
npm i
npm run build # もしくは npm run build:watch
firebase emulators:start --debug
```

### rust-belt-core パッケージをリンク

```bash
cd ./rust-belt-core
npm i
npm run build # もしくは npm run dev
npm link
```

### Next.js 起動

```bash
cd ./age-of-steam
npm i
npm link @age-of-steam/rust-belt-core
npm run dev #localhost:3000で起動
```
