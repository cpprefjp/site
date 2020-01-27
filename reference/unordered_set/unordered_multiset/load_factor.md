# load_factor
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
float load_factor() const noexcept;
```

## 概要
現在の負荷率（バケットあたりの要素数の平均）を取得する。


## 戻り値
現在の負荷率として、以下を返す：

```cpp
size() / bucket_count()
```
* size()[link size.md]
* bucket_count()[link bucket_count.md]


## 例外
投げない。


## 計算量
定数。


## 例
```cpp example
#include <iostream>
#include <unordered_set>
#include <algorithm>
#include <iterator>

template <class C>
void print(const C& c, std::ostream& os = std::cout)
{
  std::copy(c.begin(), c.end(), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << "\nsize is " << c.size() << ", bucket_count is " << c.bucket_count() << ", load_factor is " << c.load_factor() << '\n' << std::endl;
}

int main()
{
  std::unordered_multiset<int> ums{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };

  print(ums);

  ums.insert({ 2, 4, 6, 8, 10, 2, 4, 6, 8, 10, });

  print(ums);
}
```
* load_factor()[color ff0000]
* std::ostream[link /reference/ostream/basic_ostream.md]
* c.begin()[link begin.md]
* c.end()[link end.md]
* c.size()[link size.md]
* c.bucket_count()[link bucket_count.md]
* ums.insert[link insert.md]

### 出力
```
9, 9, 7, 7, 5, 5, 1, 1, 3, 3,
size is 10, bucket_count is 11, load_factor is 0.909091

10, 10, 8, 8, 6, 6, 4, 4, 2, 2, 9, 9, 7, 7, 5, 5, 1, 1, 3, 3,
size is 20, bucket_count is 23, load_factor is 0.869565

```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 関連項目

| 名前 | 説明 |
|-------------------------------------------|------------------------------------------|
| [`size`](size.md)                       | 要素数の取得                             |
| [`bucket_count`](bucket_count.md)       | バケット数の取得                         |
| [`max_load_factor`](max_load_factor.md) | 負荷率の最大値を取得、�定               |
| [`rehash`](rehash.md)                   | 最小バケット数指定によるバケット数の調整 |
| [`reserve`](reserve.md)                 | 最小要素数指定によるバケット数の調整     |

