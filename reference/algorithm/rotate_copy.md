# rotate_copy
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class OutputIterator>
  OutputIterator
    rotate_copy(ForwardIterator first,
                ForwardIterator middle,
                ForwardIterator last,
                OutputIterator result);   // (1) C++03

  template <class ForwardIterator, class OutputIterator>
  constexpr OutputIterator
    rotate_copy(ForwardIterator first,
                ForwardIterator middle,
                ForwardIterator last,
                OutputIterator result);   // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator2
    rotate_copy(ExecutionPolicy&& exec,
                ForwardIterator1 first,
                ForwardIterator1 middle,
                ForwardIterator1 last,
                ForwardIterator2 result); // (2) C++17
}
```

## 概要
`middle`の要素が先�、`middle-1`の要素が末尾となるように、`[first,last)`の要素の並びを回転させ、その結果を出力の範囲へコピーする。


## 要件
`[first,last)` と `[result,result + (last - first))` の範囲は重なっていてはならない。


## 効果
0 以上 `last - first` 未満の整数 `i` について、`*(result + i) = *(first + (i + (middle - first)) % (last - first))` という操作によって `[first,last)` の範囲を `[result,result + (last - first))` の範囲へコピーする


## 戻り値
回転前の先�の要素を指すイテレータ`result + (last - first)`


## 計算量
�確に `last - first` 回代入する。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>

int main() {
  std::string str = "rotate";
  std::string result;

  std::rotate_copy(str.begin(), str.begin() + 2, str.end(),
    std::back_inserter(result));

  std::cout << result << std::endl;
}
```
* std::rotate_copy[color ff0000]
* str.begin()[link /reference/string/basic_string/begin.md]
* str.end()[link /reference/string/basic_string/end.md]

### 出力
```
tatero
```


## 実装例
```cpp
template <class ForwardIterator, class OutputIterator>
OutputIterator rotate_copy(ForwardIterator first,
                           ForwardIterator middle,
                           ForwardIterator last,
                           OutputIterator result) {
  return std::copy(first, middle, std::copy(middle, last, result));
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
