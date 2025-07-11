# iota_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<weakly_incrementable W, semiregular Bound = unreachable_sentinel_t>
    requires weakly-equality-comparable-with<W, Bound> && copyable<W>
  class iota_view : public view_interface<iota_view<W, Bound>> { …… }; // (1)

  namespace views {
    inline constexpr unspecified iota = unspecified; // (2)
  }
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* copyable[link /reference/concepts/copyable.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]

## 概要
- (1): インクリメント演算子によって生成される、有限長または無限長の単調増加列を表す[`view`](view.md)
    - 1つの値`b`から生成した`iota_view`は、`b`から始まる無限長の単調増加列となる。
    - 2つの値`b`, `e`から生成した`iota_view`は、`[b, e)`に含まれる値を列挙する有限長の単調増加列となる。
- (2): `iota_view`を生成するカスタマイゼーションポイントオブジェクト

`iota_view`の要素は、`iota_view`が作られる時に初めの要素が生成され、残りはアクセスするときに生成される。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
| ○       | (1)   |        | ○    | (2)     | (2)           | (2)           |            | (3)    | ○       | ○   |

- (1): [`common_range`](common_range.md)かつ[`random_access_range`](random_access_range.md)のとき
- (2):
    - `W`が[`incrementable`](/reference/iterator/incrementable.md)のとき、[`forward_range`](forward_range.md)
    - `W`が[`incrementable`](/reference/iterator/incrementable.md)かつデクリメント操作が可能であるとき、[`bidirectional_range`](bidirectional_range.md)
    - `W`が[`incrementable`](/reference/iterator/incrementable.md)かつデクリメント操作と加減算が可能であるとき、[`random_access_range`](random_access_range.md)
- (3): `W`と`Bound`が等しいとき

## テンプレートパラメータ制約
- [`weakly_incrementable`](/reference/iterator/weakly_incrementable.md)`<W>`
- [`copyable`](/reference/concepts/copyable.md)`<W>`
- [`semiregular`](/reference/concepts/semiregular.md)`<Bound>`
- [`weakly-equality-comparable-with`](/reference/concepts/equality_comparable.md)`<W, Bound>`

## 効果

- 式`views::iota(E)`の効果は`iota_view(E)`と等しい。
- 式`views::iota(E, F)`の効果は`iota_view(E, F)`と等しい。

## メンバ関数

| 名前                                            | 説明                             | 対応バージョン |
|-------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](iota_view/op_constructor.md)  | コンストラクタ                   | C++20          |
| [`begin`](iota_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](iota_view/end.md)                       | 番兵を取得する                   | C++20          |
| [`size`](iota_view/size.md)                     | 有限長のとき、要素数を取得する   | C++20          |
| [`empty`](iota_view/empty.md)                   | Rangeが空かどうかを判定する              | C++26         |

## 継承しているメンバ関数

| 名前                                         | 説明                                     | 対応バージョン |
|----------------------------------------------|------------------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する              | C++20（C++23まで）  |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する        | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する               | C++20          |
| [`back`](view_interface/back.md)             | 有限長のとき、末尾要素への参照を取得する | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                       | C++20          |

## メンバ型

| 名前                                      | 説明                         | 対応バージョン |
|-------------------------------------------|------------------------------|----------------|
| [`iterator`](iota_view/iterator.md)       | イテレータ型(説明専用)       | C++20          |
| [`sentinel`](iota_view/sentinel.md)       | 番兵型(説明専用)             | C++20          |

## その他
| 名前                                      | 説明                         | 対応バージョン |
|-------------------------------------------|------------------------------|----------------|
| [`iota_diff_t`](iota_view/iota_diff_t.md) | イテレータの差の型(説明専用) | C++20          |

## 推論補助

| 名前                                                   | 説明                         | 対応バージョン |
|--------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](iota_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;

  for (int i : views::iota(1, 10)) {
    cout << i;
  }
  cout << '\n';
  for (int i : views::iota(1) | views::filter([](auto&& x) { return x % 3 == 0; }) | views::take(3)) {
    cout << i;
  }
}
```
* views::iota[color ff0000]
* views::filter[link filter_view.md]
* views::take[link take_view.md]

### 出力
```
123456789
369
```

## 例 自作クラスを使用する

```cpp
#include <ranges>
#include <concepts>
#include <cstdint>
#include <iostream>

struct fizzbuzz_t {
  int value_ = 0;
  constexpr fizzbuzz_t& operator++(){
    ++value_;
    return *this;
  }
  constexpr fizzbuzz_t operator++(int){
    ++value_;
    return {value_ - 1};
  }
  using difference_type = int;
  constexpr auto operator<=>(const fizzbuzz_t&) const = default;
};

static_assert(std::weakly_incrementable<fizzbuzz_t>);

std::ostream& operator<<(std::ostream& os, fizzbuzz_t fb) {
  if(fb.value_ % 15 == 0) {
    return os << "FizzBuzz";
  }
  if(fb.value_ % 3 == 0) {
    return os << "Fizz";
  }
  if(fb.value_ % 5 == 0) {
    return os << "Buzz";
  }
  return os << fb.value_;
}

int main()
{
  for(auto fb : std::views::iota(fizzbuzz_t{1}, fizzbuzz_t{16})) {
    std::cout << fb << '\n';
  }
}
```
* std::weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* std::views::iota[color ff0000]

### 出力
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目
- [`std::iota`](/reference/numeric/iota.md), [`std::ranges::iota`](/reference/numeric/ranges_iota.md): Rangeに先行評価で増加列を書き込む標準アルゴリズム関数

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2325R3 Views should not be required to be default constructible](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2325r3.html) (本提案文書はC++20に遡って適用されている)
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
- [LWG Issue 4001. `iota_view` should provide `empty`](https://cplusplus.github.io/LWG/issue4001)
