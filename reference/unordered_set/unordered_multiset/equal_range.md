# equal_range
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pair<iterator, iterator>
  equal_range(const key_type& x);       // (1) C++11
pair<const_iterator, const_iterator>
  equal_range(const key_type& x) const; // (2) C++11

template <class K>
pair<iterator, iterator>
  equal_range(const K& k);              // (3) C++20
template <class K>
pair<const_iterator, const_iterator>
  equal_range(const K& k) const;        // (4) C++20
```
* pair[link /reference/utility/pair.md]

## 概要
コンテナ内の、指定された�ーと�しい全ての�ー要素を含む範囲の境界を返す。

もし指定された�ーがコンテナ内のどの�ーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは [`end`](end.md) を指す。

- (1) : 非`const`な`this`に対して�ー`x`を検索し、合致する全ての要素を含む範囲を取得する
- (2) : `const`な`this`に対して�ー`x`を検索し、合致する全ての要素を含む範囲を取得する
- (3) : 非`const`な`this`に対して�ー`k`を透過的に検索し、合致する全ての要素を含む範囲を取得する
- (4) : `const`な`this`に対して�ー`k`を透過的に検索し、合致する全ての要素を含む範囲を取得する

(3)、(4)の透過的な検索は、`Hash::transparent_key_equal`が定義される場合に有効になる機能であり、例として`unordered_multiset<string> s;`に対して`s.equal_range("key");`のように`string`型の�ーを持つ連想コンテナの検索インタフェースに文�列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## テンプレートパラメータ制約
- (3), (4) : `Hash::transparent_key_equal`型が定義されていること


## 戻り値
合致する要素の範囲を表す `pair` オブジェクトを返す。`pair::first` は 範囲の下境界にあたり、`pair::second` は 範囲の上境界にあたる。

そのような要素がない場合には、[`make_pair`](/reference/utility/make_pair.md)`(`[`end`](end.md)`(),` [`end`](end.md)`())`を返す。

`iterator` はメンバ型であり `unordered_multiset` において双方向イテレータとして定義される。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp example
#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>
#include <iterator>

template <class Iter>
void print_range(const std::string& label, Iter begin, Iter it1, Iter it2, std::ostream& os = std::cout)
{
  os << label << ": " << "[" << std::distance(begin, it1) << ", "  << std::distance(begin, it2) << ")" << std::endl;
}

int main()
{
  std::unordered_multiset<int> ums{ 1, 3, 5, 7, 9, 1, 3, 5, 7, 9, };

  std::copy(ums.begin(), ums.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto p1 = ums.equal_range(5);
  print_range("equal_range(5)", ums.begin(), p1.first, p1.second);

  auto p2 = ums.equal_range(8);
  print_range("equal_range(8)", ums.begin(), p2.first, p2.second);
}
```
* equal_range[color ff0000]
* std::ostream[link /reference/ostream.md]
* ums.begin()[link begin.md]
* ums.end()[link end.md]
* first[link /reference/utility/pair.md]
* second[link /reference/utility/pair.md]

### 出力
```
9, 9, 7, 7, 5, 5, 1, 1, 3, 3,
equal_range(5): [4, 6)
equal_range(8): [10, 10)
```

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

| 名前                | 説明                                   |
|---------------------|----------------------------------------|
| [`count`](count.md) | 指定した�ーにマッチする要素の数を返す |
| [`find`](find.md)   | 指定した�ーで要素を探す               |


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
