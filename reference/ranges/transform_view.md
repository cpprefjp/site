# transform_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V, copy_constructible F>
    requires view<V> && is_object_v<F> &&
             regular_invocable<F&, range_reference_t<V>> &&
             can-reference<invoke_result_t<F&, range_reference_t<V>>>
  class transform_view : public view_interface<transform_view<R>> { …… }; // (1) C++20

  template<input_range V, move_constructible F>
    requires view<V> && is_object_v<F> &&
             regular_invocable<F&, range_reference_t<V>> &&
             can-reference<invoke_result_t<F&, range_reference_t<V>>>
  class transform_view : public view_interface<transform_view<R>> { …… }; // (1) C++23

  namespace views {
    inline constexpr /*unspecified*/ transform = /*unspecified*/;         // (2)
  }
}
```
* can-reference[link /reference/iterator/dereferenceable.md]

## 概要
- (1): 指定した関数で各要素を変換した値のRangeとして振る舞う[`view`](view.md)
- (2): `transform_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|----------|-------|--------|-------|---------|---------------|---------------|------------|--------|----------|------|
|          | (1)   | (2)    | ○    | (1)     | (1)           | (1)           |            | (1)    | ○       | ○   |

- (1): `V`に従う
- (2): 述語が参照を返す場合

## 効果

- (2): 式`views::transform(E, P)`の効果は`transform_view(E, P)`と等しい

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](transform_view/op_constructor.md.nolink)  | コンストラクタ                   | C++20          |
| [`base`](transform_view/base.md.nolink)                     | `V`の参照を取得する              | C++20          |
| [`begin`](transform_view/begin.md.nolink)                   | 先頭を指すイテレータを取得する   | C++20          |
| [`end`](transform_view/end.md.nolink)                       | 番兵を取得する                   | C++20          |
| [`size`](transform_view/size.md.nolink)                     | 要素数を取得する                 | C++20          |

`r`を元のRangeとする。`size`は[`ranges::size`](size.md)`(r)`が有効な式であるときに定義される。

## 継承しているメンバ関数

| 名前                                         | 説明                             | 対応バージョン |
|----------------------------------------------|----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する       | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する       | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする               | C++20          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](transform_view/op_deduction_guide.md.nolink) | クラステンプレートの推論補助 | C++20          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  using namespace std;
  int a[] = {1, 2, 3};

  for (int i : a | views::transform([](int x){ return x * x; })) {
    cout << i;
  }
}
```
* views::transform[color ff0000]

### 出力
```
149
```

## 例 特定のメンバを選択する

```cpp example
#include <ranges>
#include <string>
#include <iostream>

struct Record {
  int id = 0;
  std::string name;
};

int main() {
  using namespace std;
  Record records[] = {
    {1, "Alice"},
    {2, "Bob"},
    {3, "Charlie"}
  };

  for (int id : records | views::transform(&Record::id)) {
    cout << id << '\n';
  }
}
```
* views::transform[color ff0000]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 関連項目
- [`std::transform`](/reference/algorithm/transform.md), [`std::ranges::transform`](/reference/algorithm/ranges_transform.md): Rangeの要素に先行評価で関数を適用する標準アルゴリズム関数
- [`zip_transform_view`](zip_transform_view.md) : 複数の範囲から要素を取り出し、関数を適用した結果をビューとして提供する

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [P2367R0 Remove misuses of list-initialization from Clause 24](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2367r0.html) (本提案文書はC++20に遡って適用されている)
