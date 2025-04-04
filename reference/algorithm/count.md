# count
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator, class T>
  typename iterator_traits<InputIterator>::difference_type
    count(InputIterator first,
          InputIterator last,
          const T& value);     // (1) C++03

  template <class InputIterator, class T>
  constexpr typename iterator_traits<InputIterator>::difference_type
    count(InputIterator first,
          InputIterator last,
          const T& value);     // (1) C++20

  template<class ExecutionPolicy, class ForwardIterator, class T>
  typename iterator_traits<ForwardIterator>::difference_type
    count(ExecutionPolicy&& exec,
          ForwardIterator first,
          ForwardIterator last,
          const T& value);     // (2) C++17
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
イテレータ範囲`[first, last)`から、指定された値と等値な要素の数を数える。


## 戻り値
イテレータ範囲`[first,last)` 内のイテレータ `i` について、`*i == value` であるイテレータの数を返す


## 計算量
正確に `last - first` 回の比較を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2,1 };

  // 値が 1 の要素がいくつあるかを数える
  std::cout << "count of 1: " << std::count(v.begin(), v.end(), 1) << std::endl;
}
```
* std::count[color ff0000]

### 出力
```
count of 1: 3
```


## 実装例
```cpp
template <class InputIterator, class T>
typename iterator_traits<InputIterator>::difference_type
  count(InputIterator first, InputIterator last, const T& value) {
  typename iterator_traits<InputIterator>::difference_type ret = 0;
  for ( ; first != last; ++first)
    if (value == *first) ret++;
  return ret;
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
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
