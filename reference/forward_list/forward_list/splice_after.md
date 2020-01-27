# splice_after
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void splice_after(const_iterator position, forward_list& x);  // (1)
void splice_after(const_iterator position, forward_list&& x); // (2)

void splice_after(const_iterator position, forward_list& x,
                  const_iterator i);                          // (3)

void splice_after(const_iterator position, forward_list&& x,
                  const_iterator i);                          // (4)

void splice_after(const_iterator position, forward_list& x,
                  const_iterator first, const_iterator last); // (5)

void splice_after(const_iterator position, forward_list&& x,
                  const_iterator first, const_iterator last); // (6)

```

## 概要
他のコンテナから要素を移動する。


## 要件
- 第1パラメータ`position`が、[`before_begin()`](before_begin.md)もしくは`[`[`begin()`](begin.md)`,` [`end()`](end.md)]の範囲の間接参照可能なイテレータであること。
- `i`, `first`, `last`が、`x`のイテレータであること。
- [`get_allocator()`](get_allocator.md) `== x.`[`get_allocator()`](get_allocator.md)であること。(C++14)


## 効果
- (1) : `position`の次の要素の後ろに`x`の全ての要素をコピーする
- (2) : `position`の次の要素の後ろに`x`の全ての要素を移動する
- (3) : `position`の次の要素の後ろに、`x`の要素のうち`i`の次の要素をコピーする
- (4) : `position`の次の要素の後ろに、`x`の要素のうち`i`の次の要素を移動する
- (5) : `position`の次の要素の後ろに、`x`の要素のうち`(first, last)`の範囲をコピーする
- (6) : `position`の次の要素の後ろに、`x`の要素のうち`(first, last)`の範囲を移動する


## 戻り値
なし


## 例外
- (1) : 投げない
- (2) : 投げない
- (3) : 投げない
- (4) : 投げない


## 計算量
- (1), (2) : `x`の要素数に対して線形時間
- (3), (4) : 定数時間
- (5), (6) : `(first, last)`の要素数に対して線形時間


## 備考
- (1), (2) : この関数を呼び出したあとも、`x`の各要素へのポインタ、参照、イテレータは有効である。ただし、そのポインタと参照は、`x`ではなく`*this`の要素となる。
- (3), (4) : この関数を呼び出したあとも、`*++i`へのポインタ、参照、イテレータは有効である。ただし、そのポインタと参照は、`x`ではなく`*this`の要素となる。
- (5), (6) : この関数を呼び出したあとも、`(first, last)`の各要素へのポインタ、参照、イテレータは有効である。ただし、そのポインタと参照は、`x`ではなく`*this`の要素となる。


## 例
```cpp example
#include <iostream>
#include <forward_list>
#include <utility>
#include <iterator>

template <class T>
void print(const std::forward_list<T>& ls)
{
  for (const T& x : ls) { std::cout << x << ' '; }
  std::cout << std::endl;
}

int main()
{
  // ysの全ての要素をxsに移動する
  {
    std::forward_list<int> xs = {1, 5, 6};
    std::forward_list<int> ys = {2, 3, 4};

    xs.splice_after(xs.begin(), std::move(ys));

    print(xs);
  }
  // ysのうち、3だけを移動する
  {
    std::forward_list<int> xs = {1, 5, 6};
    std::forward_list<int> ys = {2, 3, 4};

    xs.splice_after(xs.begin(), std::move(ys), ys.begin());

    print(xs);
  }
  // ysのうち、2と3だけを移動する
  {
    std::forward_list<int> xs = {1, 5, 6};
    std::forward_list<int> ys = {2, 3, 4};

    xs.splice_after(xs.begin(), std::move(ys), ys.before_begin(), std::next(ys.begin(), 2));

    print(xs);
  }
}
```
* splice_after[color ff0000]
* begin()[link begin.md]
* end()[link end.md]
* std::move[link /reference/utility/move.md]
* std::next[link /reference/iterator/next.md]

### 出力
```
1 2 3 4 5 6 
1 3 5 6 
1 2 3 5 6 
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0(右辺値参照バージョンのみ実装されている)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2045. `forward_list::merge` and `forward_list::splice_after` with unequal allocators](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2045)
- [LWG Issue 2222. Inconsistency in description of `forward_list::splice_after` single-element overload](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2222)
	- (3)と(4)のオーバー�ードについて、有効性が継続される対象が、`*i`となっていたが、`*++i`の間違いであったため、C++14で修�された。

