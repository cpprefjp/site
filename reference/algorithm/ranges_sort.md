# sort
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <random_access_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr I
    sort(I first,
         S last,
         Comp comp = {},
         Proj proj = {}); // (1) C++20

  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    sort(R&& r,
         Comp comp = {},
         Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  I sort(Ep&& exec,
         I first,
         S last,
         Comp comp = {},
         Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  borrowed_iterator_t<R>
    sort(Ep&& exec,
         R&& r,
         Comp comp = {},
         Proj proj = {}); // (4) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
範囲を並べ替える

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 効果
`[first,last)` の範囲をソートする

## 戻り値
`last`

## 計算量
- O(N log N) (N == `last - first`) 回の比較

## 備考
- この関数には、特定のアルゴリズムで実装すべきという規定はない
- 実装のアルゴリズムとしては、クイックソートの改良版であるイントロソートが使われることが多い

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 昇順に並べ替える
  std::ranges::sort(v);

  for (int i : v) {
    std::cout << i;
  }
  std::cout << std::endl;

  // 降順に並べ替える
  std::ranges::sort(v, std::ranges::greater());

  for (int i : v) {
    std::cout << i;
  }
  std::cout << std::endl;
}
```
* std::ranges::sort[color ff0000]

#### 出力
```
12345
54321
```

### ユーザー定義型の配列を並べ替える
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

// 要素がひとつの場合
struct MyInt {
  int value;

  friend auto operator<=>(const MyInt&, const MyInt&) = default;
};

// 要素が複数の場合
struct Person {
  int id;
  int age;
  std::string name;

  friend auto operator<=>(const Person&, const Person&) = default;
};

int main() {
  std::vector<MyInt> v1 {
    MyInt{3},
    MyInt{1},
    MyInt{2},
  };
  std::ranges::sort(v1);

  std::vector<Person> v2 {
    Person{3, 30, "Carol"},
    Person{1, 18, "Alice"},
    Person{2, 32, "Bob"},
  };
  std::ranges::sort(v2);

  std::vector<Person> v3 {
    Person{3, 30, "Carol"},
    Person{1, 18, "Alice"},
    Person{2, 32, "Bob"},
  };
  // 特定のメンバでソート
  std::ranges::sort(v3, {}, &Person::age);

  for (const MyInt& x : v1) {
    std::cout << x.value << std::endl;
  }
  std::cout << std::endl;

  for (const Person& x : v2) {
    std::cout << x.name << std::endl;
  }
  std::cout << std::endl;

  for (const Person& x : v3) {
    std::cout << x.name << std::endl;
  }
}
```
* std::ranges::sort[color ff0000]

#### 出力
```
1
2
3

Alice
Bob
Carol

Alice
Carol
Bob
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};

  // 並列ソート
  std::ranges::sort(std::execution::par, v);

  for (int i : v) {
    std::cout << i << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::sort[color ff0000]

#### 出力
```
1 1 2 3 3 4 5 5 5 6 9
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
