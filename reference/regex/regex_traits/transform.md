# transform
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class ForwardIterator>
string_type transform(ForwardIterator first, ForwardIterator last) const;
```


## 概要
与えられた文�範囲`[first, last)`を、並べ替えの�ーとして使用する、文�のシーケンスに変換する。結果のシーケンスは、�ケールごとの照合順序となる。


## 戻り値
```cpp
string_type str(first, last);
return use_facet<collate<char_type>>(getloc())
         .transform(&*str.begin(), &*str.begin() + str.length());
```
* use_facet[link /reference/locale/use_facet.md.nolink]
* collate[link /reference/locale/collate.md]
* getloc()[link getloc.md]
* transform[link /reference/locale/collate/transform.md.nolink]
* str.begin()[link /reference/string/basic_string/begin.md]
* str.length()[link /reference/string/basic_string/length.md]


## 例
```cpp example
#include <regex>
#include <cassert>

int main()
{
  std::regex_traits<char> traits;

  const std::string a = "a";
  const std::string b = "B";

  {
    const std::string key_a = traits.transform(a.begin(), a.end());
    const std::string key_b = traits.transform(b.begin(), b.end());
    assert(key_a > key_b);
  }
  {
    // Latin2
    traits.imbue(std::locale("cs_CZ.ISO8859-2"));
    const std::string key_a = traits.transform(a.begin(), a.end());
    const std::string key_b = traits.transform(b.begin(), b.end());
    assert(key_a < key_b);
  }
}
```
* transform[color ff0000]
* imbue[link imbue.md]
* std::locale[link /reference/locale/locale.md]
* begin()[link /reference/string/basic_string/begin.md]
* end()[link /reference/string/basic_string/end.md]

### 出力
```
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

