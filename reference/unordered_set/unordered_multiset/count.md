# count
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type count(const key_type& k) const;
```

## 概要
指定されたキーの要素数を数える。


## 戻り値
引数 `k` と等価なキーの要素数を返す。


## 計算量
- 平均： O(`count(k)`)
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp
#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

int main()
{
  std::unordered_multiset<int> ums{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };

  std::copy(ums.begin(), ums.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto c1 = ums.count(5);
  std::cout << "count of 5:" << c1 << std::endl;

  auto c2 = ums.count(8);
  std::cout << "count of 8:" << c2 << std::endl;
}
```
* count[color ff0000]
* ums.begin()[link begin.md]
* ums.end()[link end.md]

### 出力
```
9, 9, 7, 7, 5, 5, 3, 3, 1, 1,
count of 5:2
count of 8:0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [LWG Issue 2304. Complexity of `count` in unordered associative containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2304)


## 関連項目

| | |
|-----------------------------------|--------------------------|
| [`find`](find.md)               | 指定したキーの位置を検索 |
| [`equal_range`](equal_range.md) | 指定したキーの範囲を取得 |

