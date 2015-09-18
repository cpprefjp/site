#regex_traits (C++11)
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT>
  struct regex_traits;
}
```

##概要
`regex_traits`は、正規表現ライブラリ`<regex>`クラス内で使用される、文字とその変換の規則に関する特性を表すクラスである。

このクラスと同じインタフェースのクラスを実装することで、特定の文字コードの場合に、正規表現の振る舞いをカスタマイズできる。


##メンバ関数

###構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `(constructor)` | コンストラクタ | C++11 |
| `~regex_traits() = default;` | デストラクタ | C++11 |
| `regex_traits& operator=(const regex_traits&) = default;`<br/> `regex_traits& operator=(regex_traits&&) = default;` | 代入演算子 | C++11 |


###変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `translate` | 与えられた文字と同等の文字を取得する | C++11 |
| `translate_nocase` | 与えられた文字列と大文字・小文字を区別せずに同等な文字列を取得する | C++11 |
| `transform` | 与えられた範囲を、並べ替えのキーとして使用する、文字のシーケンスに変換する | C++11 |
| `transform_primary` | 与えられた文字の範囲を、並べ替えのキーとして使用する、大文字・小文字を区別しない文字のシーケンスに変換する | C++11 |
| `lookup_collatename` | 与えられた文字の範囲に対応する照合名を取得する | C++11 |
| [`lookup_classname`](./regex_traits/lookup_classname.md) | 与えられた文字の範囲に対応するクラス名を取得する | C++11 |
| [`isctype`](./regex_traits/isctype.md) | 文字が特定のクラスに属しているかを判定する | C++11 |
| `value` | 文字の整数表現を取得する | C++11 |
| [`imbue`](./regex_traits/imbue.md) | ロケールを設定する | C++11 |
| `getloc` | ロケールを取得する | C++11 |


##静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `length` | 文字列の長さを取得する | C++11 |


##メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `char_type`       | テンプレートパラメータ`CharT` | C++11 |
| `string_type`     | `char_type`文字を要素とする文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<char_type>` | C++11 |
| `locale_type`     | ロケール型 [`std::locale`](/reference/locale/locale.md) | C++11 |
| `char_class_type` | 正規表現の文字クラス名を表す、実装定義のビットマスク型 | C++11 |


##例
```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::regex_traits<char> traits;
  
  std::string class_name = "alnum"; // 正規表現中で[[:alnum:]]のように入力するクラス名
  
  // 文字'a'がアルファベットと数字のクラスに含まれているかを判定する
  if (traits.isctype('a', traits.lookup_classname(class_name.begin(), class_name.end()))) {
    std::cout << "'a' is alpha-numeric class" << std::endl;
  }
  else {
    std::cout << "'a' is not alpha-numeric class" << std::endl;
  }
}
```
* std::string[link /reference/string/basic_string.md]
* begin()[link /reference/string/basic_string/begin.md]
* end()[link /reference/string/basic_string/end.md]
* isctype[link ./regex_traits/isctype.md]
* lookup_classname[link ./regex_traits/lookup_classname.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
'a' is alpha-numeric class
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

