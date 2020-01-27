# equal_range
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
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

(3)、(4)の透過的な検索は、`Hash::transparent_key_equal`が定義される場合に有効になる機能であり、例として`unordered_multimap<string, int> m;`に対して`m.equal_range("key");`のように`string`型の�ーを持つ連想コンテナの検索インタフェースに文�列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## パラメータ
- `x` : 比較される�ー値。`key_type` はメンバ型であり、`map` コンテナ内で `Key` の別名として定義される。ここで `Key` は最初のテンプレートパラメータである。
- `k` : 検索する�ー。`key_type`と透過的に比較可能な型`K`型の�ーである。


## テンプレートパラメータ制約
- (3), (4) : `Hash::transparent_key_equal`型が定義されていること


## 戻り値
合致する要素の範囲を表す `pair` オブジェクトを返す。`pair::first` は 範囲の下境界にあたり、`pair::second` は 範囲の上境界にあたる。

そのような要素がない場合には、[`make_pair`](/reference/utility/make_pair.md)`(`[`end`](end.md)`(),` [`end`](end.md)`())`を返す。

`iterator` はメンバ型であり `unordered_multimap` において双方向イテレータとして定義される。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 例
```cpp example
#include <iostream>
#include <unordered_map>
#include <algorithm>

using it_t = std::unordered_multimap<int,char>::iterator;

void disp( std::pair<const int,char>& p) {
  std::cout << p.second << std::endl;
}

int main()
{
  std::unordered_multimap<int,char> um;

  um.insert(std::make_pair(1,'a'));
  um.insert(std::make_pair(1,'b'));
  um.insert(std::make_pair(1,'c'));

  std::pair<it_t, it_t> ret = um.equal_range(1);

  std::cout << "--- ret" << std::endl;
  std::for_each(ret.first, ret.second, disp);


  std::pair<it_t, it_t> ret2 = um.equal_range(0);
  std::cout << "--- ret2" << std::endl;
  std::cout << "first:" << ( ret2.first == um.end() )  << std::endl;
  std::cout << "second:" << ( ret2.second == um.end() )  << std::endl;

  return 0;
}
```
* equal_range[color ff0000]
* um.insert[link insert.md]
* um.end()[link end.md]

### 出力
```
--- ret
a
b
c
--- ret2
first:1
second:1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012


## 関連項目

| 名前                | 説明                                   |
|---------------------|----------------------------------------|
| [`count`](count.md) | 指定した�ーにマッチする要素の数を返す |
| [`find`](find.md)   | 指定した�ーで要素を探す               |


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
