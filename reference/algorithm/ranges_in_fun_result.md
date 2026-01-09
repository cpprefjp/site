# in_fun_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]
* for_each_result,for_each_n_result[meta alias]

```cpp
namespace std::ranges {
  // (1)
  template<class I, class F>
  struct in_fun_result {
    [[no_unique_address]] I in;
    [[no_unique_address]] F fun;

    template<class I2, class F2>
      requires convertible_to<const I&, I2> && convertible_to<const F&, F2>
    constexpr operator in_fun_result<I2, F2>() const & {
      return {in, fun};
    }

    template<class I2, class F2>
      requires convertible_to<I, I2> && convertible_to<F, F2>
    constexpr operator in_fun_result<I2, F2>() && {
      return {std::move(in), std::move(fun)};
    }
  };

  // (2)
  template<class I, class F>
  using for_each_result = in_fun_result<I, F>;

  // (3)
  template<class I, class F>
  using for_each_n_result = in_fun_result<I, F>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): イテレータと関数オブジェクトを格納する型
* (2): [`ranges::for_each`](ranges_for_each.md)で使用するエイリアス
* (3): [`ranges::for_each_n`](ranges_for_each_n.md)で使用するエイリアス

この型は、関数が範囲と関数オブジェクトを受け取る場合に、処理した範囲の末尾と渡した関数オブジェクトを返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                          | 説明                     | 対応バージョン |
|-------------------------------|--------------------------|----------------|
| `[[no_unique_address]] I in`  | 処理した範囲の末尾       | C++20          |
| `[[no_unique_address]] F fun` | 渡された関数オブジェクト | C++20          |


## メンバ関数

| 名前                             | 説明           | 対応バージョン |
|----------------------------------|----------------|----------------|
| `operator in_fun_result<I2, F2>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例

```cpp example
#include <cassert>
#include <array>
#include <algorithm>

int main() {
  std::array v = { 3, 1, 4 };

  const std::ranges::in_fun_result result = std::ranges::for_each(v, [](int& x) { ++x; });

  assert(result.in == v.end());

  // funは、渡した関数オブジェクト
  int x = 10;
  result.fun(x);

  // 渡した関数オブジェクトの効果で1増えている
  assert(x == 11);
}
```
* std::ranges::in_fun_result[color ff0000]
* std::ranges::for_each[link ranges_for_each.md]

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
