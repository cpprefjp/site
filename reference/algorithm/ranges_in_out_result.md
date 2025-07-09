# in_out_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class I, class O>
  struct in_out_result {
    [[no_unique_address]] I in;
    [[no_unique_address]] O out;

    template<class I2, class O2>
      requires convertible_to<const I&, I2> && convertible_to<const O&, O2>
    constexpr operator in_out_result<I2, O2>() const & {
      return {in, out};
    }

    template<class I2, class O2>
      requires convertible_to<I, I2> && convertible_to<O, O2>
    constexpr operator in_out_result<I2, O2>() && {
      return {std::move(in), std::move(out)};
    }
  };

  // (2)
  template<class I, class O>
  using copy_result = in_out_result<I, O>;

  // (3)
  template<class I, class O>
  using copy_n_result = in_out_result<I, O>;

  // (4)
  template<class I, class O>
  using copy_if_result = in_out_result<I, O>;

  // (5)
  template<class I, class O>
  using copy_backward_result = in_out_result<I, O>;

  // (6)
  template<class I, class O>
  using move_result = in_out_result<I, O>;

  // (7)
  template<class I, class O>
  using move_backward_result = in_out_result<I, O>;

  // (8)
  template<class I, class O>
  using unary_transform_result = in_out_result<I, O>;

  // (9)
  template<class I, class O>
  using replace_copy_result = in_out_result<I, O>;

  // (10)
  template<class I, class O>
  using replace_copy_if_result = in_out_result<I, O>;

  // (11)
  template<class I, class O>
  using remove_copy_result = in_out_result<I, O>;

  // (12)
  template<class I, class O>
  using remove_copy_if_result = in_out_result<I, O>;

  // (13)
  template<class I, class O>
  using unique_copy_result = in_out_result<I, O>;

  // (14)
  template<class I, class O>
  using reverse_copy_result = in_out_result<I, O>;

  // (15)
  template<class I, class O>
  using rotate_copy_result = in_out_result<I, O>;

  // (16)
  template<class I, class O>
  using partial_sort_copy_result = in_out_result<I, O>;

  // (17)
  template<class I, class O>
  using set_difference_result = in_out_result<I, O>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): 2つのイテレータを格納する型
* (2): [`ranges::copy`](ranges_copy.md)で使用するエイリアス
* (3): [`ranges::copy_n`](ranges_copy_n.md)で使用するエイリアス
* (4): [`ranges::copy_if`](ranges_copy_if.md)で使用するエイリアス
* (5): [`ranges::copy_backward`](ranges_copy_backward.md)で使用するエイリアス
* (6): [`ranges::move`](ranges_move.md)で使用するエイリアス
* (7): [`ranges::move_backward`](ranges_move_backward.md)で使用するエイリアス
* (8): [`ranges::transform`](ranges_transform.md)で使用するエイリアス
* (9): [`ranges::replace_copy`](ranges_replace_copy.md)で使用するエイリアス
* (10): [`ranges::replace_copy_if`](ranges_replace_copy_if.md)で使用するエイリアス
* (11): [`ranges::remove_copy`](ranges_remove_copy.md)で使用するエイリアス
* (12): [`ranges::remove_copy_if`](ranges_remove_copy_if.md)で使用するエイリアス
* (13): [`ranges::unique_copy`](ranges_unique_copy.md)で使用するエイリアス
* (14): [`ranges::reverse_copy`](ranges_reverse_copy.md)で使用するエイリアス
* (15): [`ranges::rotate_copy`](ranges_rotate_copy.md)で使用するエイリアス
* (16): [`ranges::partial_sort_copy`](ranges_partial_sort_copy.md)で使用するエイリアス
* (17): [`ranges::set_difference`](ranges_set_difference.md)で使用するエイリアス

この型は、関数が入力用と出力用に範囲を受け取る場合に、それぞれ処理した範囲の末尾を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                          | 説明               | 対応バージョン |
|-------------------------------|--------------------|----------------|
| `[[no_unique_address]] I in`  | 処理した範囲の末尾 | C++20          |
| `[[no_unique_address]] O out` | 出力した範囲の末尾 | C++20          |


## メンバ関数

| 名前                             | 説明           | 対応バージョン |
|----------------------------------|----------------|----------------|
| `operator in_out_result<I2, O2>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <vector>

int main() {
  std::vector<int> v = { 1, 2, 3 };
  std::vector<int> v2(5);

  const std::ranges::in_out_result result = std::ranges::copy(v, v2.begin());

  assert(result.in == v.end());
  assert(result.out == v2.begin() + 3);
}
```
* std::ranges::in_out_result[color ff0000]
* std::ranges::copy[link ranges_copy.md]

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
