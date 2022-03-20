# in_in_result
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

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
* convertible_to[link /reference/concepts/convertible_to.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): 2つのイテレータを格納する型
* (2): [`ranges::mismatch`](ranges_mismatch.md)で使用するエイリアス
* (3): [`ranges::swap_ranges`](ranges_swap_ranges.md)で使用するエイリアス

この型は、関数が入力用に2つの範囲を受け取る場合に、それぞれ処理した範囲の末尾を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。

## メンバ関数

| 名前                               | 説明           | 対応バージョン |
|------------------------------------|----------------|----------------|
| `operator in_in_result<II1, II22>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例
(執筆中)

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
