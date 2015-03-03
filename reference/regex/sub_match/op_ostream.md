#operator<< (非メンバ関数) (C++11)
* regex[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class charT, class ST, class BiIter>
    basic_ostream<charT, ST>& operator<<(basic_ostream<charT, ST>& os, const sub_match<BiIter>& m);
}
```
* basic_ostream[link ../../ostream/basic_ostream.md]
* sub_match[link ../sub_match.md]

##概要
ストリームへの出力を行う。


##戻り値
`os `[`<<`](../../string/basic_string/op_ostream.md)` m.`[`str`](str.md)`()`


##備考
テンプレート引数は 3 つあるが、規格上は文字列の出力に使用している [`operator<<`](../../string/basic_string/op_ostream.md) が `charT = `[`iterator_traits`](../../iterator/iterator_traits.md)`<BiIter>::value_type`、かつ、`ST = `[`char_traits`](../../string/char_traits.md)`<charT>` のバージョンしか存在しない。


##例
```cpp
#include <iostream>
#include <regex>
#include <string>

int main()
{
  const char ca[] = " abc ";
  const std::regex re(R"(\w+)");

  std::cmatch m;
  if (std::regex_search(ca, m, re)) {
    std::csub_match sub = m[0];
    std::cout << '\'' << sub << '\'' << std::endl;
  } else {
    std::cout << "not match" << std::endl;
  }
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* string[link ../../string.md]
* cmatch[link ../match_results.md]
* regex_search[link ../regex_search.md]
* csub_match[link ../sub_match.md]

###出力
```
'abc'
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
