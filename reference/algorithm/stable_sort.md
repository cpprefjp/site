# stable_sort
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void stable_sort(RandomAccessIterator first,
                   RandomAccessIterator last);  // (1) C++03
  template <class RandomAccessIterator>
  constexpr
  void stable_sort(RandomAccessIterator first,
                   RandomAccessIterator last);  // (1) C++26

  template <class RandomAccessIterator, class Compare>
  void stable_sort(RandomAccessIterator first,
                   RandomAccessIterator last,
                   Compare comp);              // (2) C++03
  template <class RandomAccessIterator, class Compare>
  constexpr
  void stable_sort(RandomAccessIterator first,
                   RandomAccessIterator last,
                   Compare comp);              // (2) C++26

  template<class ExecutionPolicy, class RandomAccessIterator>
  void stable_sort(ExecutionPolicy&& exec,
                   RandomAccessIterator first,
                   RandomAccessIterator last); // (3) C++17

  template <class ExecutionPolicy, class RandomAccessIterator, class Compare>
  void stable_sort(ExecutionPolicy&& exec,
                   RandomAccessIterator first,
                   RandomAccessIterator last,
                   Compare comp);              // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`を安定ソートで並べ替える


## テンプレートパラメータ制約
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしていること
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


## 効果
`[first,last)` の範囲をソートする


## 戻り値
なし


## 計算量
最大で N log^2(N) （N == `last - first`）回の比較を行う。ただし、十分なメモリがあれば N log(N) になる。


## 備考
同じ値が複数あった場合に、ソート前の位置関係が保たれる、「安定ソート」を行う。
一般的なマージソートで実装される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 並べ替える
  std::stable_sort(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::stable_sort[color ff0000]

### 出力
```
1
2
3
4
5
```


## 参照
- [P2562R1 `constexpr` Stable Sorting](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2562r1.pdf)
    - C++26から`constexpr`に対応した
