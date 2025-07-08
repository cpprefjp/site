# in_out_out_result
* algorithm[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
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
* std::move[link /reference/utility/move.md]

## 概要
* (1): 3つのイテレータを格納する型
* (2): [`ranges::partition_copy`](ranges_partition_copy.md)で使用するエイリアス

この型は、関数が入力用の範囲と2つの出力用の範囲を受け取る場合に、それぞれ処理した範囲の末尾を返すために使用される。

標準アルゴリズム関数ではこの型を直接返す代わりに、関数毎にエイリアスを定義している。


## メンバ変数

| 名前                            | 説明                      | 対応バージョン |
|---------------------------------|---------------------------|----------------|
| `[[no_unique_address]] I in`    | 処理した範囲の末尾        | C++20          |
| `[[no_unique_address]] O1 out1` | 1つめの出力した範囲の末尾 | C++20          |
| `[[no_unique_address]] O2 out2` | 2つめの出力した範囲の末尾 | C++20          |


## メンバ関数

| 名前                                       | 説明           | 対応バージョン |
|--------------------------------------------|----------------|----------------|
| `operator in_out_out_result<II, OO1, OO2>` | 変換演算子     | C++20          |

変換演算子は、各テンプレートパラメーターが変換できる場合のみオーバーロード解決に参加する。

## 例
```cpp example
#include <cassert>
#include <vector>
#include <algorithm>

bool is_even(int x) { return x % 2 == 0; }

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::vector<int> evens(5);
  std::vector<int> odds(5);
  const std::ranges::in_out_out_result result = std::ranges::partition_copy(v, evens.begin(), odds.begin(), is_even);

  assert(result.in == v.end());
  assert(result.out1 == evens.begin() + 2);
  assert(result.out2 == odds.begin() + 3);

  // 出力した範囲の後ろを削除する
  evens.erase(result.out1, evens.end());
  odds.erase(result.out2, odds.end());

  assert(evens.size() == 2);
  assert(odds.size() == 3);
}
```
* std::ranges::in_out_out_result[color ff0000]
* std::ranges::partition_copy[link ranges_partition_copy.md]

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
