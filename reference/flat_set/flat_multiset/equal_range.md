# equal_range
* flat_set[meta header]
* std[meta namespace]
* flat_multiset[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
pair<iterator, iterator>
  equal_range(const key_type& x); // (1) C++23
constexpr pair<iterator, iterator>
  equal_range(const key_type& x); // (1) C++26

template <class K>
pair<iterator, iterator>
  equal_range(const K& x); // (2) C++23
template <class K>
constexpr pair<iterator, iterator>
  equal_range(const K& x); // (2) C++26

pair<const_iterator, const_iterator>
  equal_range(const key_type& x) const; // (3) C++23
constexpr pair<const_iterator, const_iterator>
  equal_range(const key_type& x) const; // (3) C++26

template <class K>
pair<const_iterator, const_iterator>
  equal_range(const K& x) const; // (4) C++23
template <class K>
constexpr pair<const_iterator, const_iterator>
  equal_range(const K& x) const; // (4) C++26
```

## 概要
コンテナ内の、`x` と等しいキー要素を全て含む範囲の境界を返す。 

もし `x` がコンテナ内のどのキーともマッチしなかった場合、戻り値の範囲は長さ 0 になり、両方のイテレータは `x` より大きく最も近い値を指す。そうでない場合、`x` がコンテナ内の全ての要素よりも大きい場合は [`end()`](end.md) を指す。

- (1) : `key_type`型のキーを受け取り、そのキーと等価なキー要素を全て含むイテレータ範囲を取得する。
- (2) : `key_type`と比較可能な`K`型のキーを受け取り、そのキーと等価なキー要素を全て含むイテレータ範囲を取得する。
- (3) : `const`な`*this`オブジェクトにおいて、`key_type`型のキーを受け取り、そのキーと等価なキー要素を全て含むイテレータ範囲を取得する。
- (4) : `const`な`*this`オブジェクトにおいて、`key_type`と比較可能な`K`型のキーを受け取り、そのキーと等価なキー要素を全て含むイテレータ範囲を取得する。


## 戻り値
この関数は `pair` を返す。ここで `pair::first` は [`lower_bound()`](lower_bound.md)`(x)` が返すであろう値と同じ値で範囲の下境界にあたり、`pair::second` は [`upper_bound()`](upper_bound.md)`(x)` が返すであろう値と同じ値で範囲の上境界にあたる。


## 計算量
[`size()`](size.md) について対数時間。


## 備考
- (2), (4) : この関数がオーバーロード解決に参加する条件は、[`find()`](find.md)メンバ関数の備考欄を参照。


## 例
```cpp example
#include <flat_set>
#include <iostream>
#include <string>

int main()
{
  std::flat_multiset<int> fs = {3, 1, 4, 1, 3};

  using iterator = decltype(fs)::iterator;
  std::pair<iterator, iterator> ret = fs.equal_range(3);

  for (iterator it = ret.first; it != ret.second; ++it) {
    std::cout << *it << std::endl;
  }
}
```
* equal_range[color ff0000]

### 出力
```
3
3
```


## バージョン
### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
| 名前 | 説明 |
|------------------------------------------------|----------------------------------------------------------|
| [`flat_multiset::count`](count.md)             | 指定したキーにマッチする要素の数を返す                   |
| [`flat_multiset::lower_bound`](lower_bound.md) | 与えられた値より小さくない最初の要素へのイテレータを返す |
| [`flat_multiset::upper_bound`](upper_bound.md) | 特定の値よりも大きい最初の要素へのイテレータを返す       |
| [`flat_multiset::find`](find.md)               | 指定したキーで要素を探す                                 |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
