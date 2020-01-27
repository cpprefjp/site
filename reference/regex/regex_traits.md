# regex_traits
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT>
  struct regex_traits;
}
```

## 概要
`regex_traits`は、�規表現ライブラリ`<regex>`クラス内で使用される、文�とその変換の規則に関する特性を表すクラスである。

標準ライブラリは `std::regex_traits<char>` と `std::regex_traits<wchar_t>` に対し有効な特殊化を定義する。それ以外の型については、このクラスと同じインタフェースのクラスを実装することで、特定の文�コードの場合に、�規表現の振る舞いをカスタマイズできる。


## メンバ関数

### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](regex_traits/op_constructor.md) | コンストラクタ | C++11 |
| `~regex_traits() = default;` | デストラクタ | C++11 |
| `regex_traits& operator=(const regex_traits&) = default;`<br/> `regex_traits& operator=(regex_traits&&) = default;` | 代入演算� | C++11 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`translate`](regex_traits/translate.md) | 与えられた文�と�価の文�を取得する | C++11 |
| [`translate_nocase`](regex_traits/translate_nocase.md) | 与えられた文�列と大文�・小文�を区別せずに�価な文�列を取得する | C++11 |
| [`transform`](regex_traits/transform.md) | 与えられた範囲を、並べ替えの�ーとして使用する、文�のシーケンスに変換する | C++11 |
| [`transform_primary`](regex_traits/transform_primary.md) | 与えられた文�の範囲を、並べ替えの�ーとして使用する、大文�・小文�を区別しない文�のシーケンスに変換する | C++11 |
| [`lookup_collatename`](regex_traits/lookup_collatename.md) | 与えられた文�の範囲に対応する照合名を取得する | C++11 |
| [`lookup_classname`](regex_traits/lookup_classname.md) | 与えられた文�の範囲に対応するクラス名を取得する | C++11 |
| [`isctype`](regex_traits/isctype.md) | 文�が特定のクラスに属しているかを判定する | C++11 |
| [`value`](regex_traits/value.md) | 文�の整数表現を取得する | C++11 |
| [`imbue`](regex_traits/imbue.md) | �ケールを�定する | C++11 |
| [`getloc`](regex_traits/getloc.md) | �ケールを取得する | C++11 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`length`](regex_traits/length.md) | 文�列の長さを取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `char_type`       | テンプレートパラメータ`CharT` | C++11 |
| `string_type`     | `char_type`文�を要素とする文�列型 [`std::basic_string`](/reference/string/basic_string.md)`<char_type>` | C++11 |
| `locale_type`     | �ケール型 [`std::locale`](/reference/locale/locale.md) | C++11 |
| `char_class_type` | �規表現の文�クラス名を表す、実装定義のビットマスク型 | C++11 |


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::regex_traits<char> traits;

  std::string class_name = "alnum"; // �規表現�で[[:alnum:]]のように入力するクラス名

  // 文�'a'がアルファベットと数�のクラスに含まれているかを判定する
  if (traits.isctype('a', traits.lookup_classname(class_name.begin(), class_name.end()))) {
    std::cout << "'a' is alpha-numeric class" << std::endl;
  }
  else {
    std::cout << "'a' is not alpha-numeric class" << std::endl;
  }
}
```
* std::regex_traits[color ff0000]
* class_name.begin()[link /reference/string/basic_string/begin.md]
* class_name.end()[link /reference/string/basic_string/end.md]
* traits.isctype[link regex_traits/isctype.md]
* traits.lookup_classname[link regex_traits/lookup_classname.md]

### 出力
```
'a' is alpha-numeric class
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

