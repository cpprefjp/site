# iota_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<weakly_incrementable W, semiregular Bound = unreachable_sentinel_t>
    requires weakly-equality-comparable-with<W, Bound> && semiregular<W>
  class iota_view : public view_interface<iota_view<W, Bound>> { …… }; // (1)

  namespace views {
    inline constexpr unspecified iota = unspecified; // (2)
  }
}
```
* is_object_v[link /reference/type_traits/is_object.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* semiregular[link /reference/concepts/semiregular.md]
* unreachable_sentinel_t[link /reference/iterator/unreachable_sentinel_t.md]
* weakly-equality-comparable-with[link /reference/concepts/equality_comparable.md]
* view_interface[link view_interface.md]

## 概要
- (1): 有限長または無限長の単調増加列を表す[`view`](view.md)
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
- [`weakly_incrementable`](/reference/type_traits/is_object.md)`<W>`
- [`semiregular`](/reference/concepts/semiregular.md)`<W>`
- [`semiregular`](/reference/concepts/semiregular.md)`<Bound>`
- [`weakly-equality-comparable-with`](/reference/concepts/equality_comparable.md)`<W, Bound>`

## 効果

- 式`views::iota(E)`の効果は`iota_view{E}`と等しい。
- 式`views::iota(E, F)`の効果は`iota_view{E, F}`と等しい。

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](iota_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`begin`](iota_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](iota_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |
| [`size`](iota_view/size.md.nolink)                     | 有限長のとき、要素数を取得する   | C++20          |

## 継承しているメンバ関数

| 名前                                         | 説明                                     | 対応バージョン |
|----------------------------------------------|------------------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する              | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する        | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する               | C++20          |
| [`back`](view_interface/back.md)             | 有限長のとき、末尾要素への参照を取得する | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                       | C++20          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](subrange/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

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
  for (int i : views::iota(10)) {
     cout << i;
     break;
  }
}
```
* views::iota[color ff0000]

### 出力
```
123456789
10
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
