# shift_right
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S>
  constexpr subrange<I>
    shift_right(I first,
                S last,
                iter_difference_t<I> n); // (1) C++23

  template <forward_range R>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    shift_right(R&& r,
                range_difference_t<R> n); // (2) C++23

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S>
    requires permutable<I>
  subrange<I>
    shift_right(Ep&& exec,
                I first,
                S last,
                iter_difference_t<I> n); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R>
    requires permutable<iterator_t<R>>
  borrowed_subrange_t<R>
    shift_right(Ep&& exec,
                R&& r,
                range_difference_t<R> n); // (4) C++26
}
```
* permutable[link /reference/iterator/permutable.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]


## 概要
範囲の要素をn個だけ右にシフトさせる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

この関数に符号付き整数型のシフト数として、0および負数を指定した場合はなにもしない。

この関数によって要素をn個だけ右にシフトすると、`[first, first + n)`の範囲は、ムーブされたあとの「使用してはいけないオブジェクト」となる。その範囲には、循環バッファ (circular buffer) のように新たな要素を代入するか、コンテナの`erase()`メンバ関数を使用して使わなくなった範囲を削除するなどの対応が必要になる。


## 事前条件
`n >= 0`


## 効果
- `n == 0`である場合、なにもしない
- `n >= last - first`である場合、なにもしない
- `i < (last - first) - n`である非負の各`i`について、`first + i`位置の要素を`first + n + i`位置にムーブする
    - (1)では、`I`型が[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルとなる場合は、`i = (last - first) - n - 1`から`i = 0`の順に処理する


## 戻り値
`new_first`を次のように定義する。

- `n < last - first`である場合、`first + n`
- そうでなければ、`last`

このとき、 `{new_first, last}`

## 計算量
最大で`(last - first) - n`回の代入もしくはswap操作を行う


## 備考
- シフト数として負数を指定することはできないが、この関数には符号付き整数型を指定することとなっている。これは、Bidirectional Iterator向けの最適化した実装をする場合に[`std::prev()`](/reference/iterator/prev.md)関数を使用するため、そちらのパラメータ型と合わせたことによる
- [`shift_left()`](ranges_shift_left.md)と`shift_right()`で関数が分かれているのは、コンパイルしたコードサイズを小さくするためと、左シフトと右シフトでは最大パフォーマンスのための実装が異なるためである


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::shift_right(v, 2);

  for (int x : v) {
    std::cout << x << ',';
  }
  std::cout << std::endl;
}
```
* std::ranges::shift_right[color ff0000]

### 出力
```
1,2,1,2,3,
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 並列に2つ右シフト
  auto result = std::ranges::shift_right(std::execution::par, v, 2);

  for (int x : result) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::shift_right[color ff0000]

#### 出力
```
1 2 3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4901 25 Algorithms library](https://timsong-cpp.github.io/cppwp/algorithms)
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
