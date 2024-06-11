# as_const_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<view V>
    requires input_range<V>
  class as_const_view : public view_interface<as_const_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ as_const = /*unspecified*/;        // (2)
  }
}
```
* input_range[link input_range.md]
* view[link view.md]
* view_interface[link view_interface.md]

## 概要
- (1): 各要素を定数化したRangeとして振る舞う[`view`](view.md)
- (2): `as_const_view`を生成するRangeアダプタオブジェクト

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|:--------:|:-----:|:------:|:-----:|:-------:|:-------------:|:-------------:|:----------:|:------:|:--------:|:----:|
| ※        | ※     |        | ○     | ※       | ※             | ※             | ※          | ※      | ○        | ○    |

- ※: `V`に従う

## 効果

- (2): 式`views::as_const(E)`の効果は次のいずれか（`T = decltype((E))`、`U = remove_cvref_t<T>`とする）
    - `views::all_t<T>`が`constant_range`のモデルとなる場合 : `views::all(E)`
    - 任意の型`X`に対して、`U`が`empty_view<X>`である場合 : `auto(views::empty<const X>)`
    - 任意の型`X`と整数値`Extent`に対して、`U`が`span<X, Extent>`である場合 : `span<const X, Extent>(E)`
    - 任意の型`X`に対して、`U`が`ref_view<X>`であり、`const X`が`constant_range`のモデルとなる場合 : `ref_view(static_cast<const X&>(E.base()))`
    - `E`が左辺値であり、`const U`が`constant_range`のモデルとなり、かつ`U`は`view`のモデルとならない場合 : `ref_view(static_cast<const U&>(E))`
    - それ以外の場合 : `as_const_view(E)`

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](as_const_view/op_constructor.md)  | コンストラクタ                   | C++23          |
| [`base`](as_const_view/base.md)                     | `V`の参照を取得する              | C++23          |
| [`begin`](as_const_view/begin.md)                   | 先頭を指すイテレータを取得する   | C++23          |
| [`end`](as_const_view/end.md)                       | 番兵を取得する                   | C++23          |
| [`size`](as_const_view/size.md)                     | 要素数を取得する                 | C++23          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する         | C++23          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する    | C++23          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する           | C++23          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する           | C++23          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                  | C++23          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する             | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する      | C++23          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](as_const_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++23          |

## 例
```cpp example
#include <ranges>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4};

  for (auto& i : vec | std::views::as_const) {
    std::cout << i << ' ';

    // 変更不可
    //i = 0
  }
}
```
* views::as_const[color ff0000]

### 出力
```
1 2 3 4 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
