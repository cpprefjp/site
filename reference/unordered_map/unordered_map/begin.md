# begin
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator begin() noexcept;           // (1) C++11
constexpr iterator begin() noexcept; // (1) C++26

const_iterator begin() const noexcept;           // (2) C++11
constexpr const_iterator begin() const noexcept; // (2) C++26
```

## 概要
先頭の要素を指すイテレータを取得する。

`unordered_map` は非順序連想コンテナであるため「先頭」に特に意味はないが、`begin()` で得られたイテレータを [`end`](end.md)`()` まで `operator++()` でイテレートすることで当該コンテナの要素を漏れなくダブりなく走査できる。


## 戻り値
先頭の要素を指すイテレータ


## 例外
投げない。


## 計算量
定数


## 例

```cpp example
#include <iostream>
#include <string>
#include <algorithm>
#include <utility>
#include <unordered_map>

int main()
{
  using mymap = std::unordered_map<std::string, int>;

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
* begin()[color ff0000]
* end[link end.md]


### 出力例
```
{3rd,3}, {2nd,2}, {1st,1},
{3rd,3}, {2nd,2}, {1st,1},
```

注：[`unordered_map`](/reference/unordered_map/unordered_map.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前                                         | 説明                                           |
|----------------------------------------------|------------------------------------------------|
| [`end`](end.md)                            | 最終要素の次を指すイテレータの取得             |
| [`cbegin`](cbegin.md)                      | 先頭要素を指す読み取り専用イテレータの取得     |
| [`cend`](cend.md)                          | 最終要素の次を指す読み取り専用イテレータの取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え字）で指定したバケット内の先頭要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え字）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え字）で指定したバケット内の先頭要素を指す読み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え字）で指定したバケット内の最終要素の次を指す読み取り専用イテレータを取得 |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
