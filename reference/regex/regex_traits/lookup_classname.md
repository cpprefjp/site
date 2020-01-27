# lookup_classname
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class ForwardIterator>
char_class_type lookup_classname(ForwardIterator first,
                                 ForwardIterator last,
                                 bool icase = false) const;
```

## 概要
与えられた文�の範囲に対応するクラス名を取得する。


## 戻り値
文�の範囲`[first, last)`からなるクラス名文�列に対応する、未規定のクラス値を返す。

パラメータ`icase`が`true`である場合は、大文�・小文�を無視してクラス名の比較が行われる。

与えられたクラス名に対応する値がない場合、`char_class_type()`を返す。


## 備考
`regex_traits<char>`と`regex_traits<wchar_t>`に対しては、少なくても以下のクラス名は許可される：

| クラス名 | クラスを表すビットマスク値 | 説明 |
|----------|----------------------------|------|
| `"alnum"`/`L"alnum"`   | [`ctype_base::alnum`][ctype_base] | 英�・数�にマッチする |
| `"alpha"`/`L"alpha"`   | [`ctype_base::alpha`][ctype_base] | 英�にマッチする |
| `"blank"`/`L"blank"`   | [`ctype_base::blank`][ctype_base] | ブランク文�にマッチする |
| `"cntrl"`/`L"cntrl"`   | [`ctype_base::cntrl`][ctype_base] | 制御文�にマッチする |
| `"digit"`/`L"digit"`   | [`ctype_base::digit`][ctype_base] | 数�にマッチする |
| `"d"`/`L"d"`           | [`ctype_base::digit`][ctype_base] | 数�にマッチする |
| `"graph"`/`L"graph"`   | [`ctype_base::graph`][ctype_base] | 図形文�にマッチする |
| `"lower"`/`L"lower"`   | [`ctype_base::lower`][ctype_base] | 英小文�にマッチする |
| `"print"`/`L"print"`   | [`ctype_base::print`][ctype_base] | 印�可能文�にマッチする |
| `"punct"`/`L"punct"`   | [`ctype_base::punct`][ctype_base] | 区切り文�にマッチする |
| `"space"`/`L"space"`   | [`ctype_base::space`][ctype_base] | 空白類文�にマッチする |
| `"s"`/`L"s"`           | [`ctype_base::space`][ctype_base] | 空白類文�にマッチする |
| `"upper"`/`L"upper"`   | [`ctype_base::upper`][ctype_base] | 英大文�にマッチする |
| `"w"`/`L"w"`           | [`ctype_base::alnum`][ctype_base] | 英�・数�にマッチする |
| `"xdigit"`/`L"xdigit"` | [`ctype_base::xdigit`][ctype_base] | 十�進数�にマッチする |

[ctype_base]: /reference/locale/ctype_base.md

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
  std::regex_traits<char>::char_class_type class_value =
    traits.lookup_classname(class_name.begin(), class_name.end());
  if (traits.isctype('a', class_value)) {
    std::cout << "'a' is alpha-numeric class" << std::endl;
  }
  else {
    std::cout << "'a' is not alpha-numeric class" << std::endl;
  }
}
```
* lookup_classname[color ff0000]
* class_name.begin()[link /reference/string/basic_string/begin.md]
* class_name.end()[link /reference/string/basic_string/end.md]
* isctype[link isctype.md]

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


## 参照
- [LWG Issue 2018. [CD] `regex_traits::isctype` Returns clause is wrong](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2018)
    - C++14から、戻り値の仕様文面が見直された。

