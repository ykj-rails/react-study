# 🚀 react-study

Wiz でよく出現する React の実装課題をまとめたリポジトリです。
Wiz 関係の案件にすぐ取り組めるよう、よく使うライブラリや実装を中心にまとめています。

【こんな人におすすめ】
・チュートリアルや基本的な構文は理解したけど、次に何をしたらいいかわからない...
・wiz で使われている React 周りのライブラリの何を勉強すればいいかわからない

課題を進めながらレビュワーにプルリクを送りましょう。
（プルリクの粒度は状況に応じてレビュワーと相談しつつ自由に設定してください。）

```
$ npm ci
$ npm run serve
```

でローカルサーバーを立ち上げて問題ないかご確認ください。

# 1.routing

SPA では routing を React にて行います。
現在 react-study/src/tsx/index.tsx では Header が表示されているのみなので、以下の要件を満たすよう実装してください。

- どの URL でも Header が表示されるようにする
- `/` で Login コンポーネントが表示される
- `/todo` で Todo コンポーネントが表示される
  , `/todoconfig` で Todoconfig コンポーネントが表示されるように設定してください。

## 難易度

★☆☆☆☆

## 完成デモ

https://i.gyazo.com/a1bc9295905b3aff2ba3e48f887c5bd8.gif

## 補足

今回は React Router を使用します。React Router はすでに packge install されています。

<details>
<summary>ヒント1(何したいいかわからない編)</summary>

- とりあえず参考記事を読んでみてコードを書いてみよう(ヒントじゃないね)
- [翻訳機能で読んで挑戦してみよう](https://reactrouter.com/web/guides/quick-start/1st-example-basic-routing)
</details>

<details>
<summary>ヒント2</summary>

```
・ 排他的にマッチさせるにはSwitchが必要。
・ Switchは上から順にマッチするか検索する点に注意。
・ Switch以外にも条件一致させることができるので探してみてね
```

</details>

## 参考文献

実装だけでなくライブラリをある程度理解しておきましょう！

https://reactrouter.com/web/guides/quick-start

## pullRequest を提出しよう！

1.Routing が完了したら pullRequest を作成し、team-react で@channel で報告しましょう！
完了したら次のステップへ！

# 2.フォーム送信

フォームの state 管理を行います。
いくつかの方法がありますが、現状 Wiz で導入数の多い react-hook-form を使った方法で実装してください。
\*react-hook-form はインストール済みです。なので実装に入りましょう。
作業ファイルは主に react-study/src/tsx/views/pages/Login.tsx になります。

- ユーザー名(name は username)
- パスワード(name は password)
  の 2 つの input を用意してください。

また、下記のバリデーションを通した後に post するようにしてください。

- ユーザー名,パスワードは必須
- パスワードは 5 文字以上のみ可

post が成功し、200 Status が返却されれば OK です。
（login 処理はこの後の課題で行います）

## 難易度

★★☆☆☆

## goal

post が成功し、200 Status を受け取る。

## 完成デモ

### POST 成功時

https://gyazo.com/036a22898cd7e16eaf7a4a629b2fc6ab

### validation 失敗時

#### username ない編

https://gyazo.com/8db2d974c680001820b878e1bbc11bae

### password ない編

https://i.gyazo.com/6e49c3ddd037a7d24a7f1b24493d17c8.gif

### sever 側の validation 編

https://gyazo.com/abbb0ea3b1b30849664de76af9ce6d77

## サーバーについて

```
$ npm run mock
```

で立ち上がります。  
デフォルトは 3000 ポートで立ち上がりますが、PORT 引数で変更できます。

また、レスポンス仕様に関しては下記の通りです。

```
・username: admin, password: adminで200レスポンス。
・それ以外は422。
・形式は{ status: ステータス番号, data: {token: トークン情報 }}
```

<details>
<summary>ヒント1 バリデーションについて</summary>
今回のバリデーションはreact-hook-formの標準機能で賄えます。

https://react-hook-form.com/get-started#applyvalidation

今回よりもっと複雑な仕様のバリデーションの場合は、[yup](https://github.com/jquense/yup)などを使うのがおすすめです。 \*標準機能を実装できたら挑戦してみましょう！

</details>

<details>
<summary>ヒント2 バリデーションについて</summary>
今回捌く必要のあるバリデーションは二つあります。
react-fookf-formから発行されるバリデーションと、
サーバーから返却されるエラーです。

react-fookf-form から発行されるバリデーションは、`ErrorMessage`を使うことで簡単に実装することができます。
https://react-hook-form.com/api/useformstate/errormessage/#main

サーバーから返却されるエラーはレスポンスを見て react-fook-form に通知する必要があります。
エラーをセットするには`setError`などを使い、ErrorMessage をサーバー用に用意するといいと思います。
https://react-hook-form.com/api/useform/seterror

</details>

## 参考文献

react-hook-form はかなり使います！チェックしておきましょう！
またアップデートする時に書き方が割と変化したりするので最新状況も追っておきましょう！

https://react-hook-form.com/get-started#Quickstart

# 3.トークンの管理

トークンを保持し、トークンが生きている間は他の機密事項にアクセスできるようにします。

こういったアプリ全体で管理するグローバルな State は、少し管理に工夫が必要です。

色々な方法がありますが、Wiz で導入数の一番多い redux-toolkit を使った実装方法を採用します。

下記の仕様で実装してください。

- Login 直後は /todo にリダイレクトする。
- Login が切れたらトップにリダイレクトする。
- /todo はログイン状態（つまり token が保持されている状態)のみアクセス可能とする。
- token は redux ではなく Cookie にて管理する。（再訪問時もログインが生きるようにするため）
- 別 API を叩くなどで認証が必要になったときに初めて期限切れ token を破棄する。

## トークン保持について

今回はプロジェクトよく使われている管理方法として、js-cookie ライブラリでトークンを cookie で管理します。

js-cookie はインストールされていますのでそのままお使いください

\*cookie で管理することが必ずしもベストプラクティスとは限りません。セッションという単語も聞いたことがあると思います。

今回は`cookie`という認識でいてもらえますと幸いです。実際に案件で token 管理する際に一度調べてみるといいかもしれません。

## 参考文献

https://redux-toolkit.js.org/

## 難易度

★★★☆☆

## 完成デモ

### Login 処理 /todo へ　

https://gyazo.com/760e41bed7ed8dd055e724d17173110c

### token がなかった時/login 状態が確認できない時

https://gyazo.com/0b11f1e6781c8b49afffe1551cb43e1c

<details>
<summary>ヒント1</summary>
sliceの作り方は、GutHubにあるtemplate_reactのコードを参考にしてみてください。
https://github.com/wiz-creative/template_react/tree/master/src/tsx/stores
</details>

<details>
<summary>ヒント2</summary>
tokenが保持されているかどうかリダイレクトするには、ルーティングのコンポーネントをラッピングして、tokenの確認の機能をつけるという方法をよく取ります。
template_reactのindex.jsで実際に実装されているので、確認してみてください!
https://github.com/wiz-creative/template_react/blob/master/src/tsx/index.tsx

</details>

# 4.スタイル

react では style についてのコアシステムを持たず、他ライブラリに委譲することで実装者が自分の好きな手法を選択することができます。（スタイルに限らず、React のエコシステム全般に言える設計思想です。）
Wiz でも様々な手法を用いて実装されていますが、一番導入の多い Emotion での実装を選択します。

事前に用意している src/tsx/views/components/Header.tsx において、

- ヘッダーのスタイルを整えること（自由に OK）
- ログイン時は背景色を別の色に変更する（好きな色で OK）

## 難易度

★★☆☆☆

## 補足

Emotion の環境設定は済んでおり、プラグマ(@jsx)の記述も必要ありません。

## 参考文献

https://emotion.sh/docs/introduction

## 完成デモ

### ヘッダー背景（未ログイン:yellow => ログイン時:green）

https://gyazo.com/5a7ad8473d23f275bfd1f3c76de21d0b

<details>
<summary>ヒント1</summary>
ログイン状態を取得するには、redux-toolkitのslicesからexportすればOKです。
https://redux-toolkit.js.org/tutorials/typescript#application-usage
</details>

# 5.トークン認証 API 編

課題 3 にて、token の管理を行ったと思います。
今度は token があった時その token が有効かを確認する処理を書いてみましょう。

下記の仕様で実装してください。

- cookie 内の token を確認(課題 3 で実装している)
- /auth を実行する処理を書いてください。
- token があった場合、/auth api を叩く。
- token 有効であった場合 status 200 が返ってくるので、ログインしている状態にしてください。
- token が有効でない場合　エラーが返ってきます。その場合はログイン画面へ

レスポンス仕様

```
・headers Authorization: Bearer 正しいtokenで200レスポンス。
・それ以外はエラーメッセージ。
・形式は{ status: ステータス番号 }}
```

## 難易度

★★★★☆

## 完成デモ

### Login 処理 /todo へ　

https://gyazo.com/760e41bed7ed8dd055e724d17173110c

### token がなかった時/login 状態が確認できない時

https://gyazo.com/0b11f1e6781c8b49afffe1551cb43e1c

<details>
<summary>ヒント1</summary>
どこに書いたらいいのか。
それはtoken管理を行った場所とほぼ等しいです。
パーソナルファイル/サイネージCMS/カコエル　のリポジトリを見てみましょう
</details>

<details>
<summary>ヒント2</summary>
apiを叩く処理は、コンポーネント用のファイルで叩くもよしですし、
stores/slices以下に slice用のファイルとして作成しても良しです
</details>
