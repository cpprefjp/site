# out_value_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class O, class T>
  struct out_value_result {
    [[no_unique_address]] O out;
    [[no_unique_address]] T value;
 
    template<class O2, class T2>
      requires convertible_to<const O&, O2> && convertible_to<const T&, T2>
    constexpr operator out_value_result<O2, T2>() const & {
      return {out, value};
    }
 
    template<class O2, class T2>
      requires convertible_to<O, O2> && convertible_to<T, T2>
    constexpr operator out_value_result<O2, T2>() && {
      return {std::move(out), std::move(value)};
    }
  };

  // (2)
  template< class O, class T >
  using iota_result = out_value_result<O, T>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): イテレータと値を格納する型
* (2): [`ranges::iota`](/reference/numeric/ranges_iota.md)で使用するエイリアス

この型は、関数が出力用に範囲を受け取る場合に、処理した範囲の末尾と、それとは別の出力を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                            | 説明                 | 対応バージョン |
|---------------------------------|----------------------|----------------|
| `[[no_unique_address]] O out`   | 出力した範囲の末尾   | C++23          |
| `[[no_unique_address]] T value` | イテレータとは別の値 | C++23          |


## メンバ関数

| 名前                                | 説明           | 対応バージョン |
|-------------------------------------|----------------|----------------|
| `operator out_value_result<O2, T2>` | 変換演算子     | C++23          |

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
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4901 25 Algorithms library](https://timsong-cpp.github.io/cppwp/algorithms)
