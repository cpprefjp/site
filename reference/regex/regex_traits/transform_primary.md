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
与えられた文字範囲`[first, last)`を、並べ替えのキーとして使用する、大文字・小文字を区別しない文字のシーケンスに変換する。結果のシーケンスは、ロケールごとの照合順序となる。


## 効果
[`getloc()`](getloc.md)で得られるロケールにおける文字照合ファセット [`collate`](/reference/locale/collate.md)`<char_type>` の型が [`collate_byname`](/reference/locale/collate_byname.md)`<char_type>` であり、かつ`collate_byname<char_type>::transform(first, last)`が返すソートキーの形式が既知であってプライマリソートキーに変換できる場合、そのキーを返す。そうでなければ空文字列を返す。


## 例
```cpp example
#include <regex>
#include <cassert>
#include <string>

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
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 4186. `regex_traits::transform_primary` mistakenly detects `typeid` of a function](https://cplusplus.github.io/LWG/issue4186)
    - C++26で、文字照合ファセットの判定が、関数の`typeid`を誤って検出しないよう、ロケールの`collate`ファセットの型が`collate_byname<char_type>`であるかどうかを判定する形に明確化された
