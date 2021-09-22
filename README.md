# 🚀 react-study
Wizでよく出現するReactの実装課題をまとめたリポジトリです。
Wiz関係の案件にアサインできるよう、よく使うライブラリや実装を中心にまとめています。

【こんな人におすすめ】
・チュートリアルや基本的な構文は理解したけど、次に何をしたらいいかわからない...
・wizで使われているReact周りのライブラリの何を勉強すればいいかわからない

課題を進めながらレビュワーにプルリクを送りましょう。
（プルリクの粒度は状況に応じて自由に設定してください。）

```
$ npm ci
$ npm run serve
```

でローカルサーバーを立ち上げて問題ないかご確認ください。


# 1.routing
SPAではroutingをreactにて行います。
現在react-study/src/tsx/index.tsxではHelloと表示されているのみなので、以下の要件を満たすよう実装してください。
- `/` でLoginコンポーネントが表示される
- `/todo` でTodoコンポーネントが表示される
, `/todoconfig` でTodoconfigコンポーネントが表示されるように設定してください。
## 難易度
★☆☆☆☆

## 完成デモ
https://i.gyazo.com/a1bc9295905b3aff2ba3e48f887c5bd8.gif

## 補足
今回はReact Routerを使用します。React Routerはすでにpackge installされています。

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

## pullRequestを提出しよう！
1.Routingが完了したらpullRequestを作成し、team-reactで@channelで報告しましょう！
完了したら次のステップへ！

# 2.フォーム送信
フォームのstate管理を行います。
いくつかの方法がありますが、現状Wizで導入数の多いreact-hook-formを使った方法で実装してください。
*react-hook-formはインストール済みです。なので実装に入りましょう。
作業ファイルは主にreact-study/src/tsx/views/pages/Login.tsxになります。

- ユーザー名(nameはusername)
- パスワード(nameはpassword)
の2つのinputを用意してください。

また、下記のバリデーションを通した後にpostするようにしてください。
- ユーザー名,パスワードは必須
- パスワードは5文字以上のみ可

postが成功し、200 Statusが返却されればOKです。
（login処理はこの後の課題で行います）

## 難易度
★★☆☆☆

## goal
postが成功し、200 Statusを受け取る。

## 完成デモ

### POST成功時
https://gyazo.com/036a22898cd7e16eaf7a4a629b2fc6ab
### validation失敗時
#### usernameない編
https://gyazo.com/8db2d974c680001820b878e1bbc11bae
### passwordない編
https://i.gyazo.com/6e49c3ddd037a7d24a7f1b24493d17c8.gif
### sever側のvalidation編
https://gyazo.com/abbb0ea3b1b30849664de76af9ce6d77

## サーバーについて
```
$ npm run mock
```

で立ち上がります。  
デフォルトは3000ポートで立ち上がりますが、PORT引数で変更できます。  

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

今回よりもっと複雑な仕様のバリデーションの場合は、[yup](https://github.com/jquense/yup)などを使うのがおすすめです。
*標準機能を実装できたら挑戦してみましょう！
</details>

<details>
<summary>ヒント2 バリデーションについて</summary>
今回捌く必要のあるバリデーションは二つあります。
react-fookf-formから発行されるバリデーションと、
サーバーから返却されるエラーです。

react-fookf-formから発行されるバリデーションは、`ErrorMessage`を使うことで簡単に実装することができます。
https://react-hook-form.com/api/useformstate/errormessage/#main

サーバーから返却されるエラーはレスポンスを見てreact-fook-formに通知する必要があります。
エラーをセットするには`setError`などを使い、ErrorMessageをサーバー用に用意するといいと思います。
https://react-hook-form.com/api/useform/seterror


</details>

## 参考文献
react-hook-formはかなり使います！チェックしておきましょう！
またアップデートする時に書き方が割と変化したりするので最新状況も追っておきましょう！

https://react-hook-form.com/get-started#Quickstart

# 3.トークンの管理
トークンを保持し、トークンが生きている間は他の機密事項にアクセスできるようにします。

こういったアプリ全体で管理するグローバルなStateは、少し管理に工夫が必要です。

色々な方法がありますが、Wizで導入数の一番多いredux-toolkitを使った実装方法を採用します。

下記の仕様で実装してください。
- Login直後は /todo にリダイレクトする。
- Loginが切れたらトップにリダイレクトする。
- /todoはログイン状態（つまりtokenが保持されている状態)のみアクセス可能とする。
- 別APIを叩くなどで認証が必要になったときに初めて期限切れtokenを破棄する。

## 参考文献
https://redux-toolkit.js.org/


## 難易度
★★★☆☆

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
reactではstyleについてのコアシステムを持たず、他ライブラリに委譲することで実装者が自分の好きな手法を選択することができます。（スタイルに限らず、Reactのエコシステム全般に言える設計思想です。）
Wizでも様々な手法を用いて実装されていますが、一番導入の多いEmotionでの実装を選択します。

事前に用意しているsrc/tsx/views/components/Header.tsxにおいて、
- ヘッダーのスタイルを整えること（自由にOK）
- ログイン時は背景色を別の色に変更する（好きな色でOK）

## 補足
Emotionの環境設定は済んでおり、プラグマ(@jsx)の記述も必要ありません。

## 参考文献
https://emotion.sh/docs/introduction

## 難易度
★★☆☆☆

<details>
<summary>ヒント1</summary>
ログイン状態を取得するには、redux-toolkitのslicesからexportすればOKです。
https://redux-toolkit.js.org/tutorials/typescript#application-usage
</details>
