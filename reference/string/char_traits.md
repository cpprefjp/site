#char_traits
```cpp
namespace std {
  template<class charT> struct char_traits;

  template<> struct char_traits<char>;
  template<> struct char_traits<char16_t>; // C++11から
  template<> struct char_traits<char32_t>; // C++11から
  template<> struct char_traits<wchar_t>;
}
```

##概要
`char_traits`は、[`basic_string`](./basic_string.md)文字列クラスのおける、各要素の特性を使用するためのクラスである。  
このクラスと同じインタフェースのクラスを用意して[`basic_string`](./basic_string.md)クラスのテンプレート引数として指定することにより、ユーザー独自の処理に切り替えることが可能である。たとえば、大文字・小文字を区別しない比較のためのカスタマイズに利用できる。

テンプレートパラメータは以下を意味する：

- `charT` : `basic_string`クラスが扱う文字型


###静的メンバ関数

| 名前           | 説明 | 対応バージョン |
|----------------|---------------------------------------------------|-----|
| `assign`       | 代入 | |
| `eq`           | 等値比較 | |
| `lt`           | 小なり比較 | |
| `compare`      | 比較 | |
| `length`       | 文字列長を取得する | |
| `move`         | 文字列を他のシーケンスにコピーする | |
| `copy`         | 文字列を他のシーケンスにコピーする。 | |
| `not_eof`      | 文字がファイル終端文字(EOF)じゃないかをテストする | |
| `to_char_type` | 数値を文字に変換する | |
| `to_int_type`  | 文字を数値に変換する | |
| `eq_int_type`  | 数値の等値比較 | |
| `eof`          | ファイル終端文字(EOF)を表す数値を取得する | |

###メンバ型

| 名前         | 説明                                 | 対応バージョン |
|--------------|--------------------------------------|----------------|
| `char_type`  | 文字コンテナの実装で使用される文字型 | |
| `int_type`   | 文字に対応する値を表す数値型 | |
| `off_type`   | 文字の差を表す型 | |
| `pos_type`   | 位置を表す型 | |
| `state_type` | ストリームのマルチバイト文字の変換の状態を表す型 | |


###charによる特殊化のメンバ型定義

| 名前         | 説明        | 対応バージョン |
|--------------|-------------|----------------|
| `char_type`  | `char`      | |
| `int_type`   | `int`       | |
| `off_type`   | `streamoff` | |
| `pos_type`   | `streampos` | |
| `state_type` | `mbstate_t` | |


###char16_tによる特殊化のメンバ型定義(C++11)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char16_t`       | C++11          |
| `int_type`   | `uint_least16_t` | C++11          |
| `off_type`   | `streamoff`      | C++11          |
| `pos_type`   | `u16streampos`   | C++11          |
| `state_type` | `mbstate_t`      | C++11          |


###char32_tによる特殊化のメンバ型定義(C++11)

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `char32_t`       | C++11          |
| `int_type`   | `uint_least32_t` | C++11          |
| `off_type`   | `streamoff`      | C++11          |
| `pos_type`   | `u32streampos`   | C++11          |
| `state_type` | `mbstate_t`      | C++11          |


###wchar_tによる特殊化のメンバ型定義

| 名前         | 説明             | 対応バージョン |
|--------------|------------------|----------------|
| `char_type`  | `wchar_t`        | |
| `int_type`   | `wint_t`         | |
| `off_type`   | `streamoff`      | |
| `pos_type`   | `wstreampos`     | |
| `state_type` | `mbstate_t`      | |


##例
```cpp
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

###出力
```
then
```

###参照

