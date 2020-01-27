# begin
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
iterator begin() noexcept;
const_iterator begin() const noexcept;
```

## 概要
先�の要素を指すイテレータを取得する。

`unordered_set` は非順序連想コンテナであるため「先�」に特に意味はないが、`begin()` で得られたイテレータを [`end`](end.md)`()` まで `operator++()` でイテレートすることで当該コンテナの要素を漏れなくダブりなく走査することができる。


## 戻り値
先�の要素を指すイテレータ


## 例外
投げない


## 計算量
定数


## 備考
`const` 版ではない `begin` が返す `iterator` も�み取り専用イテレータである。

（が、`iterator` と `const_iterator` が同じ型とは限らない）


## 例
```cpp example
#include <iostream>
#include <algorithm>
#include <iterator>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 1, 2, 3, };
  const std::unordered_set<int> cus{us};

  std::copy(us.begin(), us.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  std::copy(cus.begin(), cus.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;
}
```
* begin()[color ff0000]
* end()[link end.md]

### 出力
```
3, 2, 1, 
1, 2, 3, 
```

注：[`unordered_set`](/reference/unordered_set/unordered_set.md) は非順序連想コンテナであるため、出力順序は無意味であることに注意


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
|----------------------------------------------|------------------------------------------------|
| [`end`](end.md)                            | 最終要素の次を指すイテレータの取得             |
| [`cbegin`](cbegin.md)                      | 先�要素を指す�み取り専用イテレータの取得     |
| [`cend`](cend.md)                          | 最終要素の次を指す�み取り専用イテレータの取得 |
| [`begin(size_type)`](begin-size_type.md)   | インデックス（添え�）で指定したバケット内の先�要素を指すイテレータを取得 |
| [`end(size_type)`](end-size_type.md)       | インデックス（添え�）で指定したバケット内の最終要素の次を指すイテレータを取得 |
| [`cbegin(size_type)`](cbegin-size_type.md) | インデックス（添え�）で指定したバケット内の先�要素を指す�み取り専用イテレータを取得 |
| [`cend(size_type)`](cend-size_type.md)     | インデックス（添え�）で指定したバケット内の最終要素の次を指す�み取り専用イテレータを取得 |

