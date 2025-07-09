# equal_range
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
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

## 概要
コンテナ内の、指定されたキーと等しい全てのキー要素を含む範囲の境界を返す。`unordered_set` コンテナではキーの重複は無いため、この範囲は最大一つの要素を含む。 

もし指定されたキーがコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは [`end`](end.md) を指す。

- (1) : 非`const`な`this`に対してキー`x`を検索し、合致する全ての要素を含む範囲を取得する
- (2) : `const`な`this`に対してキー`x`を検索し、合致する全ての要素を含む範囲を取得する
- (3) : 非`const`な`this`に対してキー`k`を透過的に検索し、合致する全ての要素を含む範囲を取得する
- (4) : `const`な`this`に対してキー`k`を透過的に検索し、合致する全ての要素を含む範囲を取得する

(3), (4)の透過的な検索は、`Pred::is_transparent`および`Hash::is_transparent`が定義される場合に有効になる機能であり、例として`unordered_set<string> s;`に対して`s.equal_range("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## テンプレートパラメータ制約
- (3), (4) : `Pred::is_transparent`型および`Hash::is_transparent`型が定義されていること


## 戻り値
合致する要素の範囲を表す `pair` オブジェクトを返す。`pair::first` は 範囲の下境界にあたり、`pair::second` は 範囲の上境界にあたる。

そのような要素がない場合には、[`make_pair`](/reference/utility/make_pair.md)`(`[`end`](end.md)`(),` [`end`](end.md)`())`を返す。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 備考
- [`unordered_set`](/reference/unordered_set/unordered_set.md) の場合には、等価なキーはたかだか1つであるため、[`find()`](find.md) ほど有用ではないと考えられる


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
  std::unordered_set<int> us{ 1, 3, 5, 7, 9, };

  std::copy(us.begin(), us.end(), std::ostream_iterator<int>(std::cout, ", "));
  std::cout << std::endl;

  auto p1 = us.equal_range(5);
  print_range("equal_range(5)", us.begin(), p1.first, p1.second);

  auto p2 = us.equal_range(8);
  print_range("equal_range(8)", us.begin(), p2.first, p2.second);
}
```
* equal_range[color ff0000]
* std::ostream[link /reference/ostream.md]
* us.begin()[link begin.md]
* us.end()[link end.md]
* first[link /reference/utility/pair.md]
* second[link /reference/utility/pair.md]

### 出力
```
9, 7, 5, 3, 1,
equal_range(5): [2, 3)
equal_range(8): [5, 5)
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified], 4.5.3 [mark verified], 4.6.3 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

| 名前 | 説明 |
|------|------|
| [`find`](find.md) | 指定したキーの位置を検索 |
| [`count`](count.md) | 指定したキーの要素数を取得 |


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
