# find
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr I
    find(I first,
         S last,
         const T& value,
         Proj proj = {}); // (1) C++20
  template <input_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr I
    find(I first,
         S last,
         const T& value,
         Proj proj = {}); // (1) C++26

  template <input_range R,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr borrowed_iterator_t<R>
    find(R&& r,
         const T& value,
         Proj proj = {}); // (2) C++20
  template <input_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr borrowed_iterator_t<R>
    find(R&& r,
         const T& value,
         Proj proj = {}); // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  I find(Ep&& exec,
         I first,
         S last,
         const T& value,
         Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  borrowed_iterator_t<R>
    find(Ep&& exec,
         R&& r,
         const T& value,
         Proj proj = {}); // (4) C++26
}
```
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
指定された値を検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
`[first,last)` あるいは `r` 内のイテレータ i について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` であるような最初のイテレータを返す。そのようなイテレータが見つからなかった場合は `last` を返す。

## 計算量
最大で `last - first` 回比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto it = std::ranges::find(r, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <array>

int main() {
  constexpr std::array v = { 3, 1, 4 };
  const auto result = std::ranges::find(v, 1);
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
```
* std::ranges::find[color ff0000]

#### 出力
```
found: 1
```

### 射影変換を使用した例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>

struct Item {
  int id;
  std::string name;
};

int main() {
  std::vector<Item> v = {
    {1, "aaa"},
	{3, "bbb"},
	{5, "ccc"}
  };

  // メンバ変数ポインタを使って特定のメンバ変数で検索
  {
    auto it = std::ranges::find(
      v,
      std::string("bbb"),
      &Item::name
    );
    if (it == v.end()) {
      std::cout << "not found" << std::endl;
    } else {
      std::cout << "found: " << it->id << ',' << it->name << std::endl;
    }
  }

  // ラムダ式で特定のメンバ変数を検索
  {
    auto it = std::ranges::find(
      v,
      std::string("bbb"),
      // コピーされないよう戻り値型を明示的に指定
      [](const Item& x) -> const std::string& { return x.name; }
    );
    if (it == v.end()) {
      std::cout << "not found" << std::endl;
    } else {
      std::cout << "found: " << it->id << ',' << it->name << std::endl;
    }
  } 
}
```
* std::ranges::find[color ff0000]

#### 出力
```
found: 3,bbb
found: 3,bbb
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

  auto it = std::ranges::find(v, {3, 4});
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << it->x << "," << it->y << std::endl;
  }
}
```
* std::ranges::find[color ff0000]

#### 出力
```
found: 3,4
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <execution>

int main() {
  std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

  // 並列に値を検索する
  auto it = std::ranges::find(std::execution::par, v, 5);
  if (it != v.end()) {
    std::cout << "found: " << *it << std::endl;
  }
}
```
* std::ranges::find[color ff0000]

#### 出力
```
found: 5
```

## 実装例
```cpp
struct find_impl {
  template<input_iterator I, sentinel_for<I> S, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr I operator()(I first, S last, const T& value, Proj proj = {}) const {
    for ( ; first != last; ++first)
      if (*first == value) return first;
    return last;
  }

  template<input_range R, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr borrowed_iterator_t<R> operator()(R&& r, const T& value, Proj proj = {}) const {
    return (*this)(begin(r), end(r), value, ref(proj));
  }
};

inline constexpr find_impl find;
```
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
