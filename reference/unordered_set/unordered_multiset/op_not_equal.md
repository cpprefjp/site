# operator!=
* unordered_set[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator!=(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                  const unordered_multiset<Key, Hash, Pred, Allocator>& b);
}
```

## 概要
`unordered_multiset` オブジェクトを非�値比較する。


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
E<sub>i</sub> を `a` の `i` 番目の同値�ーのグループの大きさ、`n = a.`[`size`](size.md)`()`であるとして、

- 平均: O(Σ(E<sub>i</sub><sup>2</sup>))
- 最悪: O(n<sup>2</sup>)


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

  std::unordered_multiset<int> ums1{ 1, 2, 3, 1, 2, 3, };
  std::unordered_multiset<int> ums2{ 4, 5, 6, 4, 5, 6, };
  std::unordered_multiset<int> ums3{ 1, 2, 3, 1, 2, 3, };

  print("ums1", ums1);
  print("ums2", ums2);
  print("ums3", ums3);

  std::cout << "ums1 != ums2:" << (ums1 != ums2) << std::endl;
  std::cout << "ums1 != ums3:" << (ums1 != ums3) << std::endl;
}
```
* std::ostream[link /reference/ostream/basic_ostream.md]

### 出力
```
ums1:3, 3, 2, 2, 1, 1,
ums2:6, 6, 5, 5, 4, 4,
ums3:3, 3, 2, 2, 1, 1,
ums1 != ums2:true
ums1 != ums3:false
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


## 実装例
```cpp
namespace std {
  template <class Key, class Hash, class Pred, class Allocator>
  bool operator!=(const unordered_multiset<Key, Hash, Pred, Allocator>& a,
                  const unordered_multiset<Key, Hash, Pred, Allocator>& b)
  {
    return !(a == b);
  }
}
```
* ==[link op_equal.md]

## 関連項目


| 名前 | 説明 |
|----------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| [`operator==`](op_equal.md) |�値比較 |


## 参照
- [P0809R0 Comparing Unordered Containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0809r0.pdf)
