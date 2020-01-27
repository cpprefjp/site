# transform_primary
* regex[meta header]
* std[meta namespace]
* regex_traits[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class ForwardIterator>
string_type transform_primary(ForwardIterator first, ForwardIterator last) const;
```


## 概要
与えられた文�範囲`[first, last)`を、並べ替えの�ーとして使用する、大文�・小文�を区別しない文�のシーケンスに変換する。結果のシーケンスは、�ケールごとの照合順序となる。


## 戻り値
`typeid(use_facet<collate<char_type>>) == typeid(collate_byname<char_type>)`であり、`collate_byname<char_type>::transform(first, last)`が優先順位付き�ーに変換できる場合はその�ーを返し、そうでない場合は空文�列を返す。


## 例
```cpp example
#include <regex>
#include <cassert>

int main()
{
  std::regex_traits<char> traits;

  const std::string a = "A";
  const std::string a_acute = "Á";

  {
    const std::string key_a = traits.transform_primary(a.begin(), a.end());
    const std::string key_a_acute = traits.transform_primary(a_acute.begin(), a_acute.end());
    assert(key_a != key_a_acute);
  }
  {
    // Latin2
    traits.imbue(std::locale("cs_CZ.ISO8859-2"));
    const std::string key_a = traits.transform_primary(a.begin(), a.end());
    const std::string key_a_acute = traits.transform_primary(a_acute.begin(), a_acute.end());
    assert(key_a == key_a_acute);
  }
}
```
* transform_primary[color ff0000]
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

