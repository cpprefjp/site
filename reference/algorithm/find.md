# find
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator,
            class T>
  InputIterator
    find(InputIterator first,
         InputIterator last,
         const T& value);     // (1) C++03
  template <class InputIterator,
            class T>
  constexpr InputIterator
    find(InputIterator first,
         InputIterator last,
         const T& value);     // (1) C++20
  template <class InputIterator,
            class T = typename iterator_traits<InputIterator>::value_type>
  constexpr InputIterator
    find(InputIterator first,
         InputIterator last,
         const T& value);     // (1) C++26

  template<class ExecutionPolicy,
           class ForwardIterator,
           class T>
  ForwardIterator
    find(ExecutionPolicy&& exec,
         ForwardIterator first,
         ForwardIterator last,
         const T& value);   // (2) C++17
  template<class ExecutionPolicy,
           class ForwardIterator,
           class T = typename iterator_traits<InputIterator>::value_type>
  ForwardIterator
    find(ExecutionPolicy&& exec,
         ForwardIterator first,
         ForwardIterator last,
         const T& value);   // (2) C++26
}
```

## 概要
イテレータ範囲`[first, last)`から、指定された値を検索する。


## 戻り値
`[first,last)` 内のイテレータ i について、`*i == value` であるような最初のイテレータを返す。そのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
最大で `last - first` 回比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto it = std::find(v.begin(), v.end(), {a, b});
        ```

## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };
  auto result = std::find(v.begin(), v.end(), 1);
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
```
* std::find[color ff0000]

#### 出力
```
found: 1
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
	{5, 6}
  };

  auto it = std::find(v.begin(), v.end(), {3, 4});
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << it->x << "," << it->y << std::endl;
  }
}
```
* std::find[color ff0000]

#### 出力
```
found: 3,4
```


## 実装例
```cpp
template <class InputIterator, class T>
InputIterator find(InputIterator first, InputIterator last, const T& value) {
  for ( ; first != last; ++first)
    if (*first == value) return first;
  return last;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
