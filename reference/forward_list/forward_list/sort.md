# sort
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void sort();
template <class Compare> void sort(Compare comp);
```

## 概要
コンテナを並べ替える


## 要件
型`T`の`operator<`もしくは`comp`が、[�義の弱順序](/reference/algorithm.md#strict-weak-ordering)で定義されること。


## 効果
型`T`の`operator<`もしくは`comp`に基いてコンテナの要素を並べ替える。

この操作は、イテレータと参照の有効性に影響しない。


## 戻り値
なし


## 計算量
[`distance`](/reference/iterator/distance.md)([`begin`](/reference/forward_list/forward_list/begin.md)`(),` [`end`](/reference/forward_list/forward_list/end.md)`())`を`N`として、約`N logN`回の比較


## 備考
この操作は安定である。同値要素の順序は保持される。


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {2, 1, 3};

  ls.sort();

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* sort()[color ff0000]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 参照
- [LWG Issue 2122. `merge()` stability for lists versus forward lists](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2122)


