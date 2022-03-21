# in_out_out_result
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class I, class O1, class O2>
  struct in_out_out_result {
    [[no_unique_address]] I  in;
    [[no_unique_address]] O1 out1;
    [[no_unique_address]] O2 out2;

    template<class II, class OO1, class OO2>
      requires convertible_to<const I&, II> &&
               convertible_to<const O1&, OO1> &&
               convertible_to<const O2&, OO2>
    constexpr operator in_out_out_result<II, OO1, OO2>() const & {
      return {in, out1, out2};
    }

    template<class II, class OO1, class OO2>
      requires convertible_to<I, II> &&
               convertible_to<O1, OO1> &&
               convertible_to<O2, OO2>
    constexpr operator in_out_out_result<II, OO1, OO2>() && {
      return {std::move(in), std::move(out1), std::move(out2)};
    }
  };

  // (2)
  template<class I, class O1, class O2>
  using partition_copy_result = in_out_out_result<I, O1, O2>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): 3つのイテレータを格納する型
* (2): [`ranges::partition_copy`](ranges_partition_copy.md)で使用するエイリアス

この型は、関数が入力用の範囲と2つの出力用の範囲を受け取る場合に、それぞれ処理した範囲の末尾を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。

## メンバ関数

| 名前                                       | 説明           | 対応バージョン |
|--------------------------------------------|----------------|----------------|
| `operator in_out_out_result<II, OO1, OO2>` | 変換演算子     | C++20          |

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
