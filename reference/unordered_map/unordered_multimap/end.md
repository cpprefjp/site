# end
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator end() noexcept;
const_iterator end() const noexcept;
```

## 概要
最終の要素の次を指すイテレータを取得する。
`unordered_multimap` は非順序連想コンテナであるため「最終」に特に意味はないが、[`begin`](begin.md)`()` で得られたイテレータを `end()` まで `operator++()` でイテレートすることで当該コンテナの要素を漏れなく走査できる。


## 戻り値
最終の要素の次を指すイテレータ


## 例外
投げない。


## 計算量
定数


## 備考
`const` 版ではない `end()` が返す `iterator` も読み取り専用イテレータである。

（が、`iterator` と `const_iterator` が同じ型とは限らない）


## 例
```cpp example
#include <iostream>
#include <string>
#include <algorithm>
#include <utility>
#include <unordered_map>

int main()
{
  using mymap = std::unordered_multimap<std::string, int>;

  mymap um{ { "1st", 1 }, { "2nd", 2 }, { "3rd", 3 }, };
  const mymap cum{um};

  std::for_each(um.begin(), um.end(), [](mymap::value_type p)
    { std::cout << '{' << p.first << ',' << p.second << "}, "; });
  std::cout << std::endl;

  std::for_each(cum.begin(), cum.end(), [](mymap::value_type p)
    { std::cout << '{' << p.first << ',' << p.second << "}, "; });
  std::cout << std::endl;
}
```
* end()[color ff0000]
* begin()[link begin.md]

### 出力例
```
{3rd,3}, {1st,1}, {2nd,2}, 
{3rd,3}, {1st,1}, {2nd,2}, 
```

注：[`unordered_multimap`](/reference/unordered_map/unordered_multimap.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前                                         | 説明                                           |
|----------------------------------------------|------------------------------------------------|
| [`begin`](begin.md)                        | 先頭要素を指すイテレータの取得                 |
| [`cbegin`](cbegin.md)                      | 先頭要素を指す読み取り専用イテレータの取得     |
| [`cend`](cend.md)                          | 最終要素の次を指す読み取り専用イテレータの取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得

