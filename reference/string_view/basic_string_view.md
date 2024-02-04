# basic_string_view
* string_view[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits = char_traits<CharT>>
  class basic_string_view;

  using string_view = basic_string_view<char>;
  using u8string_view = basic_string_view<char8_t>; // C++20から
  using u16string_view = basic_string_view<char16_t>;
  using u32string_view = basic_string_view<char32_t>;
  using wstring_view = basic_string_view<wchar_t>;
}
```
* char_traits[link /reference/string/char_traits.md]

## 概要
`std::basic_string_view`は、文字列の所有権を保持せず、文字列のコピーを持つのではなく参照をして、参照先の文字列を加工して扱うクラスである。

文字配列型である文字列リテラルに対して、[`std::basic_string`](/reference/string/basic_string.md)クラスが持つような便利なメンバ関数群を使用できる。文字列リテラルは静的記憶域に保存されるため、文字列リテラルをこのクラスのオブジェクトに参照させて、そのオブジェクトを持ち回ったとしても参照先の文字列リテラルの寿命が尽きるような問題は発生しない。

```cpp
string_view sv = "Hello World"; // この式の評価がおわったあとも、文字列リテラル "Hello World" の寿命は尽きない
string_view hello = sv.substr(0, 5); // 先頭5文字を抽出する
```
* sv.substr[link basic_string_view/substr.md]

このクラスの実装としては、文字配列の参照する先頭文字へのポインタと、文字数の2つをメンバ変数として持つ。これらの変数を変動させることによって、部分文字列の抽出や、限定された範囲内での検索といったことを実現する。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)である（C++23）


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|------|
| [`(constructor)`](basic_string_view/op_constructor.md) | コンストラクタ | C++17 |
| `~basic_string_view() = default;` | デストラクタ | C++17 |
| `basic_string_view& operator=(const basic_string_view&) = default;`<br/> `basic_string_view& operator=(basic_string_view&&) = default;` | 代入演算子 | C++17 |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|----------------|------|
| [`begin`](basic_string_view/begin.md)     | 先頭の要素を指すイテレータを取得する | C++17 |
| [`end`](basic_string_view/end.md)         | 末尾の次を指すイテレータを取得する | C++17 |
| [`cbegin`](basic_string_view/cbegin.md)   | 先頭の要素を指す読み取り専用イテレータを取得する | C++17 |
| [`cend`](basic_string_view/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する | C++17 |
| [`rbegin`](basic_string_view/rbegin.md)   | 末尾を指す逆イテレータを取得する | C++17 |
| [`rend`](basic_string_view/rend.md)       | 先頭の前を指す逆イテレータを取得する | C++17 |
| [`crbegin`](basic_string_view/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++17 |
| [`crend`](basic_string_view/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++17 |


### 領域

| 名前                                        | 説明                               | 対応バージョン |
|---------------------------------------------|------------------------------------|----------------|
| [`size`](basic_string_view/size.md)         | 文字列の長さを取得する             | C++17          |
| [`length`](basic_string_view/length.md)     | 文字列の長さを取得する             | C++17          |
| [`max_size`](basic_string_view/max_size.md) | 参照可能な最大の文字列長を取得する | C++17          |
| [`empty`](basic_string_view/empty.md)       | 文字列が空かどうかを判定する       | C++17          |


### 要素アクセス

| 名前                                       | 説明                       | 対応バージョン |
|--------------------------------------------|----------------------------|----------------|
| [`operator[]`](basic_string_view/op_at.md) | 任意の位置の文字を取得する | C++17          |
| [`at`](basic_string_view/at.md)            | 任意の位置の文字を取得する | C++17          |
| [`front`](basic_string_view/front.md)      | 先頭文字を取得する         | C++17          |
| [`back`](basic_string_view/back.md)        | 末尾文字を取得する         | C++17          |
| [`data`](basic_string_view/data.md)        | 文字配列表現を取得する     | C++17          |


### 文字列の変更

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`remove_prefix`](basic_string_view/remove_prefix.md) | 先頭のN文字を削除する | C++17 |
| [`remove_suffix`](basic_string_view/remove_suffix.md) | 末尾のN文字を削除する | C++17 |
| [`swap`](basic_string_view/swap.md)                   | 他の`basic_string_view`オブジェクトとデータを入れ替える | C++17 |


### 文字列の操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`copy`](basic_string_view/copy.md)               | 他の文字列に、自身の文字列をコピーする         | C++17 |
| [`substr`](basic_string_view/substr.md)           | 部分文字列を取得する                           | C++17 |
| [`compare`](basic_string_view/compare.md)         | 他の文字列との比較を行う                       | C++17 |
| [`starts_with`](basic_string_view/starts_with.md) | 指定の文字列で始まるかを判定する               | C++20 |
| [`ends_with`](basic_string_view/ends_with.md)     | 指定の文字列で終わるかを判定する               | C++20 |
| [`contains`](basic_string_view/contains.md)       | 指定の文字・文字列が含まれているかを判定する   | C++23 |


### 検索

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`find`](basic_string_view/find.md)                           | 指定文字列を検索する                           | C++17 |
| [`rfind`](basic_string_view/rfind.md)                         | 最後に現れる指定文字列を検索する               | C++17 |
| [`find_first_of`](basic_string_view/find_first_of.md)         | 最初に現れる指定文字を検索する                 | C++17 |
| [`find_last_of`](basic_string_view/find_last_of.md)           | 最後に現れる指定文字を検索する                 | C++17 |
| [`find_first_not_of`](basic_string_view/find_first_not_of.md) | 先頭から、指定文字が見つからない位置を検索する | C++17 |
| [`find_last_not_of`](basic_string_view/find_last_not_of.md)   | 末尾から、指定文字が見つからない位置を検索する | C++17 |


### メンバ定数

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `npos` | 無効な位置を表す。`find`や`substr`などで使われる。<br/>`static constexpr size_type npos = -1;` | C++17 |


### メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `traits_type` | 文字特性型 `Traits` | C++17 |
| `value_type` | 文字型 `CharT` | C++17 |
| `pointer` | ポインタ型 `value_type*` | C++17 |
| `const_pointer` | `const`ポインタ型 `const value_type*` | C++17 |
| `reference` | 参照型 `value_type&` | C++17 |
| `const_reference` | `const`参照型 `const value_type&` | C++17 |
| `const_iterator` | 読み取り専用イテレータ。実装定義。<br/> 要素の型は`value_type`。<br/> ランダムアクセスイテレータと連続イテレータの要件を満たす | C++17 |
| `iterator` | イテレータ `const_iterator` | C++17 |
| `const_reverse_iterator` | 読み取り専用逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | C++17 |
| `reverse_iterator` | 逆順イテレータ `const_reverse_iterator` | C++17 |
| `size_type` | 要素数を表す符号なし整数型 [`size_t`](/reference/cstddef/size_t.md) | C++17 |
| `difference_type` | イテレータの差を表す符号付き整数型 [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++17 |


## 非メンバ関数
### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](basic_string_view/op_equal.md)         | 等値比較                           | C++17 |
| [`operator!=`](basic_string_view/op_not_equal.md)     | 非等値比較                         | C++17 |
| [`operator<=>`](basic_string_view/op_compare_3way.md) | 三方比較                           | C++20 |
| [`operator<`](basic_string_view/op_less.md)           | 左辺が右辺より小さいかの判定を行う | C++17 |
| [`operator<=`](basic_string_view/op_less_equal.md)    | 左辺が右辺以下かの判定を行う       | C++17 |
| [`operator>`](basic_string_view/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | C++17 |
| [`operator>=`](basic_string_view/op_greater_equal.md) | 左辺が右辺以上かの判定を行う       | C++17 |

### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](basic_string_view/op_ostream.md) | ストリームへの出力 | C++17 |


### 推論ガイド

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(op_deduction_guide)`](basic_string_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20 |


### リテラル

| 名前                          | 説明                     | 対応バージョン |
|-------------------------------|--------------------------|----------------|
| [`sv`](basic_string_view/op_sv.md) | `basic_string_view`のリテラル | C++17 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|------------------------------------------|-------|
| `template <class T> struct hash;`          | `hash`クラスの先行宣言                       | C++17 |
| `template <> struct hash<string_view>;`    | `hash`クラスの`string_view`に対する特殊化    | C++17 |
| `template <> struct hash<wstring_view>;`   | `hash`クラスの`wstring_view`に対する特殊化   | C++17 |
| `template <> struct hash<u8string_view>;`  | `hash`クラスの`u8string_view`に対する特殊化  | C++20 |
| `template <> struct hash<u16string_view>;` | `hash`クラスの`u16string_view`に対する特殊化 | C++17 |
| `template <> struct hash<u32string_view>;` | `hash`クラスの`u32string_view`に対する特殊化 | C++17 |

上記の各`*string_view`に対する`hash`クラスの特殊化は、それぞれ対応する[`*string`型に対する特殊化](/reference/string.md)と同じハッシュ値を算出する。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  // 文字列リテラルから部分文字列を取得する。
  // その際、メモリアロケートは発生しない
  std::cout << std::string_view("Hello World").substr(0, 5) << std::endl;

  // 文字列リテラル内から特定の文字列を検索する。
  // この例でも、メモリアロケートや文字列オブジェクトのコピーなどは発生しない
  std::string_view sv = "Hello World";
  std::size_t pos = sv.find("rl");
  if (pos != std::string_view::npos) {
    std::cout << "found" << std::endl;
  }
}
```
* std::string_view[color ff0000]
* substr[link basic_string_view/substr.md]
* sv.find[link basic_string_view/find.md]

#### 出力
```
Hello
found
```


### stringとconst char*の共通インタフェースとして使用する
```cpp example
#include <iostream>
#include <string>
#include <string_view>

// string, const char*、string_viewのどれでも受け取れる関数
void f(std::string_view sv)
{
  std::cout << sv.substr(0, 4) << std::endl;
}

int main()
{
  // 文字列リテラル (char配列) を渡す
  f("Hello");

  // const char*を渡す
  const char* chars = "Hello";
  f(chars);

  // 左辺値のstringを渡す
  std::string s = "Hello";
  f(s);

  // stringの一時オブジェクトを渡す
  // 関数f()内ではこの一時オブジェクトが生存しているので、
  // string_view参照しても問題ない
  f(std::string("Hello"));
}
```
* std::string_view[color ff0000]
* substr[link basic_string_view/substr.md]

#### 出力
```
Hell
Hell
Hell
Hell
```

### 文字列リテラルを範囲として使用する場合にヌル文字が含まれないようにする
```cpp example
#include <iostream>
#include <string_view>

int main()
{
  // 文字列リテラルを範囲として使用すると、ヌル文字が要素に含まれる
  std::cout << '[' << std::endl;
  for (char c : "ABC") {
    std::cout << c << std::endl;
  }
  std::cout << ']' << std::endl;

  // string_viewを使用すると、ヌル文字が要素に含まれない
  std::cout << '[' << std::endl;
  for (char c : std::string_view{"ABC"}) {
    std::cout << c << std::endl;
  }
  std::cout << ']' << std::endl;
}
```
* std::string_view[color ff0000]

#### 出力
```
[
A
B
C

]
[
A
B
C
]
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0
- [GCC](/implementation.md#gcc): 7.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3334 Proposing `array_ref<T>` and `string_ref`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3334.html)
- [N3442 `string_ref`: a non-owning reference to a string](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3442.html)
- [N3512 `string_ref`: a non-owning reference to a string, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3512.html)
- [N3609 `string_view`: a non-owning reference to a string, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3609.html)
- [N3685 `string_view`: a non-owning reference to a string, revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3685.html)
- [N3762 `string_view`: a non-owning reference to a string, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3762.html)
- [N3849 `string_view`: a non-owning reference to a string, revision 6](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3849.html)
- [N3921 `string_view`: a non-owning reference to a string, revision 7](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3921.html)
- [P0220R0 Adopt Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r0.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0254R0 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r0.pdf)
- [P0254R1 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r1.pdf)
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
- [P0403R0 Literal suffixes for `basic_string_view`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0403r0.html)
- [LWG 2791 - `string_view` objects and strings should yield the same hash values](https://cplusplus.github.io/LWG/issue2791)
- [String literals make bad ranges - Andrzej's C++ blog](https://akrzemi1.wordpress.com/2019/09/25/string-literals-make-bad-ranges/)
- [Require `span` & `basic_string_view` to be Trivially Copyable](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2251r1.pdf)
    - C++23から、トリビアルコピー可能が保証される。
