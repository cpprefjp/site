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
与えられた文字範囲`[first, last)`を、並べ替えのキーとして使用する、文字のシーケンスに変換する。結果のシーケンスは、ロケールごとの照合順序となる。


## 戻り値
```cpp
string_type str(first, last);
return use_facet<collate<char_type>>(getloc())
         .transform(str.data(), str.data() + str.length());
```
* use_facet[link /reference/locale/use_facet.md.nolink]
* collate[link /reference/locale/collate.md]
* getloc()[link getloc.md]
* transform[link /reference/locale/collate/transform.md.nolink]
* str.data()[link /reference/string/basic_string/data.md]
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
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 3040. `basic_string_view::starts_with` Effects are incorrect](https://wg21.cmeerw.net/lwg/issue3040)
