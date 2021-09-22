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
