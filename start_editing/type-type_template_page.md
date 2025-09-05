# page_title (1行目の見出し1はページのタイトルです。修飾なしで記載してください)

([cpprefjpを編集するには](/start_editing.md) および [cpprefjpでのMarkdown記法の制限と拡張](markdown_cpprefjp.md) を先に読んで下さい。)

(
  サンプルコードは文章中のどの部分で書いても大丈夫です。閲覧者の理解を助けるために必要だと感じたところで入れてください。
  その際拡張構文である`example`タグをルールに従って付け、コンパイル・実行可能にすることを検討してください。
)

* header_name[meta header]
* type-alias[meta id-type]
* std[meta namespace]
* class_name[meta class]
* cpp17[meta cpp]

<!-- `[meta header]`は、所属ヘッダを表すメタ情報 -->
<!-- `[meta id-type]`は、識別子の種別を表すメタ情報。class, class template, function, function template, enum, variable, type-alias, concept, macro, namespace -->
<!-- `[meta namespace]`は、所属する名前空間を表すメタ情報。マクロを考慮して省略可。名前空間の区切りは`::` -->
<!-- `[meta class]`は、所属するクラスを表すメタ情報。クラスページでは省略する。structとは書けない -->
<!-- `[meta cpp]`は、機能が追加・非推奨・削除されたバージョンを表すメタ情報。改行して複数指定ができる。 -->
<!--    `cpp11[meta cpp]` : C++11で追加された機能 -->
<!--    `cpp14[meta cpp]` : C++14で追加された機能 -->
<!--    `cpp17[meta cpp]` : C++17で追加された機能 -->
<!--    `cpp20[meta cpp]` : C++20で追加された機能 -->
<!--    `cpp23[meta cpp]` : C++23で追加された機能 -->
<!--    `cpp26[meta cpp]` : C++26で追加された機能 -->
<!--    `cpp11deprecated[meta cpp]` : C++11で非推奨になった機能 -->
<!--    `cpp14deprecated[meta cpp]` : C++14で非推奨になった機能 -->
<!--    `cpp14removed[meta cpp]` : C++14で削除された機能 -->
<!--    `cpp17deprecated[meta cpp]` : C++17で非推奨になった機能 -->
<!--    `cpp17removed[meta cpp]` : C++17で削除された機能 -->
<!--    `cpp20deprecated[meta cpp]` : C++20で非推奨になった機能 -->
<!--    `cpp20removed[meta cpp]` : C++20で削除された機能 -->
<!--    `cpp23deprecated[meta cpp]` : C++23で非推奨になった機能 -->
<!--    `cpp23removed[meta cpp]` : C++23で削除された機能 -->
<!--    `cpp26deprecated[meta cpp]` : C++26で非推奨になった機能 -->
<!--    `cpp26removed[meta cpp]` : C++26で削除された機能 -->
<!--    `future[meta cpp]` : 将来のC++で検討されている機能 -->
<!--    `archive[meta cpp]` : 廃案になったが記録として残す価値のあるC++機能 -->

```cpp
typedef origin_type new_type;
```

## 概要
(ここには、型の概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執筆中)」と書いておいてください。)

これは、メンバ型等の、型の別名定義を解説するページの雛形です。

ページ名の先頭に「`type-`」を付けることにより、cpprefjpサイト左部のサイドバーに並ぶページの順番を制御できます。その接頭辞を付けた場合には、型のページは並びの最後に来ます(関数、演算子、型の順番)。


## 備考
(用途、注意事項、バージョンによる変更の経緯などを書いてください。省略可能です)


## この機能が必要になった背景・経緯
(ここには、その機能が必要になった背景や経緯を記述します。その機能で解決したい問題は何だったのかは、ユーザーがその言語機能を実際に使う上で重要な情報となります。余裕があったら書いてください)


## 例

```cpp example
// (ここには、関数・変数・定数を解説するための、サンプルコードを記述します。省略可能です)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)
```

### 出力
```
```

(ここには、サンプルコードの実行結果を記述します。何も出力がない場合は、項目を削除せず、空の出力にしてください。)  
(実行結果が処理系・実行環境によって異なる場合は、項目名を「出力例」に変更し、可能であればその理由も併記してください。)


### 処理系
- [Clang](/implementation.md#clang): 1.9 [mark verified], 2.9 [mark verified], 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.2 [mark verified], 4.8.1 [mark verified]
- [ICC](/implementation.md#icc): 10.1 [mark verified], 11.0 [mark verified], 11.1 [mark verified], 12.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified]

(ここには、その機能が存在する言語のバージョンと、確認がとれたコンパイラとそのバージョンを記述します。)  
(これらの項目を削除した場合、C++03のあらゆる環境で使用できることを意味します。)
(確認のテストできないときは、??を記述してください。)

### 備考
(処理系ごとに存在するバグや注意事項を記述します。とくにない場合は、項目を削除してください。)


## 関連項目
(ここには、その機能と関連のあるcpprefjpサイト内の項目へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)


## 参照
(ここには、その関数・変数・定数を理解するにあたっての参考資料や、関連する機能へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)
