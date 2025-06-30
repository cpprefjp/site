# in_found_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<class I>
  struct in_found_result {
    [[no_unique_address]] I in;
    bool found;

    template<class I2>
      requires convertible_to<const I&, I2>
    constexpr operator in_found_result<I2>() const & {
      return {in, found};
    }
    template<class I2>
      requires convertible_to<I, I2>
    constexpr operator in_found_result<I2>() && {
      return {std::move(in), found};
    }
  };

  // (2)
  template<class I>
  using next_permutation_result = in_found_result<I>;

  // (3)
  template<class I>
  using prev_permutation_result = in_found_result<I>;
}
```
* no_unique_address[link /lang/cpp20/language_support_for_empty_objects.md]
* convertible_to[link /reference/concepts/convertible_to.md]
* std::move[link /reference/utility/move.md]

## 概要
* (1): イテレータと`bool`を格納する型
* (2): [`ranges::next_permutation`](ranges_next_permutation.md)で使用するエイリアス
* (3): [`ranges::prev_permutation`](ranges_prev_permutation.md)で使用するエイリアス

この型は、関数が範囲を受け取り、何かを発見したかどうかを返す場合に、処理した範囲の末尾と結果を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                          | 説明                         | 対応バージョン |
|-------------------------------|------------------------------|----------------|
| `[[no_unique_address]] I in`  | 処理した範囲の末尾           | C++20          |
| `bool found`                  | 何かを発見したかを表すフラグ | C++20          |


## メンバ関数

| 名前                           | 説明           | 対応バージョン |
|--------------------------------|----------------|----------------|
| `operator in_found_result<I2>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。


## 例
```cpp example
#include <cassert>
#include <array>
#include <algorithm>

int main ()
{
  std::array<int, 3> v = {1, 2, 3};

  const std::ranges::in_found_result result = std::ranges::next_permutation(v);

  assert(result.in == v.end());
  assert(result.found == true);
}
```
* std::ranges::in_found_result[color ff0000]
* std::ranges::next_permutation[link ranges_next_permutation.md]

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
