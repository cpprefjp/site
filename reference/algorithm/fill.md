# fill
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator, class T>
  void fill(ForwardIterator first,
            ForwardIterator last,
            const T& value);                  // (1) C++03

  template <class ForwardIterator, class T>
  constexpr void fill(ForwardIterator first,
                      ForwardIterator last,
                      const T& value);        // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator,
            class T>
  void fill(ExecutionPolicy&& exec,
            ForwardIterator first,
            ForwardIterator last,
            const T& value);                  // (2) C++17
}
```

## 概要
イテレータ範囲`[first, last)`のすべての要素に指定された値を書き込む。


## 要件
`value` は `output iterator` へ書き込み可能でなければならない


## 効果
`[first,last)` 内の全ての要素に `value` を代入する


## 計算量
正確に `last - first` 回の代入を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v(5);

  // v を 3 の値で埋める
  std::fill(v.begin(), v.end(), 3);

  std::for_each(v.begin(), v.end(), [](int x) { std::cout << x << ","; });
}
```
* std::fill[color ff0000]

### 出力
```
3,3,3,3,3,
```


## 実装例
```cpp
template <class ForwardIterator, class T>
void fill(ForwardIterator first, ForwardIterator last, const T& value) {
  while (first != last)
    *first++ = value;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
