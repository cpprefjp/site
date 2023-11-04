# はじめてのコントリビュート

本cpprefjpサイトは、GitHub Pagesのサービス上に構築されていますが、編集自体はGitHubリポジトリにあるMarkdown形式のプレーンテキストで行います。

cpprefjpサイトのGitHubリポジトリは、以下になります：

* [https://github.com/cpprefjp/site](https://github.com/cpprefjp/site)


また、cpprefjpサイト上に掲載する画像ファイルのようなリソースも、GitHubリポジトリで管理しています。

* [画像ファイルリポジトリ](https://github.com/cpprefjp/image)


## GitHubからcpprefjpサイトへの自動反映
GitHub上で記述したMarkdown(.md)形式のリファレンスは、GitHub Actionsによって自動的にHTMLに変換されて、cpprefjpサイトに反映されます。


### 反映間隔
cpprefjp/site へ push すると、すぐに反映されます。

毎日深夜0時ころに全ページの変換を行います。ページを追加したときのサイドバーの更新や、`GLOBAL_QUALIFY_LIST.txt`を編集した場合の適用は、そのときの変換で全ページに変更が適用されます。

日次の変換中にコミットした変更は、日次の変換がおわったあと (だいたい1時間30分〜2時間くらい) に自動で変換・反映されます。


### 自動デプロイ、自動テスト
本リポジトリでは、GitHub Actionsを使用して、自動デプロイと自動テストを行っています。

#### 自動デプロイ
buildアクションで、MarkdownからHTMLへの変換と、GitHub Pagesへのデプロイを行っています。

変換時になんらかのエラーが発生した場合には、GitHub Actionsが失敗します。その場合、手元で修正して再度git pushを行うことになります

変換エラーではなく、GitHub Pagesリポジトリへのgit pushに失敗した場合 (buildアクションの実行中に新たなコミットがgit pushされた場合など) には、そのbuildアクションに対してRe-run jobを実行し、再度変換を行ってください。


#### 自動テスト
- 禁止文字の検出 (detect forbidden charactersアクション)
    - 説明は[detect_forbidden_characters.yml](https://github.com/cpprefjp/site/blob/master/.github/workflows/detect_forbidden_characters.yml)のコメントを参照
- 内部リンクの誤り検出 (inner link checkアクション)
    - サイト内のリンクが存在しない、または存在しているのに.nolinkを指定している場合にエラーが発生する
    - [GitHub Actionsの実行ログ](https://github.com/cpprefjp/site/actions/workflows/inner_link_check.yml)で、どのページのどのリンクが不正かがわかるので、それを修正すること
- 外部リンク切れを検出 (outer link checkアクション)
    - 日本時間で日曜日の23:30に実行される
    - 外部リンクのページにアクセスできない (ページが消滅したか、一時的にアクセスできない、などの理由) 場合にエラーとなる
    - エラーが発生した場合は、本リポジトリにissueが発行される
    - ページが消滅した場合は、代替となるものがあれば差し替え、なければInternet Archiveに変更する
    - 一時的にアクセスできない場合は、時間を置いてアクセスできるようになったらissueを閉じる
    - 海外からのアクセス (GitHub Actions) を拒否しているページもあるため、そのようなページは個別にチェックから外す ([link_check.py](https://github.com/cpprefjp/site/blob/master/.github/workflows/script/link_check.py)の`IGNORE_LIST`に追加する)
- コード修飾の誤り検出 (code qualify checkアクション)
    - コードブロック中のコードを修飾しているのに、その修飾対象がない場合に、エラーが発生する
    - [GitHub Actionsの実行ログ](https://github.com/cpprefjp/site/actions/workflows/code_qualify_check.yml)で、どのページのどのコード修飾が不正かがわかるので、それを修正すること


### 自動反映ツール
自動反映ツールも、GitHub上で開発が進められています。

- [site_generator](https://github.com/cpprefjp/site_generator)

機能要望やpull request等がありましたら、こちらにお願いします。


## 編集権限を得るには
push権限を持っていない方は、pull requestで何らかの編集を行うところからはじめてください。タスクを引き取っていただける場合には、タスクのissueに「やります」とコメントを書いていただければ、担当をお渡しします。

本サイトに対してpull requestを提出していただければ、取り込んだあとに管理者から編集権限をお渡しします。

pull requestに慣れていない場合には、issueでの相談からはじめていただければと思います。

管理者からpush権限をお渡しする申請が届いた場合には、引き受けていただけると幸いです。


## Markdown形式による編集方法
cpprefjpサイトは、Markdown(.md)形式でリファレンスを記述します。

Markdownは、GitHubサービス上でドキュメントを記述するフォーマットとして広く使用されている形式です。

Markdownの記述方法をわかりやすく解説してくれているWebサイトは、すでに数多く存在しますので、詳細はそちらを参照してください。

- [Markdown記法 チートシート](http://qiita.com/Qiita/items/c686397e4a0f4f11683d)
- [文章作成やメモ書きにも便利、Markdown記法](http://kojika17.com/2013/01/starting-markdown.html)

ただし、cpprefjp特有の拡張構文もあります。
以下のページにまとめてあるので、そちらを参照して下さい。

- [cpprefjp特有の拡張構文](/start_editing/specialized.md)

Markdown形式では、HTMLのタグも併用できますが、cpprefjpサイトでは積極的にはHTMLタグを使用しない方針です。できるだけ、Markdown形式でできる範囲内で解決するようにしてください。

ただし、注釈・出典を貼るためにHTMLタグを利用します。

- [cpprefjpにおける注釈・出典の貼り方](/start_editing/cite_note_ref.md)

それ以外に本サイト内で使用しているHTMLタグは以下です：

- アンカーを貼るために、`<a id="アンカー名">対象文字列</a>`のようなHTML5に基づく記法を利用している
- 表内での改行のために、`<br/>`タグを利用している
- 値の大きさを表現するために、上付き文字を表す`<sup>`タグを利用している
- 添字を表現するために、下付き文字を表す`<sub>`タグを利用している

また、Markdownパーサーの制限を回避し、表内で `|` (縦線、vertical line) を使用するために、文字参照 `&amp;#x7C;` を使用してます。

新規リファレンスを書くにあたって、雛形ページを用意していますので、そちらをベースにして編集作業を行ってください。

- [言語機能の雛形](/start_editing/lang_template_page.md)
- [ヘッダファイルページの雛形](/start_editing/header_template_page.md)
- [モジュールページの雛形](/start_editing/module_template_page.md)
- [関数の雛形](/start_editing/function_template_page.md)
- [クラスの雛形](/start_editing/class_template_page.md)
- [型の別名の雛形](/start_editing/type-type_template_page.md)
- [コンセプトの雛形](/start_editing/concept_template_page.md)
- [名前付き要件の雛形](/start_editing/named_requirement_template_page.md)
- [比較演算子の雛形](/start_editing/comparison_operator_template_page.md)
- [CPOの雛形](/start_editing/cpo_template_page.md)

また、リポジトリのトップディレクトリに`GLOBAL_QUALIFY_LIST.txt`というファイルがあります。サイト全体のコードブロックに対して適用したい識別子の修飾があれば、ここに列挙していきます。書き方は各雛形ページに書いてあるコードブロックの修飾と同じです。


## 初めての人は見ておいたほうがよいページ

- [処理系](/implementation.md) 処理系の正式な定義があります
- [進行状況](https://github.com/cpprefjp/site/wiki/progress) リファレンス作成の進行状況が確認できます
- [スタイル](/working_style.md) 作業を行う上でのスタイルの定義と、訳語があります


## その他、cpprefjpを編集するにあたってのドキュメント

- [ページファイル名の付け方](/start_editing/page_names.md)
- [乱数分布の図を作る方法](/start_editing/random_figure.md)
- [ディレクトリ構造](/start_editing/directory_structure.md)


## Pull Requestのレビューとマージ
push権限を持っている方は、Pull Requestのレビューとマージもぜひお願いします。

Pull Requestを送っていただいた方には、管理者から後ほどpush権限をお渡しします。権限の譲渡は管理者がする必要がありますが、レビューとマージは、ほかのpush権限保持者がしていただいてかまいません。

Pull Requestのレビューが滞っていた場合、Pull Requestの提出者の方は、cpprefjpのpush権限保持者に対して、個人的にレビューを依頼してもかまいません。push権限保持者がだれかは、以下のページから確認できます：

- [cpprefjp people](https://github.com/orgs/cpprefjp/people)
    - 権限保持者の確認に使用できます
- [cpprefjp contributors](https://github.com/cpprefjp/site/graphs/contributors)
    - 各人が本サイトにどれくらいコントリビュートしているかを確認できます

ただし可能な限り、レビュアーとの技術的な議論はPull Request上で行っていただけると助かります。これは、議論を記録として残すことが目的です。


## Git関係のルール
- コミットメッセージに厳密な書式は設けない
    - 人によっては「〜を修正」のように書き、またある人は「fix ...」のように書きます。コミットメッセージは修正内容がわかることが大事で、書式はそれほど重要ではないという考えです
    - また、本リポジトリが、英語の情報を元に日本語情報を提供する、という特性上、コミットメッセージが日本語と英語どちらであっても編集者が困ることはないはずですので、日本語か英語であれば、どちらで書いてもよいものとします
    - コミットメッセージの内容としては、とくに自分以外の人が書いた文章を編集する際には、コミットメッセージに「なぜそのように編集したのか」をできるだけ書いたほうがよいです。これは、経緯を振り返りやすくすることが目的です
- 強制プッシュ
    - `git push -f`や`git push --force`といったコマンドは、リポジトリの設定で、masterブランチに対してはできないようにしてあります。これは、masterブランチは壊してはならないという理由によるものです
    - masterブランチ以外には強制プッシュできますので、Pull Request用のトピックブランチのコミットを整理する、といった目的などで使用していただいて大丈夫です


## 求められる編集作業
### 誤字・脱字を修正する (難易度★)
本サイトは編集者が手入力で解説を書いているため、誤字・脱字はどうしても発生してしまいます。

誤字・脱字があったら、積極的に修正してください。


### 動作確認できたコンパイラバージョンを記載する (難易度★★)
本サイトのライブラリリファレンスでは、機能ごとに動作確認ができたコンパイラバージョンを記載しています。

各ページを書いた時点での動作確認できたコンパイラバージョンは記載していますが、その後の更新は十分に行えていません。

サンプルコードの下に以下のように動作確認できたコンパイラバージョンを記載する項目がありますので、「??」になっている項目がありましたら、動作確認して埋めていっていただきたいです。

```
## 処理系
### バージョン
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 1
```

バージョンの表記としては、とくにVisual C++は本サイト独自の表記法がありますので、以下のページを確認してください。

- [処理系](implementation.md)

対応バージョンは、動作確認できたコンパイラのうち、最小のバージョンを知りたいので、記載されているものより古いコンパイラバージョンで動作確認ができた場合は、記載されているバージョンを修正してください。

動作確認の方法としては、対象ページのサンプルコードを、お手元のコンパイラでコンパイル・実行し、出力が記載されているものと一致しているかを確認してください。

ただし、「出力例」のように記載されている場合、プラットフォームごとに出力が異なる可能性があります。その場合は仕様と実装を確認していただく必要があるかもしれません。

動作確認は、Webブラウザ上で行える場合があります。オンラインコンパイラとして、以下のサービスの使用も検討してください。

- [Wandbox](https://wandbox.org/)
- [Compiler Explorer](https://godbolt.org/)


### 関連項目を追加する  (難易度★★★)
各ページには、「`## 関連項目`」という見出し以下に本サイト内の関連ページを記載できます。

読者が関連する情報を追いやすいように、関連ページへのリンク追加をお願いしたいです。

関連項目としては、以下のようなものを記載します：

- 言語機能であれば、その機能への仕様変更・拡張など
- ライブラリであれば、
    - 組み合わせて使うことが多いもの
    - 特定のデータ構造に特化した関数と、汎用の関数
    - その機能の代わりに使用を検討したほうがよいもの

関連項目を書く場所については、各雛形ページを参照してください。

- [言語機能の雛形](/start_editing/lang_template_page.md)
- [ヘッダファイルページの雛形](/start_editing/header_template_page.md)
- [モジュールページの雛形](/start_editing/module_template_page.md)
- [関数の雛形](/start_editing/function_template_page.md)
- [クラスの雛形](/start_editing/class_template_page.md)
- [型の別名の雛形](/start_editing/type-type_template_page.md)
- [コンセプトの雛形](/start_editing/concept_template_page.md)
- [名前付き要件の雛形](/start_editing/named_requirement_template_page.md)
- [比較演算子の雛形](/start_editing/comparison_operator_template_page.md)
- [CPOの雛形](/start_editing/cpo_template_page.md)


### サンプルコードを追加する (難易度★★★★)
本サイトは、すべての機能にひとつ以上のサンプルコードを付けることを大きな価値としています。

サンプルコードをひとつは (ほぼ) 必ず付けるようにしていますが、ユースケースをカバーできていない場合があります。

良質なサンプルコードを作ることはむずかしいですが、機能の有用性を説明する最小サンプルコードを書くことに慣れている方や挑戦したい方にお願いしたいです。

サンプルコードを追加する場合、以下の要件を満たすようお願いします：

1. 既存サンプルコードとは異なるユースケースや、異なる観点を与えるものであること
2. 標準の範囲内でその機能の有用性を説明しにくい場合を除き、プラットフォーム非依存であること
3. 十分に小さいこと


### 新仕様に対応する (難易度★★★★★★)
C++の規格書を読み慣れている方向けになります。

C++の新仕様やCWG/LWGのissueへの対応作業が多く求められます。対応がまだ行われていない作業は、以下で確認できます。

- [cpprefjp/siteリポジトリのタスクissue](https://github.com/cpprefjp/site/issues)
    - 担当をとりやすいようタスクissueにしているものがある
- [cpprefjp/siteリポジトリのWiki](https://github.com/cpprefjp/site/wiki)
    - CWG (Core Working Group) や LWG (Library Working Group) へのissue (Defect Report) など、タスクissueにしていない未対応タスクがすべて記載されている

C++の次のバージョンで入ることが決まった機能については、以下の方針で対応を行います。

- 次のバージョンの言語機能・ライブラリ機能の解説は、随時許可する
- ただし、Working Draftに採択された機能のみを対象とする。まだ提案中の機能は、本サイトでの解説の対象外とする
    - 例外は、機能テストマクロのようなコンパイラへの推奨機能
- 採択された機能は、Wikiの各言語バージョンのページに記載されているが、されていなかったら[C++ Standards Committee Papers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/)のEditor's Reportで確認できる


### 優先度が低くなっている古くからある機能を記載する (難易度★★★★★★)
本サイトはなるべくすべての機能の解説を書くことを目標にしてはいますが、記載が追いついていないものがいくつかあります。

- iostream系
- C互換ライブラリ
- ロケール

これらはタスクissueにもできていませんが、手が足りず作業できていません。


## <a name="point" href="#point">貢献ポイント</a>
cpprefjpおよびboostjpでの作業は、以下のように貢献ポイントを割り振った上で、年間の貢献 (12月から翌年11月) を集計して収益をコントリビューターの方々に分配します。

分配の手順は以下のようになります：

1. コアメンバーが集計用のPull Requestを立てる
2. コントリビューターの方々からの追加・修正の指摘を募集する
3. 各コントリビューターの年間貢献ポイントと分配率を仮決定
4. 貢献ポイントの追加・修正指摘、および分配の受け入れ、または辞退の申し出を受け付ける (1週間程度)
    - 期間内に分配の受け入れ申し出がない場合は、貢献ポイントを次年繰り越す (前年まで保持)
5. 辞退者を除いて分配率および分配額を決定する
6. 入金先の情報をコアメンバー宛に伝える
    - cpprefjpの銀行口座から支払う場合は、Googleフォームを用意する予定
    - Open Collectiveから支払う場合は、後述する手順で経費申請する

お金での分配を辞退された方にも、ステッカーの配布などでお返しができればと考えています。

なお、マージされずにクローズされたPull Requestについては貢献ポイントの対象外とさせていただきます。

また、masterブランチにマージされずオープンなままのPull Requestについては、マージされた年に貢献ポイントをつけさせていただきます。

貢献ポイントとして含めないものには、以下があります

1. 議論への参加、問題提起、問題報告
    - Issueの発行
    - Issue / Pull Request / コミットへのコメント
    - SNS上での当Webサイトへの問題報告
2. GitHub Wikiの編集

貢献ポイントの集計方法として、以下の注意事項があります

- 同年内の当人による同ページへの複数の修正は、貢献ポイントをまとめる場合がある
    - 連続した作業が複数コミットになった場合などにまとめる
    - 複数の仕様変更による複数の修正の場合などはまとめない
- 同ページ内に対する複数の修正は、大きい貢献ポイントにまとめる場合がある
    - リンク追加・修正を含む説明修正は、fixmやfixlなどにまとめる


### cpprefjp

| タグ | ポイント | 説明 |
|-----|---------|------|
| cpprefjp/typo     |  1 | 誤字・脱字の修正 (ページ単位) |
| cpprefjp/link     |  2 | 関連項目・参照リンクなどの追加・修正、nolinkの解除 (ページ単位) |
| cpprefjp/addref   | 20 | リファレンスを1ページ追加 |
| cpprefjp/addlang  | 20 | 言語機能を1ページ追加 |
| cpprefjp/addpage  | 20 | その他ページ追加 (articleや編集者向けページなど) |
| cpprefjp/fixs     |  2 | 既存ページへの修正 : small 軽微な修正、コード修飾追加 (ページ単位) |
| cpprefjp/fixm     |  5 | 既存ページへの修正 : medium 追加説明、サンプルコード追加、訳語追加 (ページ単位) |
| cpprefjp/fixl     | 10 | 既存ページへの修正 : large 仕様変更への対応 (ページ単位) |
| cpprefjp/compiler |  2 | 動作確認できたコンパイラバージョンの記載 (ページ単位) |

機能追加での機能表への列の追加は、linkではなくfixlにあたる。


### boostjp

| タグ | ポイント | 説明 |
|-----|---------|------|
| boostjp/typo     |  1 | 誤字・脱字の修正 (ページ単位 |
| boostjp/releases |  2 | Boostリリースノート1件追加 small : maintenance workなどの小さなリリースノート |
| boostjp/releasem |  5 | Boostリリースノートページを準備 |
| boostjp/releasem | 10 | Boostリリースノート 1件追加 medium : 10行以下の中程度の大きさ |
| boostjp/releasel | 20 | Boostリリースノート 1件追加 large : mediumを超える大きさ |
| boostjp/addrefs  | 10 | Boost逆引きリファレンス : small (1例追加) |
| boostjp/addrefm  | 20 | Boost逆引きリファレンス : medium (標準C++のバージョンアップ対応1例単位、Boostのバージョンアップ対応1例単位) |
| boostjp/boosts   | 5 | Boostへの貢献 small (typoの修正など) |

### ツール類

CIスクリプト、site_generator、kunaiなど。

| タグ | ポイント | 説明 |
|-----|---------|------|
| tool/fixbug     | 30 | バグ修正 |
| tool/improves   | 10 | コード改善 : small |
| tool/improvem   | 30 | コード改善 : medium |
| tool/improvem   | 50 | コード改善 : large |
| tool/updatelib  | 20 | 依存ライブラリのアップデート (直接使用のライブラリ単位) |
| tool/updatelang | 10 | 使用言語のアップデート : small (とくにコード変更なく更新できた) |
| tool/updatelang | 30 | 使用言語のアップデート : medium (多少のコード修正で更新できた) |
| tool/updatelang | 50 | 使用言語のアップデート : large (大きいまたはむずかしいコード修正をして更新できた) |
| tool/adds       | 30 | 新たな仕組みの導入 small : (C++バージョン追加、カテゴリ追加など) |
| tool/addm       | 50 | 新たな仕組みの導入 medium |
| tool/addl       | 100〜 | 新たな仕組みの導入 large : キーワード自動リンク、相対リンク対応など |

### Open Collectiveでの経費申請
1. Open Collectiveのcpprefjpページに行く
2. 画面右側の「アクション」から「経費を申請」をクリック
3. ご自身の住所・氏名などを入力
4. 支払い方法を入力
    - 通貨はUSDを選択
    - 送金先の国はJapanを選択
    - 「bank account (銀行口座)」または「PayPal」を選択
    - bank accountであれば、口座情報として銀行のSWIFT / BIC CODEおよびIBANを調べて入力する
        - Google検索で「(銀行名) BIC CODE」などで検索
        - 三菱UFC銀行なら「BOTKJPJT」
        - bank accountのIBAN (International Bank Account Number) は、支店番号 + 口座番号を連続で記載する
    - PayPalであれば、ご自身のPayPalアカウントを入力する
    - ご自身の住所を英語で入力する
    - 請求金額および請求の説明を記載して送信する
        - 説明欄にGitHubアカウントを書いてもらえると、だれの申請かがわかりやすくて助かる
5. cpprefjpから経費の承認がされれば、支払われる


### 貢献ポイントの集計ページ

- [2023年](start_editing/contribution_stats_2023.md)

