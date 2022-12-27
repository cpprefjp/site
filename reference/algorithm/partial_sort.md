# partial_sort
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void partial_sort(RandomAccessIterator first,
                    RandomAccessIterator middle,
                    RandomAccessIterator last);            // (1) C++03

  template <class RandomAccessIterator>
  constexpr void partial_sort(RandomAccessIterator first,
                              RandomAccessIterator middle,
                              RandomAccessIterator last);  // (1) C++20

  template <class RandomAccessIterator, class Compare>
  void partial_sort(RandomAccessIterator first,
                    RandomAccessIterator middle,
                    RandomAccessIterator last,
                    Compare comp);                         // (2) C++03

  template <class RandomAccessIterator, class Compare>
  constexpr void partial_sort(RandomAccessIterator first,
                              RandomAccessIterator middle,
                              RandomAccessIterator last,
                              Compare comp);               // (2) C++20

  template <class ExecutionPolicy, class RandomAccessIterator>
  void partial_sort(ExecutionPolicy&& exec,
                    RandomAccessIterator first,
                    RandomAccessIterator middle,
                    RandomAccessIterator last);            // (3) C++17

  template <class ExecutionPolicy, class RandomAccessIterator, class Compare>
  void partial_sort(ExecutionPolicy&& exec,
                    RandomAccessIterator first,
                    RandomAccessIterator middle,
                    RandomAccessIterator last,
                    Compare comp);                         // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`を部分的にソートし、先頭 `N` 個を順に並んだ状態にする。`N` は `middle - first` で決まる。

この関数は、「売り上げランキング トップ1位から10位まで」のように、全体ではなく最高順位から途中までの順位がわかればよい状況で、全体を並び替える[`sort()`](sort.md)関数の代わりに使用できる。

なお、トップ10がどれかわかれば十分である（1位から10位までは順不同でよい）ような場合、[`nth_element()`](nth_element.md)が使用できる。


## テンプレートパラメータ制約
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


## 効果
イテレータ範囲`[first,last)`にある要素の中から、`middle - first` 個の要素をソート済みの状態で `[first,middle)` に配置する。残りの `[middle,last)` にある要素は未規定の順序に配置される。


## 戻り値
なし


## 計算量
ほぼ `(last - first) * log(middle - first)` 回の比較を行う


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 先頭2要素を並んだ状態にする
  std::partial_sort(v.begin(), v.begin() + 2, v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::partial_sort[color ff0000]

### 出力
```
1
2
4
3
5
```


## 参照
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
