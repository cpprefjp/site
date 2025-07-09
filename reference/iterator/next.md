# next
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator next(ForwardIterator x,
                       typename std::iterator_traits<ForwardIterator>::difference_type n = 1);  // C++11

  template <class InputIterator>
  constexpr InputIterator next(InputIterator x,
                     typename std::iterator_traits<InputIterator>::difference_type n = 1);      // C++17
}
```

## 概要
`n`回前方に進めたイテレータを返す。

[`advance()`](/reference/iterator/advance.md)と違い、引数として渡されたイテレータへの参照を書き換えるのではなく、`n`回進んだイテレータのコピーを返す。


## 効果
```cpp
advance(x, n);
return x;
```
* advance[link advance.md]


## 戻り値
引数として渡されたイテレータを`n`回前方に進めたイテレータのコピー


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4, 5, 2};

  {
    decltype(v)::iterator it = std::next(v.begin()); // イテレータを1回進める
    std::cout << *it << std::endl;
  }
  {
    decltype(v)::iterator it = std::next(v.begin(), 2); // イテレータを2回進める
    std::cout << *it << std::endl;
  }
}
```
* std::next[color ff0000]

### 出力
```
1
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目

| 名前                      | 説明                              |
|---------------------------|-----------------------------------|
| [`prev()`](prev.md)       | `n`回後方に進めたイテレータを返す |
| [`advance()`](advance.md) | `n`回イテレータを進める           |


## 参照
- [boost::next() - Boost Utility Library](http://www.boost.org/doc/libs/release/libs/utility/utility.htm#functions_next_prior)
- [N2246 2 of the least crazy ideas for the standard library in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2246.html)
- [LWG Issue 2353. `std::next` is over-constrained](https://wg21.cmeerw.net/lwg/issue2353)
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
