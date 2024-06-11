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
}
```
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::less[link /reference/functional/ranges_less.md]
* identity[link /reference/functional/identity.md]
* sortable[link /reference/iterator/sortable.md]
* random_access_range[link /reference/ranges/random_access_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
範囲を並べ替える

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

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
