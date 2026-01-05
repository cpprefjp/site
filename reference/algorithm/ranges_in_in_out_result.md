# in_in_out_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class I1, class I2, class O>
  struct in_in_out_result {
    [[no_unique_address]] I1 in1;
    [[no_unique_address]] I2 in2;
    [[no_unique_address]] O  out;

    template<class II1, class II2, class OO>
      requires convertible_to<const I1&, II1> &&
               convertible_to<const I2&, II2> &&
               convertible_to<const O&, OO>
    constexpr operator in_in_out_result<II1, II2, OO>() const & {
      return {in1, in2, out};
    }

    template<class II1, class II2, class OO>
      requires convertible_to<I1, II1> &&
               convertible_to<I2, II2> &&
               convertible_to<O, OO>
    constexpr operator in_in_out_result<II1, II2, OO>() && {
      return {std::move(in1), std::move(in2), std::move(out)};
    }
  };

  // (2)
  template<class I1, class I2, class O>
  using binary_transform_result = in_in_out_result<I1, I2, O>;

  // (3)
  template<class I1, class I2, class O>
  using merge_result  = in_in_out_result<I1, I2, O>;

  // (4)
  template<class I1, class I2, class O>
  using set_union_result  = in_in_out_result<I1, I2, O>;

  // (5)
  template<class I1, class I2, class O>
  using set_intersection_result  = in_in_out_result<I1, I2, O>;

  // (6)
  template<class I1, class I2, class O>
  using set_symmetric_difference_result = in_in_out_result<I1, I2, O>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): 3つのイテレータを格納する型
* (2): [`ranges::transform`](ranges_transform.md)で使用するエイリアス
* (3): [`ranges::merge`](ranges_merge.md)で使用するエイリアス
* (4): [`ranges::set_union`](ranges_set_union.md)で使用するエイリアス
* (5): [`ranges::set_intersection`](ranges_set_intersection.md)で使用するエイリアス
* (6): [`ranges::set_symmetric_difference`](ranges_set_symmetric_difference.md)で使用するエイリアス

この型は、関数が2つの入力用の範囲と出力用の範囲を受け取る場合に、それぞれ処理した範囲の末尾を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                           | 説明                      | 対応バージョン |
|--------------------------------|---------------------------|----------------|
| `[[no_unique_address]] I1 in1` | 1つめの処理した範囲の末尾 | C++20          |
| `[[no_unique_address]] I2 in2` | 2つめの処理した範囲の末尾 | C++20          |
| `[[no_unique_address]] O out`  | 出力した範囲の末尾        | C++20          |


## メンバ関数

| 名前                                      | 説明           | 対応バージョン |
|-------------------------------------------|----------------|----------------|
| `operator in_in_out_result<II1, II2, OO>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。


## 例
```cpp example
#include <algorithm>
#include <vector>
#include <string>
#include <cassert>

int main() {
  std::vector<char> v1 = { 'a','b','c','d','e' };
  std::vector<int> v2 = { 3,1,4 };
  std::vector<std::string> outs(3);

  // v1[n] の文字を v2[n] 回繰り返した文字列を返す
  const std::ranges::in_in_out_result result = std::ranges::transform(v1, v2, outs.begin(), [](char a, int b) { return std::string(b, a); });

  assert(result.in1 == v1.begin() + 3);
  assert(result.in2 == v2.begin() + 3);
  assert(result.out == outs.begin() + 3);
}
```
* std::ranges::in_in_out_result[color ff0000]
* std::ranges::transform[link ranges_transform.md]

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
