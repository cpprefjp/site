# operator()
* locale[meta header]
* std[meta namespace]
* locale[meta class]
* function template[meta id-type]

```cpp
template <class charT, class traits, class Allocator>
bool operator()(const basic_string<charT, traits, Allocator>& s1,
                const basic_string<charT, traits, Allocator>& s2) const; // (1) C++03
```
* basic_string[link /reference/string/basic_string.md]

## 概要
照合ファセットを使用して、2つの文字列を比較する。

このメンバ関数により、`locale`オブジェクトは、文字列に対する二項述語（比較関数オブジェクト）として使用できる。`std::sort`などのアルゴリズムに、ロケールに基いた文字列の照合順序を与える用途に使える。


## 戻り値
`s1`が`s2`より照合順序において小さい場合に`true`、そうでない場合に`false`を返す。

すなわち、以下と等価である：

```cpp
return std::use_facet<std::collate<charT>>(*this).compare(
         s1.data(), s1.data() + s1.size(),
         s2.data(), s2.data() + s2.size()) < 0;
```
* std::use_facet[link ../use_facet.md]
* std::collate[link ../collate.md]
* compare[link ../collate/compare.md.nolink]


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <locale>
#include <string>
#include <vector>

int main()
{
  std::vector<std::string> v = {"charlie", "alice", "bob"};

  // localeオブジェクトを比較関数として使い、ロケールに基いてソートする
  std::sort(v.begin(), v.end(), std::locale::classic());

  for (const std::string& s : v) {
    std::cout << s << std::endl;
  }
}
```
* std::locale::classic()[link classic.md]

### 出力
```
alice
bob
charlie
```


## バージョン
### 言語
- C++03


## 関連項目
- [`collate`](../collate.md)
- [`use_facet`](../use_facet.md)
