# basic_string
* string[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT,
            class traits = char_traits<charT>,
            class Allocator = allocator<charT> >
  class basic_string;

  using string    = basic_string<char>;
  using u8string = basic_string<char8_t>;    // C++20から
  using u16string = basic_string<char16_t>;  // C++11から
  using u32string = basic_string<char32_t>;  // C++11から
  using wstring   = basic_string<wchar_t>;


  namespace pmr {  // C++17から
    template <class charT, class traits = char_traits<charT>>
      using basic_string =
        std::basic_string<charT, traits, polymorphic_allocator<charT>>;

    using string    = basic_string<char>;
    using u8string  = basic_string<char8_t>; // C++20から
    using u16string = basic_string<char16_t>;
    using u32string = basic_string<char32_t>;
    using wstring   = basic_string<wchar_t>;
  }
}
```
* char_traits[link char_traits.md]
* allocator[link /reference/memory/allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`basic_string`クラスは、あらゆる文�型を使用できる文�列クラスである。  
テンプレートパラメータとして文�型を受け取るようになっており、使用を容易にするため、以下のパラメータ�定済みエイリアスが定義されている。

| エイリアス  | 説明 | 対応バージョン |
|-------------|------|----------------|
| `string`    | `char`型文�列。ASCII、UTF-8�のマルチバイト文�列や、バイト配列として使用する。 | |
| `wstring`   | `wchar_t`型文�列。`wchar_t`が16ビットの環境で、UTF-16の文�列として使用する。   | |
| `u8string` | `char8_t`型文�列。UTF-8の文�列として使用する。 | C++20 |
| `u16string` | `char16_t`型文�列。UTF-16の文�列として使用する。 | C++11 |
| `u32string` | `char32_t`型文�列。UTF-32の文�列として使用する。 | C++11 |
| `pmr::string`    | [多相ア�ケータ](/reference/memory_resource/polymorphic_allocator.md)を用いる`string` | C++17 |
| `pmr::wstring`   | [多相ア�ケータ](/reference/memory_resource/polymorphic_allocator.md)を用いる`wstring`   | C++17 |
| `pmr::u8string` | [多相ア�ケータ](/reference/memory_resource/polymorphic_allocator.md)を用いる`u8string` | C++20 |
| `pmr::u16string` | [多相ア�ケータ](/reference/memory_resource/polymorphic_allocator.md)を用いる`u16string` | C++17 |
| `pmr::u32string` | [多相ア�ケータ](/reference/memory_resource/polymorphic_allocator.md)を用いる`u32string` | C++17 |

`basic_string`文�列オブジェクトに含まれる各要素は、必ずしも1文�を表すわけではないことに注意が必要である。  
このクラスが表すのは、文�型`charT`の動的配列であり、文�の動的配列ではない。  
したがって、文�列�に以下のようなものが含まれている場合、`basic_string`クラスにおいては複数の要素と見なされる。

- マルチバイト文�（`charT`が`char`などの場合）
- サ�ゲートペア
- 結合文�列
- 異体�切り換えシーケンス (IVS)


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|------|
| [`(constructor)`](basic_string/op_constructor.md) | コンストラクタ | |
| [`(destructor)`](basic_string/op_destructor.md) | デストラクタ   | |
| [`operator=`](basic_string/op_assign.md)        | 代入演算�     | |


### イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|----------------|------|
| [`begin`](basic_string/begin.md)     | 先�の要素を指すイテレータを取得する | |
| [`end`](basic_string/end.md)         | 末尾の次を指すイテレータを取得する | |
| [`cbegin`](basic_string/cbegin.md)   | 先�の要素を指す�み取り専用イテレータを取得する | C++11 |
| [`cend`](basic_string/cend.md)       | 末尾の次を指す�み取り専用イテレータを取得する | C++11 |
| [`rbegin`](basic_string/rbegin.md)   | 末尾を指す逆イテレータを取得する | |
| [`rend`](basic_string/rend.md)       | 先�の前を指す逆イテレータを取得する | |
| [`crbegin`](basic_string/crbegin.md) | 末尾を指す�み取り専用逆イテレータを取得する | C++11 |
| [`crend`](basic_string/crend.md)     | 先�の前を指す�み取り専用逆イテレータを取得する | C++11 |


### 領域

| 名前                                               | 説明                                                 | 対応バージョン |
|----------------------------------------------------|------------------------------------------------------|----------------|
| [`size`](basic_string/size.md)                   | 文�列の長さを取得する                               |                |
| [`length`](basic_string/length.md)               | 文�列の長さを取得する                               |                |
| [`max_size`](basic_string/max_size.md)           | 格納可能な最大の文�列長を取得する                   |                |
| [`resize`](basic_string/resize.md)               | 文�列の長さを変更する                               |                |
| [`capacity`](basic_string/capacity.md)           | メモリを再確保せずに格納できる最大の要素数を取得する |                |
| [`reserve`](basic_string/reserve.md)             | `capacity`を変更する                                 |                |
| [`shrink_to_fit`](basic_string/shrink_to_fit.md) | `capacity`を`size`まで縮小する                       | C++11          |
| [`clear`](basic_string/clear.md)                 | 文�列をクリアする                                   |                |
| [`empty`](basic_string/empty.md)                 | 文�列が空かどうかを判定する                         |                |


### 要素アクセス

| 名前                                    | 説明                       | 対応バージョン |
|-----------------------------------------|----------------------------|----------------|
| [`operator[]`](basic_string/op_at.md) | 任意の位置の要素を取得する |                |
| [`at`](basic_string/at.md)            | 任意の位置の要素を取得する |                |
| [`front`](basic_string/front.md)      | 先�要素を取得する         | C++11          |
| [`back`](basic_string/back.md)        | 末尾要素を取得する         | C++11          |


### 文�列の変更

| 名前                                            | 説明                                               | 対応バージョン |
|-------------------------------------------------|----------------------------------------------------|----------------|
| [`operator+=`](basic_string/op_plus_assign.md)  | 文�／文�列を追加する                             |                |
| [`append`](basic_string/append.md)              | 文�／文�列を追加する                             |                |
| [`push_back`](basic_string/push_back.md)      | 末尾に要素を追加する                               |                |
| [`assign`](basic_string/assign.md)            | 文�列の再代入                                     |                |
| [`insert`](basic_string/insert.md)            | 文�／文�列を挿入する                             |                |
| [`erase`](basic_string/erase.md)              | 要素を削除する                                     |                |
| [`pop_back`](basic_string/pop_back.md)        | 末尾の1要素を削除する                              | C++11          |
| [`replace`](basic_string/replace.md)          | 文�列の一部を置換する                             |                |
| [`swap`](basic_string/swap.md)                | 他の`basic_string`オブジェクトとデータを入れ替える |                |


### 文�列の操作

| 名前                                                       | 説明                                           | 対応バージョン |
|------------------------------------------------------------|------------------------------------------------|----------------|
| [`c_str`](basic_string/c_str.md)                                     | C言語の文�列表現を取得する                    |                |
| [`data`](basic_string/data.md)                                       | 文�配列表現を取得する                         |                |
| [`operator basic_string_view`](basic_string/op_basic_string_view.md) | [`std::basic_string_view`](/reference/string_view/basic_string_view.md)型に変換する | C++17 |
| [`get_allocator`](basic_string/get_allocator.md)                     | ア�ケータを取得する                           |                |
| [`copy`](basic_string/copy.md)                                       | 他の文�列にコピーする                         |                |
| [`find`](basic_string/find.md)                                       | 指定文�列を検索する                           |                |
| [`rfind`](basic_string/rfind.md)                                     | 最後に現れる指定文�列を検索する               |                |
| [`find_first_of`](basic_string/find_first_of.md)                     | 最初に現れる指定文�を検索する                 |                |
| [`find_last_of`](basic_string/find_last_of.md)                       | 最後に現れる指定文�を検索する                 |                |
| [`find_first_not_of`](basic_string/find_first_not_of.md)             | 先�から、指定文�が見つからない位置を検索する |                |
| [`find_last_nof_of`](basic_string/find_last_not_of.md)               | 末尾から、指定文�が見つからない位置を検索する |                |
| [`substr`](basic_string/substr.md)                                   | 部分文�列を取得する                           |                |
| [`compare`](basic_string/compare.md)                                 | 他の文�列との比較を行う                       |                |
| [`starts_with`](basic_string/starts_with.md)                         | 指定の文�列で始まるかを判定する               | C++20          |
| [`ends_with`](basic_string/ends_with.md)                             | 指定の文�列で終わるかを判定する               | C++20          |


### メンバ定数

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `npos` | 無効な位置を表す。`find`や`substr`などで使われる。<br/>`static const size_type npos = -1;` | |


### メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `traits_type` | 文�特性型 `traits` | |
| `value_type` | 文�型 `traits::char_type` | |
| `allocator_type` | ア�ケータ型 `Allocator` | |
| `size_type` | 要素数を表す符号なし整数型。<br/> `allocator_traits<Allocator>::size_type` | |
| `difference_type` | イテレータの差を表す符号付き整数型。 `allocator_traits<Allocator>::difference_type` | |
| `reference` | 参照型 `value_type&` | |
| `const_reference` | `const`参照型 `const value&` | |
| `pointer` | ポインタ型 `allocator_traits<Allocator>::pointer` | |
| `const_pointer` | `const`ポインタ型 `allocator_traits<Allocator>::const_pointer` | |
| `iterator` | イテレータ | |
| `const_iterator` | �み取り専用イテレータ | |
| `reverse_iterator` | 逆順イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | |
| `const_reverse_iterator` | �み取り専用逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | |


## 非メンバ関数
### 文�列連結

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](basic_string/op_plus.md) | 文�列の連結 | |

### 比較演算�

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](basic_string/op_equal.md)         | �値比較                           | |
| [`operator!=`](basic_string/op_not_equal.md)     | 非�値比較                         | |
| [`operator<`](basic_string/op_less.md)           | 左辺が右辺より小さいかの判定を行う | |
| [`operator<=`](basic_string/op_less_equal.md)    | 左辺が右辺以下かの判定を行う       | |
| [`operator>`](basic_string/op_greater.md)        | 左辺が右辺より大きいかの判定を行う | |
| [`operator>=`](basic_string/op_greater_equal.md) | 左辺が右辺以上かの判定を行う       | |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](basic_string/op_ostream.md) | ストリームへの出力            | |
| [`operator>>`](basic_string/op_istream.md) | ストリームからの入力          | |
| [`getline`](basic_string/getline.md)       | 入力ストリームから1行�み込む | |


### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](basic_string/swap_free.md) | 2つの`basic_string`オブジェクトを入れ替える | |


### 要素削除

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`erase`](basic_string/erase_free.md) | 指定した値をもつ要素とその分の領域を、コンテナから削除する | C++20 |
| [`erase_if`](basic_string/erase_if_free.md) | 指定した条件に合致する要素とその分の領域を、コンテナから削除する | C++20 |


### リテラル

| 名前                          | 説明                     | 対応バージョン |
|-------------------------------|--------------------------|----------------|
| [`s`](basic_string/op_s.md) | `basic_string`のリテラル | C++14 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](basic_string/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <iostream>
#include <cstdio>
#include <string>

int main()
{
  // C文�列からstringオブジェクトを構築
  std::string s = "hello";

  // 末尾に文�列を追加
  s += " world";

  // 部分文�列を取得(始点:0、始点からの文�数:5)
  std::string hello = s.substr(0, 5);

  // ostreamへの出力
  std::cout << hello << std::endl;

  // C文�列を取得し、const char*を要求するAPIに渡す
  std::printf("%s", s.c_str());
}
```
* std::string[color ff0000]
* s.substr[link basic_string/substr.md]
* s.c_str()[link basic_string/c_str.md]

### 出力
```
hello
hello world
```

## 参照
- [N2668 Concurrency Modifications to Basic String](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2668.htm)
    - C++11で、`basic_string`の仕様が、並行実行のパフォーマンスを考慮したものに変更された経緯の提案文書
- [P0254R2 Integrating `std::string_view` and `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0254r2.pdf)
