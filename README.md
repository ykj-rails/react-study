# 🚀 react-study
Wizでよく出現するReactの実装課題をまとめたリポジトリです。
課題を進めながらレビュワーにプルリクを送りましょう。
（プルリクの粒度は状況に応じて自由に設定してください。）

```
$ npm ci
$ npm run serve
```

でローカルサーバーを立ち上げて問題ないかご確認ください。


# 1.routing
SPAではroutingをreactにて行います。
現在react-study/src/tsx/index.tsxではHelloと表示されているのみなので、
`/` でLoginコンポーネント, `/todo` でtodoコンポーネントが表示されるように設定してください。

## 完成デモ
https://i.gyazo.com/a1bc9295905b3aff2ba3e48f887c5bd8.gif

## 補足
今回はReact Routerを使用します。React Routerはすでにpackge installされています。

【参考】
https://reactrouter.com/web/guides/quick-start

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

# 2.フォーム送信
フォームのstate管理を行います。
いくつかの方法がありますが、現状Wizで導入数の多いreact-fook-formを使った方法で実装してください。
作業ファイルは主にreact-study/src/tsx/views/pages/Login.tsxになります。

- ユーザー名(nameはusername)
- パスワード(nameはpassword)
の2つのinputを用意してください。

また、下記のバリデーションを通した後にpostするようにしてください。
- ユーザー名,パスワードは必須
- パスワードは5文字以上のみ可

postが成功し、200 Statusが返却されればOKです。
（login処理はこの後の課題で行います）


【参考】
https://react-hook-form.com/get-started#Quickstart

## サーバーについて
```
$ npm run mock
```

で立ち上がります。  
デフォルトは3000ポートで立ち上がりますが、PORT引数で変更できます。  

また、レスポンス仕様に関しては下記の通りです。
```
・username admin, password adminで200レスポンス。
・それ以外は422。
・形式は{ status: ステータス番号, data: {token: トークン情報 }}
```


<details>
<summary>ヒント1 バリデーションについて</summary>
 今回のバリデーションはreact-hook-formの標準機能で賄えます。
https://react-hook-form.com/get-started#applyvalidation

今回よりもっと複雑な仕様のバリデーションの場合は、[yup](https://github.com/jquense/yup)などを使うのがおすすめです。
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