# operator!=
* unordered_set[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator!=(const unordered_set<Key, Hash, Pred, Allocator>& a,
                  const unordered_set<Key, Hash, Pred, Allocator>& b);
}
```

## 概要
`unordered_set` オブジェクトを非�値比較する。


## 要件
- `a.`[`key_eq`](key_eq.md)`()` と `b.`[`key_eq`](key_eq.md)`()` は同じふるまいをすること。
- `key_type` の�値比較演算�（`operator==`）で�値と判定された 2 つのオブジェクトは、[`key_eq`](key_eq.md)`()` でも�値と判定されること。


## 戻り値
以下と�価：

```cpp
return !(a == b);
```
* ==[link op_equal.md]


## 計算量
- 平均: [`size()`](size.md) に対して線形時間
- 最悪: [`size()`](size.md) に対して二乗時間


## 備考
- 本関数は、コンテナ内の要素の比較に [`key_eq`](key_eq.md)`()` で返される�ー比較用関数オブジェクトを使用しないことに注意。
- 本関数は、標準コンテナの要件を満たさない。これは、標準コンテナの要件が `iterator` と `std::`[`equal`](/reference/algorithm/equal.md) を用いて定義されているためである。しかし、本関数の戻り値は、`!(a` [`==`](op_equal.md) `b)` という意味においては、標準コンテナと同様とも考えることができる。


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_set>
#include <iterator>
#include <algorithm>

template <class C>
void print(const std::string& label, const C& c, std::ostream& os = std::cout)
{
  os << label << ":";
  std::copy(std::begin(c), std::end(c), std::ostream_iterator<typename C::value_type>(os, ", "));
  os << std::endl;
}

int main()
{
  std::cout << std::boolalpha;

  std::unordered_set<int> us1{ 1, 2, 3, };
  std::unordered_set<int> us2{ 4, 5, 6, };
  std::unordered_set<int> us3{ 1, 2, 3, };

  print("us1", us1);
  print("us2", us2);
  print("us3", us3);

  std::cout << "us1 != us2:" << (us1 != us2) << std::endl;
  std::cout << "us1 != us3:" << (us1 != us3) << std::endl;
}
```
* std::ostream[link /reference/ostream/basic_ostream.md]

### 出力
```
us1:3, 2, 1,
us2:6, 5, 4,
us3:3, 2, 1,
us1 != us2:true
us1 != us3:false
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


## 実装例
```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator!=(const unordered_set<Key, Hash, Pred, Allocator>& a,
                  const unordered_set<Key, Hash, Pred, Allocator>& b)
  {
    return !(a == b);
  }
}
```
* ==[link op_equal.md]

## 関連項目

| 名前 | 説明 |
|-----------------------------------------------------------------------------------------------------------------------------------------------|------------|
| [`operator==`](op_equal.md) | �値比較 |


## 参照
- [P0809R0 Comparing Unordered Containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0809r0.pdf)
