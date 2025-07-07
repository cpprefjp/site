# to_input_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V>
    requires view<V>
  class to_input_view : public view_interface<to_input_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ to_input = /*unspecified*/;          // (2)
  }
}
```

## 概要
- (1): [`input_range`](/reference/ranges/input_range.md)として振る舞う[`view`](view.md)
- (2): `to_input_view`を生成するRangeアダプタオブジェクト

この`view`は、Rangeを`input_range`に変換し、非[`common_range`](common_range.md)にする (イテレータと番兵の型を別にする)。

この`view`は、パフォーマンス向上のために使用する。以下に例示する：

- [`views::join`](join_view.md)`(r)`は、`r`が[`common_range`](common_range.md) (イテレータと番兵の型が同じRange) である場合、イテレータと番兵の比較のために外側と内側の2種類のイテレータを順番に比較することになり比較コストが高くなる。`to_input`を使用することで、番兵との比較が一回で済むためにイテレータの比較コストが小さくなり、パフォーマンス向上が見込める
- [`views::chunk`](chunk_view.md)の場合、`r | views::chunk(n)`は`r`が[`forward_range`](forward_range.md)以上である場合に各要素が[`views::take`](take_view.md)`(n)`となり、各要素を2回ずつイテレートすることになる。[`input_range`](input_range.md)に変換することで、各要素を1回ずつイテレートすることになり、パフォーマンス向上が見込める


### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|:--------:|:-----:|:------:|:-----:|:-------:|:-------------:|:-------------:|:----------:|:------:|:--------:|:----:|
| ※       | ※    |        | ○    |         |               |               | ※         |        | ○       | ○   |

- ※: `V`に従う

## 効果

- (2): 式`views::to_input(E)`の効果は次のいずれか（`T = decltype((E))`、`U = remove_cvref_t<T>`とする）
    - `T`が[`input_range`](input_range.md)のモデルであり、[`common_range`](common_range.md)を満たさず、[`forward_range`](forward_range.md)も満たさない場合 : `views::all(E)`
    -  それ以外の場合 : `to_input_view(E)`

## メンバ関数

| 名前                                             | 説明                             | 対応バージョン |
|--------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](to_input_view/op_constructor.md) | コンストラクタ                   | C++26          |
| [`base`](to_input_view/base.md)                    | `V`の参照を取得する              | C++26          |
| [`begin`](to_input_view/begin.md)                  | 先頭を指すイテレータを取得する   | C++26          |
| [`end`](to_input_view/end.md)                      | 番兵を取得する                   | C++26          |
| [`size`](to_input_view/size.md)                    | 要素数を取得する                 | C++26          |

## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++26          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++26          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++26          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する        | C++26          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                | C++26          |
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する          | C++26          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する  | C++26          |

## 推論補助

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](to_input_view/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26          |

## 例
### 基本的な使い方
```cpp example
#include <ranges>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3, 4};

  for (auto i : v | std::views::to_input) {
    std::cout << i << ' ';
  }
}
```
* views::to_input[color ff0000]

#### 出力
```
1 2 3 4 
```

### viewをパフォーマンス向上させる
```cpp example
#include <ranges>
#include <iostream>
#include <vector>

int main() {
  std::vector<std::vector<int>> v1 = {{1, 2}, {3, 4}};

 // `v1 | std::views::join`と比較して、イテレータと番兵の比較コストが低くなり、
 // パフォーマンスが向上する
  for (auto i : v1 | std::views::to_input | std::views::join) {
    std::cout << i << ' ';
  }

  // `v2 | std::views::chunk(3)`と比較して、各要素が1回ずつイテレートで済むため、
  // パフォーマンスが向上する
  std::vector v2 = {1, 2, 3, 4, 5, 6};
  for (const auto& v : v2 | std::views::to_input | std::views::chunk(3)) {
    for (const auto& i : v) {
      std::cout << i << ' ';
    }
    std::cout << std::endl;
  }
}
```
* views::to_input[color ff0000]
* std::views::join[link join_view.md]
* std::views::chunk[link chunk_view.md]

#### 出力
```
1 2 3 4 1 2 3 
4 5 6 
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]

## 参照
- [P3137R3 `views::to_input`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3137r3.html)
