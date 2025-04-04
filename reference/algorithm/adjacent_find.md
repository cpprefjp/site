# adjacent_find
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last); // (1) C++03

  template <class ForwardIterator>
  constexpr ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last); // (1) C++20

  template <class ForwardIterator, class BinaryPredicate>
  ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last,
                  BinaryPredicate pred); // (2) C++03

  template <class ForwardIterator, class BinaryPredicate>
  constexpr ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last,
                  BinaryPredicate pred); // (2) C++20

  template<class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    adjacent_find(ExecutionPolicy&& exec,
                  ForwardIterator first,
                  ForwardIterator last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class BinaryPredicate>
  ForwardIterator
    adjacent_find(ExecutionPolicy&& exec,
                  ForwardIterator first,
                  ForwardIterator last,
                  BinaryPredicate pred); // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`から、隣接する要素で条件を満たしている最初の要素を検索する。

このアルゴリズムは、範囲の先頭から1つづつ進みながら隣接するペアに対して条件を満たすかをチェックし、その条件を満たす最初の要素へのイテレータを返す。指定された条件を満たしているかをチェックされるのは、現在位置にある要素とその次の位置にある要素の2つについてであり、1つの要素は最大2回参照される。

整数の配列`{1, 3, 3, 5, 0, 4, 5, 2}`を入力、指定された条件`pred`を[`std::greater<void>`](/reference/functional/greater.md)とした時の、チェックされる要素の様子

```
|0  1  2  3  4  5  6  7| : index
[1, 3, 3, 5, 0, 4, 5, 2] : input range
[1, 3] <- pred(1, 3) == false
   [3, 3] <- pred(3, 3) == false
      [3, 5] <- pred(3, 5) == false
         [5, 0] <- pred(5, 0) == true
            [0, 4]
               [4, 5]
                  [5, 2]
```

この時、最初に条件を満たしたペアの左側の要素に対応するイテレータを返す。この例の場合、返される要素のイテレータは元の範囲で3番目の要素（0-indexed）であり、その値は`5`である。

## 戻り値
`[first,last)` 内にあるイテレータ i について、`*i == *(i + 1)` もしくは `pred(*i, *(i + 1)) != false` であるような最初のイテレータを返す。

もしそのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
- (1), (2) : 与えられたシーケンスが空でない場合、正確に [`min`](/reference/algorithm/min.md)`((i - first) + 1, (last - first) - 1)` 回（`i` は `adjacent_find` の戻り値）の比較または述語が適用される
- (3), (4) : O`(last - first)`の計算量の回数だけ比較または述語が適用される


## 例
```cpp example
#include <algorithm>
#include <iterator>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2 };

  // 同じ値が連続している最初の要素を検索する
  auto it = std::adjacent_find(v.begin(), v.end());
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
    std::cout << std::boolalpha << "*it == *(it+1): " << (*it == *(it+1)) << std::endl;
  }
}
```
* adjacent_find[color ff0000]

### 出力
```
found: index==2
*it == *(it+1): true
```

### 動作イメージ

```
|0  1  2  3  4  5  6| : index
[1, 4, 3, 3, 1, 2, 2] : input range
[1, 4]
   [4, 3]
      [3, 3] <- pred(3, 3) == true
         [3, 1]
            [1, 2]
               [2, 2]
```

## 実装例
```cpp
template <class ForwardIterator>
ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last)
{
  if (first == last)
    return last;

  ForwardIterator next = first;
  ++next;
  for ( ; next != last; ++next, ++first)
    if (*first == *next)
      return first;
  return last;
}

template <class ForwardIterator, class BinaryPredicate>
ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last, BinaryPredicate pred)
{
  if (first == last)
    return last;

  ForwardIterator next = first;
  ++next;

  for ( ; next != last; ++next, ++first)
    if (pred(*first, *next))
      return first;
  return last;
}
```

## バージョン
### 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 14.0.6 [mark verified]
- [GCC](/implementation.md#gcc): 9.5.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0574R1 Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
