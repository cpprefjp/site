#merge
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void merge(list& x);  // (1)
void merge(list&& x); // (2) C++11
template <class Compare> void merge(list& x, Compare comp);  // (3)
template <class Compare> void merge(list&& x, Compare comp); // (4) C++11
```

##概要
2つの`list`オブジェクトを併合する。


##要件
`comp`が[狭義の弱順序](/reference/algorithm.md#strict-weak-ordering)として定義されていること。`*this`と`x`がその順序でソートされていること。


##効果
`x`を`*this`にマージする。2つの`list`オブジェクトの要素を`*this`に併合し、`x`はマージ後に空となる。  
マージ後、`x`の要素に対するイテレータおよび参照は無効にならない。


##戻り値
なし


##例外
比較操作が例外を投げない場合、この関数は例外を投げない。


##計算量
高々[`distance`](/reference/iterator/distance.md)`(`[`begin`](begin.md)()`,` [`end`](end.md)`()) +` [`distance`](/reference/iterator/distance.md)`(x.`[`begin`](begin.md)`(), x.`[`end`](end.md)`()) - 1`回の比較


##備考
- この操作は安定である。
- 移動先と移動元のアロケータが等値でない場合(`get_allocator() != x.get_allocator()`の場合)、この関数呼び出しの効果は未定義である。


##例
```cpp
#include <iostream>
#include <list>

int main()
{
  std::list<int> a = {1, 3, 4};
  std::list<int> b = {2, 5, 6};

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


