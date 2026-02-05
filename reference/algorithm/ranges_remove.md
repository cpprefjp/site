# remove
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr subrange<I>
    remove(I first,
           S last,
           const T& value,
           Proj proj = {}); // (1) C++20
  template <permutable I,
            sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr subrange<I>
    remove(I first,
           S last,
           const T& value,
           Proj proj = {}); // (1) C++26

  template <forward_range R,
            class T,
            class Proj = identity>
    requires permutable<iterator_t<R>> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr borrowed_subrange_t<R>
    remove(R&& r,
           const T& value,
           Proj proj = {}); // (2) C++20
  template <forward_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires permutable<iterator_t<R>> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr borrowed_subrange_t<R>
    remove(R&& r,
           const T& value,
           Proj proj = {}); // (2) C++26

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires permutable<I> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  subrange<I>
    remove(Ep&& exec,
           I first,
           S last,
           const T& value,
           Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class T,
            class Proj = identity>
    requires permutable<iterator_t<R>> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  borrowed_subrange_t<R>
    remove(Ep&& exec,
           R&& r,
           const T& value,
           Proj proj = {}); // (4) C++26
}
```
* permutable[link /reference/iterator/permutable.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
指定された要素を取り除く。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 効果
`[first,last)` 内にあるイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` である要素を取り除き、有効な要素を範囲の前に寄せる。


## 戻り値
`j` を有効な要素の末尾の次を指すイテレータとすると、 `{j, last}`


## 計算量
正確に `last - first` 回の比較を行う


## 注意
安定。


## 備考
- 有効な要素を範囲の前方に集める処理には、ムーブが使用される
    - 取り除いた要素の先頭を指すイテレータを`ret`とし、範囲`[ret, last)`の各要素には、有効な要素からムーブされた値が設定される。それらの値は、「有効だが未規定な値」となる
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto sr = std::ranges::remove(v, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  auto result = std::ranges::remove(v, 1);

  // [v.begin(), result.begin()) の範囲に 1 を除去した結果が入っている
  for (int x : std::ranges::subrange {v.begin(), result.begin()}) {
    std::cout << x << ",";
  }
  std::cout << std::endl;

  // remove を使ってもコンテナの要素数は変わらないことに注意しよう
  std::cout << "size before: " << v.size() << std::endl;

  // [v.begin(), result.begin()) の範囲に 1 を除去した結果が入っているので、
  // [result.begin(),v.end()) を erase することでサイズも変更することができる
  // （Erase-remove イディオム）
  v.erase(result.begin(), v.end());
  std::cout << "size after: " << v.size() << std::endl;
}
```
* result[color ff0000]
* std::ranges::remove[color ff0000]
* v.erase[link /reference/vector/vector/erase.md]
* std::ranges::subrange[link /reference/ranges/subrange.md]
* Erase-remove イディオム[link https://ja.wikibooks.org/wiki/More_C%2B%2B_Idioms/%E6%B6%88%E5%8E%BB%E3%83%BB%E5%89%8A%E9%99%A4(Erase-Remove)]

#### 出力
```
2,3,2,
size before: 5
size after: 3
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

  // 値{1, 2}を除去する
  std::ranges::subrange sr = std::ranges::remove(v, {1, 2});
  v.erase(sr.begin(), v.end());

  for (const Point& p : v) {
    std::cout << p.x << "," << p.y << std::endl;
  }
}
```
* std::ranges::remove[color ff0000]
* v.erase[link /reference/vector/vector/erase.md]
* std::ranges::subrange[link /reference/ranges/subrange.md]

#### 出力
```
3,4
5,6
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <execution>

int main() {
  std::vector<int> v = {1, 2, 3, 2, 5, 2, 7};

  // 並列に値2を除去する
  auto result = std::ranges::remove(std::execution::par, v, 2);
  v.erase(result.begin(), result.end());

  for (int x : v) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::remove[color ff0000]
* v.erase[link /reference/vector/vector/erase.md]

#### 出力
```
1 3 5 7
```

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
