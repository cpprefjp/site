#lookup_classname (C++11)
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function[meta id-type]

```cpp
template <class ForwardIterator>
char_class_type lookup_classname(ForwardIterator first,
                                 ForwardIterator last,
                                 bool icase = false) const;
```

##概要
与えられた文字の範囲に対応するクラス名を取得する。


##戻り値
文字の範囲`[first, last)`からなるクラス名文字列に対応する、未規定のクラス値を返す。

パラメータ`icase`が`true`である場合は、大文字・小文字を無視してクラス名の比較が行われる。

与えられたクラス名に対応する値がない場合、`char_class_type()`を返す。


##備考
`regex_traits<char>`と`regex_traits<wchar_t>`に対しては、少なくても以下のクラス名は許可される：

| クラス名 | クラスを表すビットマスク値 | 説明 |
|----------|----------------------------|------|
| `"alnum"`/`L"alnum"`   | [`ctype_base::alnum`][ctype_base] | 英字・数字にマッチする |
| `"alpha"`/`L"alpha"`   | [`ctype_base::alpha`][ctype_base] | 英字にマッチする |
| `"blank"`/`L"blank"`   | [`ctype_base::blank`][ctype_base] | ブランク文字にマッチする |
| `"cntrl"`/`L"cntrl"`   | [`ctype_base::cntrl`][ctype_base] | 制御文字にマッチする |
| `"digit"`/`L"digit"`   | [`ctype_base::digit`][ctype_base] | 数字にマッチする |
| `"d"`/`L"d"`           | [`ctype_base::digit`][ctype_base] | 数字にマッチする |
| `"graph"`/`L"graph"`   | [`ctype_base::graph`][ctype_base] | 図形文字にマッチする |
| `"lower"`/`L"lower"`   | [`ctype_base::lower`][ctype_base] | 英小文字にマッチする |
| `"print"`/`L"print"`   | [`ctype_base::print`][ctype_base] | 印字可能文字にマッチする |
| `"punct"`/`L"punct"`   | [`ctype_base::punct`][ctype_base] | 区切り文字にマッチする |
| `"space"`/`L"space"`   | [`ctype_base::space`][ctype_base] | 空白類文字にマッチする |
| `"s"`/`L"s"`           | [`ctype_base::space`][ctype_base] | 空白類文字にマッチする |
| `"upper"`/`L"upper"`   | [`ctype_base::upper`][ctype_base] | 英大文字にマッチする |
| `"w"`/`L"w"`           | [`ctype_base::alnum`][ctype_base] | 英字・数字にマッチする |
| `"xdigit"`/`L"xdigit"` | [`ctype_base::xdigit`][ctype_base] | 十六進数字にマッチする |

[ctype_base]: /reference/locale/ctype_base.md]

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
* std::string[link /reference/string/basic_string.md]
* begin()[link /reference/string/basic_string/begin.md]
* end()[link /reference/string/basic_string/end.md]
* isctype[link ./isctype.md]
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

