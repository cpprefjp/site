# cpprefjpでのMarkdown記法の制限と拡張

* [mathjax enable]


## 概要
cpprefjpでは、ドキュメントの記述にMarkdown記法を採用していますが、いくつかの制限があり、表現力が足りない部分は拡張記法を用意しています。


## Markdown記法の制限
### HTMLタグの制限
cpprefjpでは、許可されたHTMLタグしか使用できません。

- アンカーを貼るために、`<a id="アンカー名">対象文字列</a>`のようなHTML5に基づく記法を許可
- 表内での改行のために、`<br/>`タグを許可
- 値の大きさを表現するために、上付き文字を表す`<sup>`タグを許可
- 添字を表現するために、下付き文字を表す`<sub>`タグを許可

### ブロックコメントの制限

実装に使用しているMarkdownパーサーによる制限で、以下のようなブロックコメントは使用できません。

```
<!--

comment out text...

-->
```


### 表内での縦線の制限

表内で `|` (縦線、vertical line) を使用するために、文字参照 `&#x7C;` を使用しています。


### 箇条書きのインデントとして4スペースのみを許可する制限

実装に使用しているMarkdownパーサーによる制限で、箇条書きのインデントとして4スペースのみを許可しています (2スペースでは正しくインデントされません)。

```
* てすと
  * てすと2
```

これはcpprefjpではフラットなリストだと解釈されます。

```
* てすと
    * てすと2
```

これなら正しく表示されます。


### HTMLエンティティを使用できない制限
```
&reg;
```

上記のような書き方をすると、cpprefjpではエラーになります。HTML エンティティを使わず、以下のように書いてください。

```
®
```


## Markdown記法の拡張

Markdownだけだと表現力が足りないため、cpprefjpでは構文を拡張しています。

### 文章中のコードに関する拡張

バッククォートによる文章中のコード指定では、バッククォート内の両端にスペースは使用できません。以下のようにスペースはバッククォートの外で使用すれば、コードとして連結されます。

```markdown
式`f(a,` [`std::make_shared`](/reference/memory/make_shared.md)`<X>(x));`が有効である場合、それを呼び出す。
```

結果：

式`f(a,` [`std::make_shared`](/reference/memory/make_shared.md)`<X>(x));`が有効である場合、それを呼び出す。


### コードブロックに関する拡張

\`\`\` と \`\`\` で挟むことで、複数行に渡るコードを書けます。

Markdown:

````
```
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```
````

結果:

```
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```

### シンタックスハイライトの拡張

コードブロック開始側の \`\`\` の後ろに言語名を書くことで、その言語に対応したハイライトが行われます。

Markdown:

````
```cpp example
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```
````

結果:

```cpp example
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```

### exampleタグの拡張

includeとmain関数を含む**原則すべてのC/C++言語のコードブロック**には`example`タグをつけてください。  
`example`タグが付いたコードブロックはその場で実際にコンパイル・実行することができるようになります。  
たとえコンパイルエラーになる場合でも、利用者がその場でコードを書き換えて試行することを容易にするために原則つけてください。

````
```cpp example
#include <iostream>

int main()
{
  std::cout << "arikitari_na_world" << std::endl;
}
```
````

つけない例としては次のような宣言が書いてあるのみのものが挙げられます。

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class vector;
}
```

### プログラムの修飾に関する拡張

コードブロックの直後に特定の構文で記述することで、コードブロックの一部を修飾できます。

Markdown:

````
```cpp example
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```
* std[color ff0000]
````

結果:

```cpp example
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```
* std[color ff0000]

修飾の範囲は、コードブロックの直後から空行が続くまで、です。
空行があるとコードブロックに対する修飾を終わります。
構文は、`* ＜対象文字列＞[＜命令＞ ＜引数＞]` です。
現在用意されている命令は３つです。

- `link`
    - `＜対象文字列＞`にリンクを張ります。
    - `＜引数＞`にはリンク先のURLを指定します。
    - 指定可能なURLの形式は以下の3種類です。
        - 絶対リンク: `http://example.com/foo/bar` のような形式
        - サイト内絶対リンク: `/reference/iostream.md` のような形式
        - サイト内相対リンク: `../reference/vector.md` のような形式
    - サイト内へのリンクの場合、リンク先の存在チェックも行います。下記セクション参照。
- `color`
    - `＜対象文字列＞`に色を付けます。
    - `＜引数＞`には色を`RRGGBB`（16進数）の形式で指定します。
- `italic`
    - `＜対象文字列＞`をイタリック体にします。
    - `＜引数＞`はありません。

#### グローバル修飾

全てのコードブロックでは、デフォルトの修飾が実行されます。
これを **グローバル修飾** と呼びます。

例えば `<vector>`, `<iostream>`, `<algorithm>`, `<iterator>`, `std::vector`, `v.begin()`, `v.end()`, `std::copy`, `std::ostream_iterator` 等はグローバル修飾されるため、特に修飾を書かなくてもリンクになります。

```cpp example
#include <vector>
#include <iostream>
#include <algorithm>
#include <iterator>

int main() {
  std::vector<int> v = { 1, 2, 3 };
  std::copy(v.begin(), v.end(), std::ostream_iterator<int>(std::cout, ", "));
}
```

グローバル修飾の一覧は [GLOBAL_QUALIFY_LIST.txt](https://github.com/cpprefjp/site/blob/master/GLOBAL_QUALIFY_LIST.txt) にあります。

### 定義語に関する拡張

`GLOBAL_DEFINED_WORDS.json` に定義語を登録することができます。形式は `GLOBAL_DEFINED_WORDS.json` を参照して下さい。

`link` にはその定義語の解説ページへのURLを指定します。`link` が指定されている場合、任意の記事中の (コード、リンク、見出しなどを除く) 地の文にその定義語が現れた時に、自動的に `link` へのハイパーリンクが貼られます。

特に解説ページの定義箇所で `<dfn id="識別子">定義語</dfn>` として `id` 属性を設定して、その箇所への直接リンクすることもできます。

`desc` に簡単な説明が指定されている場合、地の文にあるその定義語にマウスカーソルを合わせると説明がツールチップとして表示されます。

`yomi` には平仮名およびアルファベットでその定義語の読みを指定します。現在は使用されていませんが将来的に定義語が増えてきた時に、用語集または索引ページを自動生成する時の並び替えに使われる予定です。

### リンクの存在チェックに関する拡張

CommonMark形式のリンクや独自拡張のプログラムの修飾`link`などで生成されるHTMLにリンクが埋め込まれるとき、リンク先がサイト内へのリンクだった場合、リンク先の存在チェックも行います。

リンク先が存在しなかった場合、変換時に以下の様なメッセージが **標準エラーに** 出力されます。

```
Warning: [editors_doc/specialized.md] href "/reference/foobar.md (/reference/foobar.html)" not found.
```

このメッセージが出た場合、リンクが切れているため、編集して修正して下さい。

ただ「今後そのリンク先を作る予定なので、このリンクは残しておきたい」ということもあります。
そのような場合には `.nolink` が使えます。

````
```cpp
#include <std_header>
```
* <std_header>[link /reference/std_header.md.nolink]
````

このように`link`のURLの最後に `.nolink` を指定すると、リンク先が存在しなかった場合には、以下の様なメッセージが **標準出力に** 出力されます。

```
Note: You can create /reference/foobar.md for editors_doc/specialized.md.
```

このようにNoteが表示されるため、このページを作る予定があるというのを思い出させてくれます。

もし `/reference/foobar.md` を作り、`.nolink` を消し忘れていたとしても大丈夫です。
以下の様なメッセージが **標準エラーに** 出力されます。

```
Warning: [nolinked editors_doc/specialized.md] href "/reference/foobar.md.nolink (/reference/foobar.md.nolink)" found.
```

### メタ情報を付加する拡張

ページのどこか（通常はページタイトルの下）に `* ＜メタ情報＞[meta ＜メタ情報タイプ＞]` という構文で書くことで、メタ情報を記述できます。
記述可能なメタ情報は以下の通りです。

* `[meta header]`: 所属ヘッダを表すメタ情報
    * 例: `* chrono[meta header]`
* `[meta category]`: 説明用の機能群を表すメタ情報
* `[meta id-type]`: 識別子の種別を表すメタ情報。class, class template, function, function template, enum, variable, type-alias, macro, namespace, concept, named requirement
* `[meta namespace]`: 所属する名前空間を表すメタ情報。マクロを考慮して省略可。名前空間の区切りは`::`
    * 例: `* std[meta namespace]`
    * 例: `* std::chrono[meta namespace]`
* `[meta class]`: 所属するクラスを表すメタ情報。クラスページでは省略する。structとは書けない
* `[meta cpp]`: 機能が追加・非推奨・削除されたバージョンを表すメタ情報。改行して複数指定ができる。
    * `* cpp11[meta cpp]` : C++11で追加された機能
    * `* cpp14[meta cpp]` : C++14で追加された機能
    * `* cpp17[meta cpp]` : C++17で追加された機能
    * `* cpp20[meta cpp]` : C++20で追加された機能
    * `* cpp23[meta cpp]` : C++23で追加された機能
    * `* cpp11deprecated[meta cpp]` : C++11で非推奨になった機能
    * `* cpp14deprecated[meta cpp]` : C++14で非推奨になった機能
    * `* cpp14removed[meta cpp]` : C++14で削除された機能
    * `* cpp17deprecated[meta cpp]` : C++17で非推奨になった機能
    * `* cpp17removed[meta cpp]` : C++17で削除された機能
    * `* cpp20deprecated[meta cpp]` : C++20で非推奨になった機能
    * `* cpp20removed[meta cpp]` : C++20で削除された機能
    * `* cpp23deprecated[meta cpp]` : C++23で非推奨になった機能
    * `* cpp23removed[meta cpp]` : C++23で削除された機能

### 数式を記述する拡張

cpprefjpでは、数式をLaTeX形式で記述できます。
内部的には[MathJax](https://www.mathjax.org/)を利用しています。

MathJaxを使うためにはまず、ページのどこか（通常はページタイトルの下）に、以下のように記述してMathJaxを有効にする必要があります。

* `* [mathjax enable]`

こうすることで、LaTeX形式で数式を記述できるようになります。

インライン用は以下のように書きます。

Markdown:

```
$x = \frac{ -b \pm \sqrt{ b^{2} - 4 a c } }{2 a}$
```

結果:

$x = \frac{ -b \pm \sqrt{ b^{2} - 4 a c } }{2 a}$

ブロック用は以下のように書きます。

Markdown:

```
$$
\left\{
\begin{array}{ll}
p \log_{10}b&\text{もし $b$ が $10$ の累乗の場合}\\
\lfloor (p - 1) \log_{10} b\rfloor&\text{上記以外の場合}\\
\end{array}
\right.
$$
```

結果:
$$
\left\{
\begin{array}{ll}
p \log_{10}b&\text{もし $b$ が $10$ の累乗の場合}\\
\lfloor (p - 1) \log_{10} b\rfloor&\text{上記以外の場合}\\
\end{array}
\right.
$$

