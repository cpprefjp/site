# cpprefjp特有の拡張構文

* [mathjax enable]

Markdownだけだと表現力が足りないため、cpprefjpでは構文を拡張しています。

## コードブ�ック

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

## シンタックスハイライト

コードブ�ック開始側の \`\`\` の後ろに言語名を書くことで、その言語に対応したハイライトが行われます。

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

## exampleタグ

includeとmain関数を含む**原則すべてのC/C++言語のコードブ�ック**には`example`タグをつけてください。  
`example`タグが付いたコードブ�ックはその場で実際にコンパイル・実行することができるようになります。  
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

## プ�グラムの修飾

コードブ�ックの直後に特定の構文で記述することで、コードブ�ックの一部を修飾できます。

Markdown:

````
```cpp example
#include <iostream>

int x = 10;
int main() {
  std::cout << x << std::endl;
}
```
* <iostream>[link /reference/iostream.md]
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
* <iostream>[link /reference/iostream.md]
* std[color ff0000]

修飾の範囲は、コードブ�ックの直後から空行が続くまで、です。
空行があるとコードブ�ックに対する修飾を終わります。
構文は、`* ＜対象文�列＞[＜命令＞ ＜引数＞]` です。
現在用意されている命令は３つです。

- `link`
    - `＜対象文�列＞`にリンクを張ります。
    - `＜引数＞`にはリンク先のURLを指定します。
    - 指定可能なURLの形式は以下の3種類です。
        - 絶対リンク: `http://example.com/foo/bar` のような形式
        - サイト内絶対リンク: `/reference/iostream.md` のような形式
        - サイト内相対リンク: `../reference/vector.md` のような形式
    - サイト内へのリンクの場合、リンク先の�在チェックも行います。下記セクション参照。
- `color`
    - `＜対象文�列＞`に色を付けます。
    - `＜引数＞`には色を`RRGGBB`（16進数）の形式で指定します。
- `italic`
    - `＜対象文�列＞`をイタリック体にします。
    - `＜引数＞`はありません。

### グ�ーバル修飾

全てのコードブ�ックでは、デフォルトの修飾が実行されます。
これを **グ�ーバル修飾** と呼びます。

例えば `<vector>`, `<iostream>`, `<algorithm>`, `<iterator>`, `std::vector`, `v.begin()`, `v.end()`, `std::copy`, `std::ostream_iterator` �はグ�ーバル修飾されるため、特に修飾を書かなくてもリンクになります。

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

グ�ーバル修飾の一覧は [GLOBAL_QUALIFY_LIST.txt](https://github.com/cpprefjp/site/blob/master/GLOBAL_QUALIFY_LIST.txt) にあります。

## リンクの�在チェック

CommonMark形式のリンクや独自拡張のプ�グラムの修飾`link`などで生成されるHTMLにリンクが埋め込まれるとき、リンク先がサイト内へのリンクだった場合、リンク先の�在チェックも行います。

リンク先が�在しなかった場合、変換時に以下の様なメッセージが **標準エラーに** 出力されます。

```
Warning: [editors_doc/specialized.md] href "/reference/foobar.md (/reference/foobar.html)" not found.
```

このメッセージが出た場合、リンクが切れているため、編集して修�して下さい。

ただ「今後そのリンク先を作る予定なので、このリンクは残しておきたい」ということもあります。
そのような場合には `.nolink` が使えます。

````
```cpp
#include <iostream>
```
* <iostream>[link /reference/iostream.md.nolink]
````

このように`link`のURLの最後に `.nolink` を指定すると、リンク先が�在しなかった場合には、以下の様なメッセージが **標準出力に** 出力されます。

```
Note: You can create /reference/foobar.md for editors_doc/specialized.md.
```

このようにNoteが表示されるため、このページを作る予定があるというのを思い出させてくれます。

もし `/reference/foobar.md` を作り、`.nolink` を消し忘れていたとしても大丈夫です。
以下の様なメッセージが **標準エラーに** 出力されます。

```
Warning: [nolinked editors_doc/specialized.md] href "/reference/foobar.md.nolink (/reference/foobar.md.nolink)" found.
```

## メタ情報

ページのどこか（通常はページタイトルの下）に `* ＜メタ情報＞[meta ＜メタ情報タイプ＞]` という構文で書くことで、メタ情報を記述できます。
記述可能なメタ情報は以下の通りです。

* `[meta header]`: 所属ヘッダを表すメタ情報
    * 例: `* chrono[meta header]`
* `[meta id-type]`: �別�の種別を表すメタ情報。class, class template, function, function template, enum, variable, type-alias, macro, namespace
* `[meta namespace]`: 所属する名前空間を表すメタ情報。マク�を考慮して省略可。名前空間の区切りは`::`
    * 例: `* std[meta namespace]`
    * 例: `* std::chrono[meta namespace]`
* `[meta class]`: 所属するクラスを表すメタ情報。クラスページでは省略する。structとは書けない
* `[meta cpp]`: 機能が追加・非推奨・削除されたバージョンを表すメタ情報。改行して複数指定ができる。
    * `* cpp11[meta cpp]` : C++11で追加された機能
    * `* cpp14[meta cpp]` : C++14で追加された機能
    * `* cpp17[meta cpp]` : C++17で追加された機能
    * `* cpp20[meta cpp]` : C++20で追加された機能
    * `* cpp11deprecated[meta cpp]` : C++11で非推奨になった機能
    * `* cpp14deprecated[meta cpp]` : C++14で非推奨になった機能
    * `* cpp14removed[meta cpp]` : C++14で削除された機能
    * `* cpp17deprecated[meta cpp]` : C++17で非推奨になった機能
    * `* cpp17removed[meta cpp]` : C++17で削除された機能
    * `* cpp20deprecated[meta cpp]` : C++20で非推奨になった機能
    * `* cpp20removed[meta cpp]` : C++20で削除された機能

## 数式

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

ブ�ック用は以下のように書きます。

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

