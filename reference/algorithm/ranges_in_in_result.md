# in_in_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]
* mismatch_result,swap_ranges_result[meta alias]

```cpp
namespace std::ranges {
  // (1)
  template<class I1, class I2>
  struct in_in_result {
    [[no_unique_address]] I1 in1;
    [[no_unique_address]] I2 in2;

    template<class II1, class II2>
      requires convertible_to<const I1&, II1> && convertible_to<const I2&, II2>
    constexpr operator in_in_result<II1, II2>() const & {
      return {in1, in2};
    }

    template<class II1, class II2>
      requires convertible_to<I1, II1> && convertible_to<I2, II2>
    constexpr operator in_in_result<II1, II2>() && {
      return {std::move(in1), std::move(in2)};
    }
  };

  // (2)
  template<class I1, class I2>
  using mismatch_result = in_in_result<I1, I2>;

  // (3)
  template<class I1, class I2>
  using swap_ranges_result = in_in_result<I1, I2>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): 2つのイテレータを格納する型
* (2): [`ranges::mismatch`](ranges_mismatch.md)で使用するエイリアス
* (3): [`ranges::swap_ranges`](ranges_swap_ranges.md)で使用するエイリアス

この型は、関数が入力用に2つの範囲を受け取る場合に、それぞれ処理した範囲の末尾を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                           | 説明                      | 対応バージョン |
|--------------------------------|---------------------------|----------------|
| `[[no_unique_address]] I1 in1` | 1つめの処理した範囲の末尾 | C++20          |
| `[[no_unique_address]] I2 in2` | 2つめの処理した範囲の末尾 | C++20          |


## メンバ関数

| 名前                               | 説明           | 対応バージョン |
|------------------------------------|----------------|----------------|
| `operator in_in_result<II1, II22>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <vector>
#include <array>

int main() {
  const std::vector<int>   v  = { 1,2,3,4,3,2 };
  const std::array<int, 6> v2 = { 1,2,4,3,2,1 };

  // v と v2 で異なる場所を探す
  const std::ranges::in_in_result result = std::ranges::mismatch(v, v2);

  assert(result.in1 == v.begin() + 2);
  assert(result.in2 == v2.begin() + 2);
}
```
* std::ranges::in_in_result[color ff0000]
* std::ranges::mismatch[link ranges_mismatch.md]

### 出力
```
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
