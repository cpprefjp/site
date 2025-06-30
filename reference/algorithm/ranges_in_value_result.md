# in_value_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class I, class T>
  struct in_value_result {
    [[no_unique_address]] I in;
    [[no_unique_address]] T value;

    template<class I2, class T2>
      requires convertible_to<const I&, I2> &&
               convertible_to<const T&, T2>
    constexpr operator in_value_result<I2, T2>() const & {
      return {in, value};
    }

    template<class I2, class T2>
      requires convertible_to<I, I2> &&
               convertible_to<T, T2>
    constexpr operator in_value_result<I2, T2>() && {
      return {std::move(in), std::move(value)};
    }
  };

  // (2)
  template<class I, class T>
  using fold_left_with_iter_result = in_value_result<I, T>;

  // (3)
  template<class I, class T>
  using fold_left_first_with_iter_result = in_value_result<I, T>;   
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* std::move[link /reference/utility/move.md]

## 概要

* (1): イテレータと値を格納する型
* (2): [`ranges::fold_left_with_iter`](/reference/algorithm/ranges_fold_left_with_iter.md)で使用するエイリアス
* (3): [`ranges::fold_left_first_with_iter`](/reference/algorithm/ranges_fold_left_first_with_iter.md)で使用するエイリアス

この型は、関数が入力用に範囲を受け取る場合に、処理した範囲の末尾と、それとは別の出力を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                             | 説明                 | 対応バージョン |
| ------------------------------- | -------------------- | -------------- |
| `[[no_unique_address]] I in`    | 読み込んだ範囲の終端位置   | C++23          |
| `[[no_unique_address]] T value` | イテレータとは別の値 | C++23          |


## メンバ関数

| 名前                                | 説明       | 対応バージョン |
| ----------------------------------- | ---------- | -------------- |
| `operator in_value_result<I2, T2>` | 変換演算子 | C++23          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例
(執筆中)

### 出力
(執筆中)

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 5 [mark verified]

## 参照

- [P2322R6 `ranges::fold`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2322r6.html)
