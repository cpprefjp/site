# char_traits
* string[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class charT> struct char_traits;

  template<> struct char_traits<char>;
  template<> struct char_traits<char8_t>;  // C++20から
  template<> struct char_traits<char16_t>; // C++11から
  template<> struct char_traits<char32_t>; // C++11から
  template<> struct char_traits<wchar_t>;
}
```

## 概要
`char_traits`は、[`basic_string`](basic_string.md)文�列クラスのおける、各要素の特性を使用するためのクラスである。  
このクラスと同じインタフェースのクラスを用意して[`basic_string`](basic_string.md)クラスのテンプレート引数として指定することにより、ユーザー独自の処理に切り替えることが可能である。たとえば、大文�・小文�を区別しない比較のためのカスタマイズに利用できる。

テンプレートパラメータは以下を意味する：

- `charT` : `basic_string`クラスが扱う文�型


## 静的メンバ関数

| 名前           | 説明 | 対応バージョン |
|----------------|---------------------------------------------------|-----|
| [`assign`](char_traits/assign.md)             | 代入 | |
| [`eq`](char_traits/eq.md)                     | �値比較 | |
| [`lt`](char_traits/lt.md)                     | 小なり比較 | |
| [`compare`](char_traits/compare.md)           | 比較 | |
| [`length`](char_traits/length.md)             | 文�列長を取得する | |
| [`find`](char_traits/find.md)                 | 文�列�から特定の値を検索する | |
| [`move`](char_traits/move.md)                 | 文�列を他のシーケンスにコピーする | |
| [`copy`](char_traits/copy.md)                 | 文�列を他のシーケンスにコピーする | |
| [`not_eof`](char_traits/not_eof.md)           | 文�がファイル終端文�(EOF)じゃないかを判定する | |
| [`to_char_type`](char_traits/to_char_type.md) | 数値を文�に変換する | |
| [`to_int_type`](char_traits/to_int_type.md)   | 文�を数値に変換する | |
| [`eq_int_type`](char_traits/eq_int_type.md)   | 数値の�値比較 | |
| [`eof`](char_traits/eof.md)                   | ファイル終端文�(EOF)を表す数値を取得する | |

## メンバ型

| 名前         | 説明                                 | 対応バージョン |
|--------------|--------------------------------------|----------------|
| `char_type`  | 文�コンテナの実装で使用される文�型 | |
| `int_type`   | 文�に対応する値を表す数値型 | |
| `off_type`   | 文�の差を表す型 | |
| `pos_type`   | 位置を表す型 | |
| `state_type` | ストリームのマルチバイト文�の変換の状態を表す型 | |


### charによる特殊化のメンバ型定義

| 名前         | 説明        | 対応バージョン |
|--------------|-------------|----------------|
| `char_type`  | `char`      | |
| `int_type`   | `int`       | |
| `off_type`   | `streamoff` | |
| `pos_type`   | `streampos` | |
| `state_type` | `mbstate_t` | |

### char8_tによる特殊化のメンバ型定義 (C++20)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char8_t`       | C++20          |
| `int_type`   | `unsigned int` | C++20          |
| `off_type`   | `streamoff`      | C++20          |
| `pos_type`   | `u8streampos`   | C++20          |
| `state_type` | `mbstate_t`      | C++20          |

### char16_tによる特殊化のメンバ型定義 (C++11)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char16_t`       | C++11          |
| `int_type`   | `uint_least16_t` | C++11          |
| `off_type`   | `streamoff`      | C++11          |
| `pos_type`   | `u16streampos`   | C++11          |
| `state_type` | `mbstate_t`      | C++11          |


### char32_tによる特殊化のメンバ型定義 (C++11)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char32_t`       | C++11          |
| `int_type`   | `uint_least32_t` | C++11          |
| `off_type`   | `streamoff`      | C++11          |
| `pos_type`   | `u32streampos`   | C++11          |
| `state_type` | `mbstate_t`      | C++11          |


### wchar_tによる特殊化のメンバ型定義

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `wchar_t`        | |
| `int_type`   | `wint_t`         | |
| `off_type`   | `streamoff`      | |
| `pos_type`   | `wstreampos`     | |
| `state_type` | `mbstate_t`      | |


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  // std::stringと同じ
  std::basic_string<char, std::char_traits<char>> a = "aaa";
  std::basic_string<char, std::char_traits<char>> b = "bbb";

  // char_traits::compare()で比較が行われる
  if (a < b) {
    std::cout << "then" << std::endl;
  }
  else {
    std::cout << "else" << std::endl;
  }
}
```
* std::char_traits[color ff0000]
* std::basic_string[link basic_string.md]

### 出力
```
then
```

## 参照

