#merge (C++11)
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]

```cpp
void merge(forward_list& x);
void merge(forward_list&& x);
template <class Compare> void merge(forward_list& x, Compare comp);
template <class Compare> void merge(forward_list&& x, Compare comp);
```

##概要
2つの`forward_list`オブジェクトを併合する。


##要件
`comp`が[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)として定義されていること。`*this`と`x`がその順序でソートされていること。


##効果
2つのソート済み範囲`[begin(), end())`と`[x.begin(), x.end())`をマージする。2つの`forward_list`オブジェクトの要素を`*this`に併合し、`x`はマージ後に空となる。

マージ後、`x`の要素に対するイテレータおよび参照は無効にならない。


##戻り値
なし


##例外
比較操作が例外を投げない場合、この関数は例外を投げない。


##計算量
高々[`distance`](/reference/iterator/distance.md)`(`[`begin`](./begin.md)()`, `[`end`](./end.md)`()) + `[`distance`](/reference/iterator/distance.md)`(x.`[`begin`](./begin.md)`(), x.`[`end`](./end.md)`()) - 1`回の比較


##備考
この操作は安定である。


##例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> a = {1, 3, 4};
  std::forward_list<int> b = {2, 5, 6};

  a.merge(std::move(b));

  for (int x : a) {
    std::cout << x << std::endl;
  }
}
```
* merge[color ff0000]

###出力
```
1
2
3
4
5
6
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0(&&バージョンのみ実装されている)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??

##参照
- [LWG Issue 2122. `merge()` stability for lists versus forward lists](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2122)

