#basic_string
```cpp
namespace std {
  template <class charT,
            class traits = char_traits<charT>,
            class Allocator = allocator<charT> >
  class basic_string;

  typedef basic_string<char>     string;
  typedef basic_string<char16_t> u16string;  // C++11から
  typedef basic_string<char32_t> u32string;  // C++11から
  typedef basic_string<wchar_t>  wstring;
}
```
* char_traits[link ./char_traits.md]
* allocator[link /reference/memory/allocator.md]

##概要
`basic_string`クラスは、あらゆる文字型を使用できる文字列クラスである。  
テンプレートパラメータとして文字型を受け取るようになっており、使用を容易にするため、以下のパラメータ設定済みエイリアスが定義されている。

| エイリアス  | 説明 | 対応バージョン |
|-------------|------|----------------|
| `string`    | `char`型文字列。ASCII、UTF-8等のマルチバイト文字列や、バイト配列として使用する。 | |
| `wstring`   | `wchar_t`型文字列。`wchar_t`が16ビットの環境で、UTF-16の文字列として使用する。   | |
| `u16string` | `char16_t`型文字列。UTF-16の文字列として使用する。 | C++11 |
| `u32string` | `char32_t`型文字列。UTF-32の文字列として使用する。 | C++11 |

`basic_string`文字列オブジェクトに含まれる各要素は、必ずしも1文字を表すわけではないことに注意が必要である。  
このクラスが表すのは、文字型`charT`の動的配列であり、文字の動的配列ではない。
したがって、文字列中に以下のようなものが含まれている場合、`basic_string`クラスにおいては複数の要素と見なされる。
- マルチバイト文字（`charT`が`char`などの場合）
- サロゲートペア
- 結合文字列
- 異体字切り換えシーケンス (IVS)


##メンバ関数
###構築・破棄

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------|----------------|------|
| [(constructor)](./basic_string//op_constructor.md) | コンストラクタ | |
| [(destructor)](./basic_string//op_destructor.md) | デストラクタ   | |
| [`operator=`](./basic_string/op_assign.md)        | 代入演算子     | |


###イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|----------------|------|
| [`begin`](./basic_string/begin.md)     | 先頭の要素を指すイテレータを取得する | |
| [`end`](./basic_string/end.md)         | 末尾の次を指すイテレータを取得する | |
| [`cbegin`](./basic_string/cbegin.md)   | 先頭の要素を指す読み取り専用イテレータを取得する | C++11 |
| [`cend`](./basic_string/cend.md)       | 末尾の次を指す読み取り専用イテレータを取得する | C++11 |
| [`rbegin`](./basic_string/rbegin.md)   | 末尾を指す逆イテレータを取得する | |
| [`rend`](./basic_string/rend.md)       | 先頭の前を指す逆イテレータを取得する | |
| [`crbegin`](./basic_string/crbegin.md) | 末尾を指す読み取り専用逆イテレータを取得する | C++11 |
| [`crend`](./basic_string/crend.md)     | 先頭の前を指す読み取り専用逆イテレータを取得する | C++11 |


###領域

| 名前                                               | 説明                                                 | 対応バージョン |
|----------------------------------------------------|------------------------------------------------------|----------------|
| [`size`](./basic_string/size.md)                   | 文字列の長さを取得する                               |                |
| [`length`](./basic_string/length.md)               | 文字列の長さを取得する                               |                |
| [`max_size`](./basic_string/max_size.md)           | 格納可能な最大の文字列長を取得する                   |                |
| [`resize`](./basic_string/resize.md)               | 文字列の長さを変更する                               |                |
| [`capacity`](./basic_string/capacity.md)           | メモリを再確保せずに格納できる最大の要素数を取得する |                |
| [`reserve`](./basic_string/reserve.md)             | `capacity`を変更する                                 |                |
| [`shrink_to_fit`](./basic_string/shrink_to_fit.md) | `capacity`を`size`まで縮小する                       | C++11          |
| [`clear`](./basic_string/clear.md)                 | 文字列をクリアする                                   |                |
| [`empty`](./basic_string/empty.md)                 | 文字列が空かどうかを判定する                         |                |


###要素アクセス

| 名前                                    | 説明                       | 対応バージョン |
|-----------------------------------------|----------------------------|----------------|
| [`operator[]`](./basic_string/op_at.md) | 任意の位置の要素を取得する |                |
| [`at`](./basic_string/at.md)            | 任意の位置の要素を取得する |                |
| [`front`](./basic_string/front.md)      | 先頭要素を取得する         | C++11          |
| [`back`](./basic_string/back.md)        | 末尾要素を取得する         | C++11          |


###文字列の変更

| 名前                                            | 説明                                               | 対応バージョン |
|-------------------------------------------------|----------------------------------------------------|----------------|
| [`operator+=`](basic_string/op_plus_assign.md)  | 文字／文字列を追加する                             |                |
| [`append`](basic_string/append.md)              | 文字／文字列を追加する                             |                |
| [`push_back`](./basic_string/push_back.md)      | 末尾に要素を追加する                               |                |
| [`assign`](./basic_string/assign.md)            | 文字列の再代入                                     |                |
| [`insert`](./basic_string/insert.md)            | 文字／文字列を挿入する                             |                |
| [`erase`](./basic_string/erase.md)              | 要素を削除する                                     |                |
| [`pop_back`](./basic_string/pop_back.md)        | 末尾の1要素を削除する                              | C++11          |
| [`replace`](./basic_string/replace.md)          | 文字列の一部を置換する                             |                |
| [`swap`](./basic_string/swap.md)                | 他の`basic_string`オブジェクトとデータを入れ替える |                |


###文字列の操作

| 名前                                                       | 説明                                           | 対応バージョン |
|------------------------------------------------------------|------------------------------------------------|----------------|
| [`c_str`](./basic_string/c_str.md)                         | C言語の文字列表現を取得する                    |                |
| [`data`](./basic_string/data.md)                           | 文字配列表現を取得する                         |                |
| [`get_allocator`](./basic_string/get_allocator.md)         | アロケータを取得する                           |                |
| [`copy`](./basic_string/copy.md)                           | 他の文字列にコピーする                         |                |
| [`find`](./basic_string/find.md)                           | 指定文字列を検索する                           |                |
| [`rfind`](./basic_string/rfind.md)                         | 最後に現れる指定文字列を検索する               |                |
| [`find_first_of`](./basic_string/find_first_of.md)         | 最初に現れる指定文字を検索する                 |                |
| [`find_last_of`](./basic_string/find_last_of.md)           | 最後に現れる指定文字を検索する                 |                |
| [`find_first_not_of`](./basic_string/find_first_not_of.md) | 先頭から、指定文字が見つからない位置を検索する |                |
| [`find_last_nof_of`](./basic_string/find_last_not_of.md)   | 末尾から、指定文字が見つからない位置を検索する |                |
| [`substr`](./basic_string/substr.md)                       | 部分文字列を取得する                           |                |
| [`compare`](./basic_string/compare.md)                     | 他の文字列との比較を行う                       |                |


###メンバ定数

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `npos` | 無効な位置を表す。`find`や`substr`などで使われる。<br/>`static const size_type npos = -1;` | |


###メンバ型

| 名前 | 説明 | 対応バージョン |
|---------------------|----------------|------|
| `traits_type` | 文字特性型 `traits` | |
| `value_type` | 文字型 `traits::char_type` | |
| `allocator_type` | アロケータ型 `Allocator` | |
| `size_type` | 要素数を表す符号なし整数型。<br/> `allocator_traits<Allocator>::size_type` | |
| `difference_type` | イテレータの差を表す符号付き整数型。 `allocator_traits<Allocator>::difference_type` | |
| `reference` | 参照型 `value_type&` | |
| `const_reference` | `const`参照型 `const value&` | |
| `pointer` | ポインタ型 `allocator_traits<Allocator>::pointer` | |
| `const_pointer` | `const`ポインタ型 `allocator_traits<Allocator>::const_pointer` | |
| `iterator` | イテレータ | |
| `const_iterator` | 読み取り専用イテレータ | |
| `reverse_iterator` | 逆順イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<iterator>` | |
| `const_reverse_iterator` | 読み取り専用逆イテレータ [`reverse_iterator`](/reference/iterator/reverse_iterator.md)`<const_iterator>` | |


##非メンバ関数

| 名前                                             | 説明                                        | 対応バージョン |
|--------------------------------------------------|---------------------------------------------|----------------|
| [`operator+`](basic_string/op_plus.md)           | 文字列の連結                                |                |
| [`operator==`](basic_string/op_equal.md)         | 等値比較                                    |                |
| [`operator!=`](basic_string/op_not_equal.md)     | 非等値比較                                  |                |
| [`operator<`](basic_string/op_less.md)           | 左辺が右辺より小さいかの判定を行う          |                |
| [`operator<=`](basic_string/op_less_equal.md)    | 左辺が右辺以下かの判定を行う                |                |
| [`operator>`](basic_string/op_greater.md)        | 左辺が右辺より大きいかの判定を行う          |                |
| [`operator>=`](basic_string/op_greater_equal.md) | 左辺が右辺以上かの判定を行う                |                |
| [`operator<<`](basic_string/op_ostream.md)       | ストリームへの出力                          |                |
| [`operator>>`](basic_string/op_istream.md)       | ストリームからの入力                        |                |
| [`swap`](./basic_string/swap_free.md)            | 2つの`basic_string`オブジェクトを入れ替える |                |
| [`getline`](./basic_string/getline.md)           | 入力ストリームから1行読み込む               |                |


##例
```cpp
#include <iostream>
#include <cstdio>
#include <string>

int main()
{
  // C文字列からstringオブジェクトを構築
  std::string s = "hello";

  // 末尾に文字列を追加
  s += " world";

  // 部分文字列を取得(始点:0、始点からの文字数:5)
  std::string hello = s.substr(0, 5);

  // ostreamへの出力
  std::cout << hello << std::endl;

  // C文字列を取得し、const char*を要求するAPIに渡す
  std::printf("%s", s.c_str());
}
```

###出力
```
hello
hello world
```

###参照

