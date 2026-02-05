# find_last
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  constexpr ranges::subrange<I>
    find_last(I first,
              S last,
              const T& value,
              Proj proj = {}); // (1) C++23
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  constexpr ranges::subrange<I>
    find_last(I first,
              S last,
              const T& value,
              Proj proj = {}); // (1) C++26

  template <forward_range R,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr ranges::borrowed_subrange_t<R>
    find_last(R&& r,
              const T& value,
              Proj proj = {}); // (2) C++23
  template <forward_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr ranges::borrowed_subrange_t<R>
    find_last(R&& r,
              const T& value,
              Proj proj = {}); // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  ranges::subrange<I>
    find_last(Ep&& exec,
              I first,
              S last,
              const T& value,
              Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  ranges::borrowed_subrange_t<R>
    find_last(Ep&& exec,
              R&& r,
              const T& value,
              Proj proj = {}); // (4) C++26
}
```
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
指定された値を末尾から検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
`[first,last)` あるいは `r` 内のイテレータ i について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` であるような最後のイテレータ `i` を `ranges::subrange<I>{i, last}` として返す。そのようなイテレータが見つからなかった場合は `ranges::subrange<I>{last, last}` を返す。

## 計算量
最大で `last - first` 回比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        bool found = std::ranges::find_last(r, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <array>
#include <iostream>

int main() {
  constexpr std::array ar = { 3, 1, 4, 1, 5 };
  const std::ranges::subrange result = std::ranges::find_last(ar, 1);
  if (result.begin() == ar.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result.begin() << std::endl;
    std::cout << "  pos: " << std::distance(ar.begin(), result.begin()) << std::endl;
  }
}
```
* std::ranges::find_last[color ff0000]

#### 出力
```
found: 1
  pos: 3
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <array>
#include <iostream>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
};

std::ostream& operator<<(std::ostream& os, const Point& p) {
  return os << p.x << ',' << p.y;
}

int main() {
  constexpr std::array<Point, 3> ar = {{
    {1, 2},
	{3, 4},
	{5, 6}
  }};

  const std::ranges::subrange result = std::ranges::find_last(ar, {3, 4});
  if (result.begin() == ar.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result.begin() << std::endl;
    std::cout << "  pos: " << std::distance(ar.begin(), result.begin()) << std::endl;
  }
}
```
* std::ranges::find_last[color ff0000]

#### 出力
```
found: 3,4
  pos: 1
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 3, 5, 3, 7};

  // 並列に最後の3を検索
  auto result = std::ranges::find_last(std::execution::par, v, 3);

  if (!result.empty()) {
    std::cout << "found: " << *result.begin() << std::endl;
    std::cout << "position: " << (result.begin() - v.begin()) << std::endl;
  }
}
```
* std::ranges::find_last[color ff0000]

#### 出力
```
found: 3
position: 3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1223R5 `find_last`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1223r5.pdf)
- [P3217R0 Adjoints to "Enabling list-initialization for algorithms": `find_last`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3217r0.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
    - 関連文書：
        - [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
