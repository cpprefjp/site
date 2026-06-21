# cache_latest_view
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<input_range V>
    requires view<V>
  class cache_latest_view : public view_interface<cache_latest_view<V>> { …… }; // (1)

  namespace views {
    inline constexpr /*unspecified*/ cache_latest = /*unspecified*/;             // (2)
  }
}
```

## 概要
- (1): 元のRangeの最後にアクセスした要素 (間接参照結果) をキャッシュする[`view`](view.md)
- (2): `cache_latest_view`を生成するRangeアダプタオブジェクト

[`views::transform`](transform_view.md)と[`views::filter`](filter_view.md)を組み合わせた場合、`filter`が条件判定のために要素を間接参照し、さらに`for`文の本体で同じ要素を参照することにより、変換関数が2回呼び出される。`cache_latest`を間に挟むことで、間接参照の結果をキャッシュし、変換関数の重複呼び出しを回避できる。

```cpp
v | std::views::transform(expensive) // 重い変換関数
  | std::views::cache_latest         // 変換結果をキャッシュ
  | std::views::filter(pred)
```

キャッシュ戦略は、元のRangeの参照型が参照型である場合はポインタを、非参照型 (prvalue) である場合は値そのものを保持する。

### Rangeコンセプト

| borrowed | sized | output | input | forward | bidirectional | random_access | contiguous | common | viewable | view |
|:--------:|:-----:|:------:|:-----:|:-------:|:-------------:|:-------------:|:----------:|:------:|:--------:|:----:|
|          | ※    |        | ○    |         |               |               |            |        | ○       | ○   |

- ※: `V`が[`sized_range`](sized_range.md)のとき
- イテレータと番兵の型が異なるため[`common_range`](common_range.md)ではない
- 内部状態としてキャッシュを持つため[`forward_range`](forward_range.md)以上にはならない
- キャッシュへのポインタを保持するため[`borrowed_range`](borrowed_range.md)ではない


## テンプレートパラメータ制約
- [`input_range`](input_range.md)`<V>`
- [`view`](view.md)`<V>`


## 効果
- (2): 式`views::cache_latest(E)`の効果は`cache_latest_view(E)`と等しい


## メンバ関数

| 名前                                                          | 説明                             | 対応バージョン |
|---------------------------------------------------------------|----------------------------------|----------------|
| [`(constructor)`](cache_latest_view/op_constructor.md)        | コンストラクタ                   | C++26 |
| [`base`](cache_latest_view/base.md)                           | `V`の参照を取得する              | C++26 |
| [`begin`](cache_latest_view/begin.md)                         | 先頭を指すイテレータを取得する   | C++26 |
| [`end`](cache_latest_view/end.md)                             | 番兵を取得する                   | C++26 |
| [`size`](cache_latest_view/size.md)                           | 要素数を取得する                 | C++26 |


## 継承しているメンバ関数

| 名前                                         | 説明                              | 対応バージョン |
|----------------------------------------------|-----------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する       | C++26          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する | C++26          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する        | C++26          |


## メンバ型

| 名前                                                  | 説明                         | 対応バージョン |
|-------------------------------------------------------|------------------------------|----------------|
| [`iterator`](cache_latest_view/iterator.md.nolink)    | イテレータ型(説明専用)       | C++26          |
| [`sentinel`](cache_latest_view/sentinel.md.nolink)    | 番兵型(説明専用)             | C++26          |


## 推論補助

| 名前                                                              | 説明                         | 対応バージョン |
|-------------------------------------------------------------------|------------------------------|----------------|
| [`(deduction_guide)`](cache_latest_view/op_deduction_guide.md)    | クラステンプレートの推論補助 | C++26          |


## 例
### 基本的な使い方
```cpp example
#include <ranges>
#include <print>
#include <vector>

int main()
{
  std::vector v = {1, 2, 3, 4, 5};

  for (auto x : v | std::views::cache_latest) {
    std::println("{}", x);
  }
}
```
* views::cache_latest[color ff0000]

#### 出力
```
1
2
3
4
5
```


### 変換関数の重複呼び出しを抑える
[`views::transform`](transform_view.md)で重い変換を行い、[`views::filter`](filter_view.md)で絞り込む場合、`filter`が条件判定で要素を間接参照し、その後の処理で再度間接参照されるため、変換関数が要素ごとに複数回呼び出される。間に`cache_latest`を挟むことで、変換関数の呼び出しを各要素1回に抑えられる。

```cpp example
#include <ranges>
#include <print>
#include <vector>

int main()
{
  std::vector v = {1, 2, 3, 4, 5};

  int call_count = 0;
  auto square = [&](int x) { ++call_count; return x * x; };

  for (auto x : v | std::views::transform(square)
                  | std::views::cache_latest
                  | std::views::filter([](int n) { return n > 5; })) {
    std::println("{}", x);
  }
  std::println("call_count: {}", call_count);
}
```
* views::cache_latest[color ff0000]
* std::views::transform[link transform_view.md]
* std::views::filter[link filter_view.md]

#### 出力
```
9
16
25
call_count: 5
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::views::transform`](transform_view.md)
- [`std::views::filter`](filter_view.md)


## 参照
- [P3138R5 `views::cache_latest`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3138r5.html)
