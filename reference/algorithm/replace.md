# replace
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator,
            class T>
  void
    replace(ForwardIterator first,
            ForwardIterator last,
            const T& old_value,
            const T& new_value);   // (1) C++03
  template <class ForwardIterator,
            class T>
  constexpr void
    replace(ForwardIterator first,
            ForwardIterator last,
            const T& old_value,
            const T& new_value);   // (1) C++20
  template <class ForwardIterator,
            class T = typename iterator_traits<ForwardIterator>::value_type>
  constexpr void
    replace(ForwardIterator first,
            ForwardIterator last,
            const T& old_value,
            const T& new_value);   // (1) C++26

  template <class ExecutionPolicy,
            class ForwardIterator,
            class T>
  void
    replace(ExecutionPolicy&& exec,
            ForwardIterator first,
            ForwardIterator last,
            const T& old_value,
            const T& new_value);   // (2) C++17
  template <class ExecutionPolicy,
            class ForwardIterator,
            class T = typename iterator_traits<ForwardIterator>::value_type>
  void
    replace(ExecutionPolicy&& exec,
            ForwardIterator first,
            ForwardIterator last,
            const T& old_value,
            const T& new_value);   // (2) C++26
}
```

## 概要
指定された値と一致する要素を指定された値に置き換える。


## 適格要件
`*first = new_value` という式が有効でなければならない。


## 効果
`[first,last)` 内のイテレータ `i` について、`*i == old_value` であるものは `*i = new_value` という式によって置き換えられる。


## 計算量
正確に `last - first` 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::replace(v.begin(), v.end(), {a, b}, {c, d});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 1 の要素を全部 10 に置き換える
  std::replace(v.begin(), v.end(), 1, 10);

  std::for_each(v.begin(), v.end(),
    [](int x) { std::cout << x << ","; });
}
```
* std::replace[color ff0000]

#### 出力
```
3,10,2,10,2,
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
};

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {5, 6},
    {1, 2},
  };

  // 値が{1, 2}の要素をすべて{9, 9}に置き換える
  std::replace(v.begin(), v.end(), {1, 2}, {9, 9});

  for (const Point& p : v) {
    std::cout << p.x << ',' << p.y << std::endl;
  }
}
```
* std::replace[color ff0000]

#### 出力
```
9,9
3,4
5,6
9,9
```


## 実装例
```cpp
template <class ForwardIterator, class T>
void replace(ForwardIterator first, ForwardIterator last,
             const T& old_value, const T& new_value) {
  for ( ; first != last; ++first)
    if (*first == old_value)
      *first = new_value;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
