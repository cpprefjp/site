# cpprefjpを編集するには

本cpprefjpサイトは、GitHub Pagesのサービス上に構築されていますが、編集自体はGitHubリポジトリにあるMarkdown形式のプレーンテキストで行います。

cpprefjpサイトのGitHubリポジトリは、以下になります：

* [https://github.com/cpprefjp/site](https://github.com/cpprefjp/site)


また、cpprefjpサイト上に掲載する画像ファイルのようなリソースも、GitHubリポジトリで管理しています。

* [画像ファイルリポジトリ](https://github.com/cpprefjp/image)


## GitHubからcpprefjpサイトへの自動反映
GitHub上で記述したMarkdown(.md)形式のリファレンスは、自動的にhtmlに変換されて、cpprefjpサイトに反映されます。


### 反映間隔
cpprefjp/site へ push すると、すぐに反映されます。

毎日深夜0時ころに全ページの変換を行います。ページを追加したときのサイドバーの更新や、`GLOBAL_QUALIFY_LIST.txt`を編集した場合の適用は、そのときの変換で全ページに変更が適用されます。

日次の変換中にコミットした変更は、日次の変換がおわったあと (だいたい1時間30分〜2時間くらい) に自動で変換・反映されます。


### 変換エラーの検出

### 自動反映ツール
自動反映ツールも、GitHub上で開発が進められています。

* [site_generator](https://github.com/cpprefjp/site_generator)

機能要望やpull request等がありましたら、こちらにお願いします。

このツールは、コアメンバの一人である[melpon](https://github.com/melpon)さんが保持しているサーバー上で動作しています。



## 編集権限を得るには
編集権限は現在のコミッタに与えてもらうか、pull requestしてコミッタに修正を取り込んでもらうかする必要があります。

旧cpprefjpサイトで編集を行っていた方には、優先的に編集権限をお渡しします。

以下のページに載っているコミッタの人たちの誰かにコンタクトをとってもらうか、cpprefjp/siteリポジトリのIssue報告として、編集権限の申請を行ってください。

* [cpprefjp members](https://github.com/cpprefjp?tab=members)

コミッタから直接お誘いに行く場合もありますので、快く引き受けていただければ幸いです。

cpprefjpサイトの編集に慣れていない方は、pull requestからでもぜひ始めてみてください。これは、編集権限を得るための審査ではなく、編集の練習のためだと考えてください。pull requestを何回かいただければ、継続して活動していただけるものと判断し、編集権限をお渡しします。



## Markdown形式による編集方法
cpprefjpサイトは、Markdown(.md)形式でリファレンスを記述します。

Markdownは、GitHubサービス上でドキュメントを記述するフォーマットとして広く使用されている形式です。

Markdownの記述方法をわかりやすく解説してくれているWebサイトは、すでに数多く存在しますので、詳細はそちらを参照してください。

* [Markdown記法 チートシート](http://qiita.com/Qiita/items/c686397e4a0f4f11683d)
* [文章作成やメモ書きにも便利、Markdown記法](http://kojika17.com/2013/01/starting-markdown.html)

ただし、cpprefjp特有の拡張構文もあります。
以下のページにまとめてあるので、そちらを参照して下さい。

* [cpprefjp特有の拡張構文](/editors_doc/specialized.md)


Markdown形式では、htmlのタグも併用できますが、cpprefjpサイトでは積極的にはhtmlタグを使用しない方針です。できるだけ、Markdown形式でできる範囲内で解決するようにしてください。

本サイト内で使用しているhtmlタグは以下です：

* アンカーを貼るために、`<a id="アンカー名">対象文字列</a>`のようなhtml5に基づく記法を利用している
* 表内での改行のために、`<br/>`タグを利用している
* 値の大きさを表現するために、上付き文字を表す`<sup>`タグを利用している
* 添字を表現するために、下付き文字を表す`<sub>`タグを利用している

また、Markdownパーサーの制限を回避し、表内で `|` (縦線、vertical line) を使用するために、文字参照 `&#x7C;` を使用してます。

新規リファレンスを書くにあたって、雛形ページを用意していますので、そちらをベースにして編集作業を行ってください。

* [ヘッダファイルトップページの雛形](header_template_page.md)
* [関数の雛形](function_template_page.md)
* [クラスの雛形](class_template_page.md)
* [型の別名の雛形](type-type_template_page.md)

また、リポジトリのトップディレクトリに`GLOBAL_QUALIFY_LIST.txt`というファイルがあります。サイト全体のコードブロックに対して適用したい識別子の修飾があれば、ここに列挙していきます。書き方は各雛形ページに書いてあるコードブロックの修飾と同じです。


## 初めての人は見ておいたほうがよいページ

* [処理系](/implementation.md) 処理系の正式な定義があります
* [進行状況](https://github.com/cpprefjp/site/wiki/progress) リファレンス作成の進行状況が確認できます
* [スタイル](/working_style.md) 作業を行う上でのスタイルの定義と、訳語があります


## その他、cpprefjpを編集するにあたってのドキュメント

* [乱数分布の図を作る方法](/editors_doc/random_figure.md)


## 次期C++バージョンへの対応方針と作業方法
C++の次のバージョンで入ることが決まった機能については、以下の方針で対応を行います。

- 次のバージョンの言語機能・ライブラリ機能の解説は、随時許可する
- ただし、Working Draftに採択された機能のみを対象とする。まだ提案中の機能は、本サイトでの解説の対象外とする
    - 例外は、機能テストマクロのようなコンパイラへの推奨機能
- 採択された機能は、[C++ Standards Committee Papers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/)のEditor's Reportで確認できる
- 次のC++バージョンに採択された機能は、本リポジトリのWikiページに随時記載しているので、対応状況を含めてそちらを確認すること


## ソースのコンパイルの確認について
### Mac(MacPort)

以下のオプションにてコンパイルを確認しています。

```
clang++-mp-3.3 -stdlib=libc++ -std=c++ source.cpp
```

