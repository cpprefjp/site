# page_title ((1行目の見出し1はページのタイトルです。修飾なしで記載してください)

([cpprefjpを編集するには](/start_editing.md) および [cpprefjpでのMarkdown記法の制限と拡張](markdown_cpprefjp.md) を先に読んで下さい。)

(
  サンプルコードは文章中のどの部分で書いても大丈夫です。閲覧者の理解を助けるために必要だと感じたところで入れてください。
  その際拡張構文である`example`タグをルールに従って付け、コンパイル・実行可能にすることを検討してください。
)

* header_name[meta header]
* cpp17[meta cpp]

<!-- `[meta header]`は、所属ヘッダを表すメタ情報 -->
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

(ここには、このヘッダファイル(ライブラリ)の概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執筆中)」と書いておいてください。)

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
|                 |                |                |
|                 |                |                |
|                 |                |                |
|                 |                |                |

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 1.9 [mark verified], 2.9 [mark verified], 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.2 [mark verified], 4.8.1 [mark verified]
- [ICC](/implementation.md#icc): 10.1 [mark verified], 11.0 [mark verified], 11.1 [mark verified], 12.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified], 2012 [mark verified]

(ここには、そのヘッダファイルが存在する言語のバージョンと、確認がとれたコンパイラとそのバージョンを記述します。)  
(これらの項目を削除した場合、C++03のあらゆる環境で使用できることを意味します。)


## 関連項目
(ここには、その機能と関連のあるcpprefjpサイト内の項目へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)


## 参照
(ここには、その関数・変数・定数を理解するにあたっての参考資料や、関連する機能へのリンクを記述します。とくに必要がないと判断した場合、項目を削除してください。)

