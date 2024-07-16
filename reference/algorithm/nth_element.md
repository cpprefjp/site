# nth_element
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void nth_element(RandomAccessIterator first,
                   RandomAccessIterator nth,
                   RandomAccessIterator last);           // (1) C++03

  template <class RandomAccessIterator>
  constexpr void nth_element(RandomAccessIterator first,
                             RandomAccessIterator nth,
                             RandomAccessIterator last); // (1) C++20

  template <class RandomAccessIterator, class Compare>
  void nth_element(RandomAccessIterator first,
                   RandomAccessIterator nth,
                   RandomAccessIterator last,
                   Compare comp);                        // (2) C++03

  template <class RandomAccessIterator, class Compare>
  constexpr void nth_element(RandomAccessIterator first,
                             RandomAccessIterator nth,
                             RandomAccessIterator last,
                             Compare comp);              // (2) C++20

  template <class ExecutionPolicy, class RandomAccessIterator>
  void nth_element(ExecutionPolicy&& exec,
                   RandomAccessIterator first,
                   RandomAccessIterator nth,
                   RandomAccessIterator last);           // (3) C++17

  template <class ExecutionPolicy, class RandomAccessIterator, class Compare>
  void nth_element(ExecutionPolicy&& exec,
                   RandomAccessIterator first,
                   RandomAccessIterator nth,
                   RandomAccessIterator last,
                   Compare comp);                        // (4) C++17
}
```

## 概要
基準となる要素よりも小さい要素が前に来るよう並べ替える。

この関数はイテレータ範囲 `[first,last)` の並び替えを行うが、基準位置 `nth` のみが正しい要素、つまり仮に範囲 `[first,last)` 全体を並び替えた際に`nth`に位置すべき要素となる。前半のイテレータ範囲 `[first,nth)` は関数呼び出し後の位置 `nth` にある要素よりも小さいことは保証されるが、そのイテレータ範囲 `[first,nth)` 内での要素並び順はなんら保証されない。

あるイテレータ範囲に対して部分的な並び替えを行う場合は、[`partial_sort()`](partial_sort.md)を使用する。また範囲全体に対して並び替えを行う場合は、[`sort()`](sort.md)を使用する。


## テンプレートパラメータ制約
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


## 効果
`nth_element()` を呼び出した後、`nth` が指している位置の要素は、全ての範囲がソートされた場合の位置にある要素になる。そして、`[first,nth)` にあるイテレータ `i` と、`[nth,last)` にあるイテレータ `j` について、`!(*j < *i)` または `comp(*j, *i) == false` になる。


## 戻り値
なし


## 計算量
- (1), (2) : 平均で線形時間
- (3), (4) : `N = last - first`であるとして、O(N)回だけ比較または述語の適用と、O(NlogN)回だけswap操作を行う


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {5, 10, 4, 7, 1, 9, 8, 6, 2};

  // 4番目に小さい値より小さい値を前に集める
  std::nth_element(v.begin(), v.begin() + 3, v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::nth_element[color ff0000]

### 出力例
```
2
1
4
5
10
9
8
6
7
```

## 参照
- [LWG Issue 2163. `nth_element` requires inconsistent post-conditions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2163)
    - C++11まで、この関数を呼び出したあとの状態について「`!(*i > *j)`」と記載していたが、並べ替えには`operator<()`を使用するので、C++14で「`!(*j < *i)`」に訂正。
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [P0574R1 Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
