# lookup_collatename
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class ForwardIterator>
string_type lookup_collatename(
                ForwardIterator first,
                ForwardIterator last) const;
```

## 概要
与えられた文�の範囲`[first, last)`に対応する照合名を取得する。


## 戻り値
文�範囲`[first, last)`の文�列に対応する照合名があったらそれを返す。そのような照合名がない場合は、空文�列を返す。


## 例
```cpp example
#include <iostream>
#include <regex>
#include <string>

int main()
{
  std::regex_traits<char> traits;

  // tilde(チルダ、~記号)の照合名を取得する
  std::string input = "tilde";
  std::string result = traits.lookup_collatename(input.begin(), input.end());

  std::cout << result << std::endl;
}
```
* lookup_collatename[color ff0000]
* input.begin()[link /reference/string/basic_string/begin.md]
* input.end()[link /reference/string/basic_string/end.md]

### 出力
```
~
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 5.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

