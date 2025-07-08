# sort
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void sort(RandomAccessIterator first,
            RandomAccessIterator last);           // (1) C++03

  template <class RandomAccessIterator>
  constexpr void sort(RandomAccessIterator first,
                      RandomAccessIterator last); // (1) C++20

  template <class RandomAccessIterator, class Compare>
  void sort(RandomAccessIterator first,
            RandomAccessIterator last,
            Compare comp);                        // (2) C++03

  template <class RandomAccessIterator, class Compare>
  constexpr void sort(RandomAccessIterator first,
                      RandomAccessIterator last,
                      Compare comp);              // (2) C++20

  template <class ExecutionPolicy, class RandomAccessIterator>
  void sort(ExecutionPolicy&& exec,
            RandomAccessIterator first,
            RandomAccessIterator last);           // (3) C++17

  template <class ExecutionPolicy, class RandomAccessIterator, class Compare>
  void sort(ExecutionPolicy&& exec,
            RandomAccessIterator first,
            RandomAccessIterator last,
            Compare comp);                        // (4) C++17
}
```

## 概要
イテレータ範囲`[first, last)`を並べ替える


## 要件
`RandomAccessIterator` は `ValueSwappable` の要求を満たしている必要がある。`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


## 効果
`[first,last)` の範囲をソートする


## 戻り値
なし


## 計算量
- C++03: 平均して約N log N (N == `last - first`) 回の比較
- C++11以降: O(N log N) (N == `last - first`) 回の比較


## 備考
- この関数には、特定のアルゴリズムで実装すべきという規定はない
- 実装のアルゴリズムとしては、クイックソートの改良版であるイントロソートが使われることが多い
- クイックソートは平均計算量がO(N log N)だが、最悪計算量がO(n<sup>2</sup>)である。そのため、C++03の計算量要件には合致するが、C++11の要件には合致しない


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
  std::sort(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
  std::cout << std::endl;

  // 降順に並べ替える
  std::sort(v.begin(), v.end(), [](int a, int b) {
    return a > b;
  });
  // こちらでもよい
  // std::sort(v.begin(), v.end(), std::greater<int>{});

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::sort[color ff0000]

#### 出力
```
1
2
3
4
5

5
4
3
2
1
```

### ユーザー定義型の配列を並べ替える (C++11)
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <tuple>
#include <algorithm>

// 要素がひとつの場合
struct MyInt {
  int value;
};

bool operator<(const MyInt& a, const MyInt& b) noexcept {
  return a.value < b.value;
}

// 要素が複数の場合
struct Person {
  int id;
  int age;
  std::string name;
};

struct PersonLess { // 大小比較用の関数オブジェクトを定義することもできる
  bool operator()(const Person& a, const Person& b) const noexcept {
    // キーとして比較したい要素を列挙する
    return std::tie(a.id, a.age, a.name) < std::tie(b.id, b.age, b.name);
  }
};

int main() {
  std::vector<MyInt> v1 {
    MyInt{3},
    MyInt{1},
    MyInt{2},
  };
  std::sort(v1.begin(), v1.end());

  std::vector<Person> v2 {
    Person{3, 30, "Carol"},
    Person{1, 18, "Alice"},
    Person{2, 30, "Bob"},
  };
  std::sort(v2.begin(), v2.end(), PersonLess{});

  for (const MyInt& x : v1) {
    std::cout << x.value << std::endl;
  }
  std::cout << std::endl;

  for (const Person& x : v2) {
    std::cout << x.name << std::endl;
  }
}
```
* std::sort[color ff0000]

#### 出力
```
1
2
3

Alice
Bob
Carol
```


### ユーザー定義型の配列を並べ替える (C++20)
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
  std::sort(v1.begin(), v1.end());

  std::vector<Person> v2 {
    Person{3, 30, "Carol"},
    Person{1, 18, "Alice"},
    Person{2, 30, "Bob"},
  };
  std::sort(v2.begin(), v2.end());

  for (const MyInt& x : v1) {
    std::cout << x.value << std::endl;
  }
  std::cout << std::endl;

  for (const Person& x : v2) {
    std::cout << x.name << std::endl;
  }
}
```
* std::sort[color ff0000]


## 関連項目
- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)

## 参照
- [LWG Issue 713. `sort()` complexity is too lax](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#713)
    - C++11で、イントロソートアルゴリズムを考慮して、計算量の規定が見直された経緯のレポート
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
