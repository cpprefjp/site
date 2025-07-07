# unique
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_equivalence_relation<projected<I, Proj>> C = ranges::equal_to>
  constexpr subrange<I>
    unique(I first,
           S last,
           C comp = {},
           Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_equivalence_relation<projected<iterator_t<R>, Proj>> C = ranges::equal_to>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    unique(R&& r,
           C comp = {},
           Proj proj = {}); // (2) C++20
}
```
* permutable[link /reference/iterator/permutable.md]
* indirect_equivalence_relation[link /reference/iterator/indirect_equivalence_relation.md]


## 概要
重複した要素を除ける。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

この関数は、隣り合った重複要素を除いた要素を、範囲の先頭に集める。この関数によってコンテナから直接要素が削除され、コンテナの要素数が減るようなことはない。コンテナから実際に要素を削除する場合は、この関数の戻り値として、先頭に集められた重複なし範囲の末尾の次を指すイテレータが返るため、そのイテレータを介してコンテナの`erase()`メンバ関数などを呼び出し、削除を行うこと。

この関数の戻り値として返されるイテレータ以降の値は未規定。


## 効果
`[first,last)` が空の範囲でない場合、`[first + 1,last)` 内のイテレータ `i` について、

- (1) では`*(i - 1) == *i`
- (2) では`pred(*(i - 1), *i) != false`

による等値の比較によって連続したグループに分け、それぞれのグループの先頭以外を取り除く。


## 戻り値
`j`を重複を除いた範囲の末尾の次を指すイテレータとするとき、`{j, last}`


## 計算量
`[first,last)` が空の範囲でない場合、正確に `last - first - 1` 回の比較または述語の適用を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

void print(const char* tag, const std::vector<int>& v) {
  std::cout << tag << " : ";
  bool first = true;
  for (int x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << std::endl;
}

int main() {
  // 入力の配列がソート済みではない場合、
  // 隣り合った重複要素が取り除かれる
  {
    std::vector<int> v = {2, 5, 3, 3, 1, 2, 4, 2, 1, 1, 4, 4, 3, 3, 3};

    auto result = std::ranges::unique(v);

    // [v.begin(), result.begin())の範囲に、重複を除いた結果が入っている。
    // 不要になった要素を削除
    v.erase(result.begin(), result.end());

    print("unsorted unique", v);
  }

  // 入力の配列がソート済みである場合、
  // 重複している全ての要素が取り除かれて一意になる
  {
    std::vector<int> v = {2, 5, 3, 3, 1, 2, 4, 2, 1, 1, 4, 4, 3, 3, 3};

    std::sort(v.begin(), v.end());
    auto result = std::ranges::unique(v);

    // 不要になった要素を削除
    v.erase(result.begin(), result.end());

    print("sorted unique", v);
  }
}
```
* std::ranges::unique[color ff0000]
* v.erase[link /reference/vector/vector/erase.md]

### 出力
```
unsorted unique : 2,5,3,1,2,4,2,1,4,3
sorted unique : 1,2,3,4,5
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
