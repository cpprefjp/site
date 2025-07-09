# equal_range
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
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
コンテナ内の、指定されたキーと等しい全てのキー要素を含む範囲の境界を返す。`unordered_map` コンテナではキーの重複は無いため、この範囲は最大一つの要素を含む。 

もし指定されたキーがコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは [`end`](end.md) を指す。

- (1) : 非`const`な`this`に対してキー`x`を検索し、合致する全ての要素を含む範囲を取得する
- (2) : `const`な`this`に対してキー`x`を検索し、合致する全ての要素を含む範囲を取得する
- (3) : 非`const`な`this`に対してキー`k`を透過的に検索し、合致する全ての要素を含む範囲を取得する
- (4) : `const`な`this`に対してキー`k`を透過的に検索し、合致する全ての要素を含む範囲を取得する

(3), (4)の透過的な検索は、`Pred::is_transparent`および`Hash::is_transparent`が定義される場合に有効になる機能であり、例として`unordered_map<string, int> m;`に対して`m.equal_range("key");`のように`string`型のキーを持つ連想コンテナの検索インタフェースに文字列リテラルを渡した際、`string`の一時オブジェクトが作られないようにできる。詳細は[`std::hash`](/reference/functional/hash.md)クラスのページを参照。


## パラメータ
- `x` : 比較されるキー値。`key_type` はメンバ型であり、`unordered_map` コンテナ内で `Key` の別名として定義される。ここで `Key` は最初のテンプレートパラメータである。
- `k` : 検索するキー。`key_type`と透過的に比較可能な型`K`型のキーである。


## テンプレートパラメータ制約
- (3), (4) : `Pred::is_transparent`型および`Hash::is_transparent`型が定義されていること


## 戻り値
合致する要素の範囲を表す `pair` オブジェクトを返す。`pair::first` は 範囲の下境界にあたり、`pair::second` は 範囲の上境界にあたる。

そのような要素がない場合には、[`make_pair`](/reference/utility/make_pair.md)`(`[`end`](end.md)`(),` [`end`](end.md)`())`を返す。

`iterator` はメンバ型であり `unordered_map` において双方向イテレータとして定義される。


## 計算量
- 平均： 定数時間
- 最悪： [`size`](size.md) について線形時間


## 備考
- [`unordered_set`](/reference/unordered_set/unordered_set.md) の場合には、等価なキーはたかだか1つであるため、[`find()`](find.md) ほど有用ではないと考えられる


## 例
```cpp example
#include <iostream>
#include <unordered_map>

int main()
{
  std::unordered_map<int,char> um;

  um.insert(std::make_pair(1,'a'));
  um.insert(std::make_pair(2,'b'));
  um.insert(std::make_pair(3,'c'));
  um.insert(std::make_pair(4,'d'));
  um.insert(std::make_pair(5,'e'));

  using it_t = std::unordered_map<int,char>::iterator;
  std::pair<it_t, it_t> ret = um.equal_range(3);

  std::cout << "low: " << ret.first->first << " " << ret.first->second << std::endl;
  std::cout << "up: " << ret.second->first << " " << ret.second->second << std::endl;

  std::pair<it_t, it_t> ret2 = um.equal_range(0);
  std::cout << "low:" << ( ret2.first == um.end() )  << std::endl;
  std::cout << "up:" << ( ret2.second == um.end() )  << std::endl;

  return 0;
}
```
* equal_range[color ff0000]
* um.insert[link insert.md]
* um.end()[link end.md]

### 出力
```
low: 3 c
up: 4 d
low:1
up:1
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 関連項目

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| [`count`](count.md) | 指定したキーにマッチする要素の数を返す |
| [`find`](find.md) | 指定したキーで要素を探す |


## 参照
- [P0919R3 Heterogeneous lookup for unordered containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0919r3.html)
