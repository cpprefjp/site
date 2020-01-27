# cend
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const_iterator cend() const noexcept;
```

## 概要
最終の要素の次を指す�み取り専用イテレータを取得する。

`unordered_multiset` は非順序連想コンテナであるため「最終」に特に意味はないが、[`cbegin`](cbegin.md)`()` で得られたイテレータを `cend()` まで `operator++()` でイテレートすることで当該コンテナの要素を漏れなくダブりなく走査することができる。


## 戻り値
最終の要素の次を指すイテレータ


## 例外
投げない。


## 計算量
定数


## 例
```cpp example
#include <iostream>
#include <algorithm>
#include <iterator>
#include <unordered_set>

int main()
{
  std::unordered_multiset<int> ums{ 1, 2, 3, 1, 2, 3, };

  std::copy(ums.cbegin(), ums.cend(), std::ostream_iterator<int>(std::cout, " "));
  std::cout << std::endl;
}
```
* cend()[color ff0000]
* ums.cbegin()[link cbegin.md]

### 出力
```
3 3 2 2 1 1
```

注：[`unordered_multiset`](/reference/unordered_set/unordered_multiset.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前 | 説明 |
|----------------------------------------------|--------------------------------|
| [`begin`](begin.md)                        | 先�要素を指すイテレータの取得 |
| [`end`](end.md)                            | 最終要素の次を指すイテレータの取得 |
| [`cbegin`](cbegin.md)                      | 先�要素を指す�み取り専用イテレータの取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え�）で指定したバケット内の先�要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え�）で指定したバケット内の最終要素の次を指す�み取り専用イテレータを取得 |

