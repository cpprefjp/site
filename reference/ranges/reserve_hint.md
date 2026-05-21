# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ reserve_hint = /*unspecified*/;
  }
}
```

## 概要
Rangeに対し、要素数の近似値 (償却定数時間で求められる) を取得するカスタマイゼーションポイントオブジェクト。

[`ranges::to`](to.md)やコンテナの構築で出力先のメモリを事前確保 (`reserve()`) するために用いる。`uppercase_view`のように要素数が厳密には事前にわからないが概算は可能であるような遅延評価Rangeから、効率的にコンテナを構築できる。

[`ranges::size`](size.md)で正確な要素数が取得できるRangeに対しては、`ranges::reserve_hint`は[`ranges::size`](size.md)と等価。それ以外で、メンバ関数または ADL で発見できる`reserve_hint`関数を提供するRangeに対しては、そちらを呼び出す。


## 効果
型`T`の部分式`E`に対して、`t`を`E`の参照とすると、式`ranges::reserve_hint(E)`の効果は以下の通り：

- [`ranges::size`](size.md)`(E)`が有効な式であれば、[`ranges::size`](size.md)`(E)`と等価
- そうでなければ、`auto(t.reserve_hint())`が[*integer-like*](/reference/iterator/is_integer_like.md)型の有効な式であれば、`auto(t.reserve_hint())`と等価
- そうでなければ、`T`がクラス型または列挙体であって、ADLでのみ発見される`reserve_hint(t)`が[*integer-like*](/reference/iterator/is_integer_like.md)型の有効な式であれば、その式と等価
- そうでなければ、呼び出しは不適格


## 戻り値
Rangeの要素数の近似値。常に0以上で、[`range_difference_t`](range_difference_t.md)`<T>`で表現可能。


## カスタマイゼーションポイント
メンバ関数`reserve_hint`を持たせるか、ADLで発見できる非メンバ関数`reserve_hint`を提供することでカスタマイズできる。


## 備考
- `ranges::reserve_hint(E)`が有効な式であるとき、その型は[*integer-like*](/reference/iterator/is_integer_like.md)
- 計算量は償却定数時間でなければならない


## 標準ライブラリでの使用箇所
この関数オブジェクトは、Rangeからコンテナを構築・拡張する際に出力先のメモリを事前確保するために、標準ライブラリの内部で使用される：

- [`std::ranges::to`](to.md) : 内部で`reserve_hint()`を呼び出してから要素のコピーを行う
- [`std::vector`](/reference/vector/vector.md)のRange[コンストラクタ](/reference/vector/vector/op_constructor.md) : `reserve_hint()`を利用して再確保を回避する
- [`std::vector::insert_range()`](/reference/vector/vector/insert_range.md) / [`append_range()`](/reference/vector/vector/append_range.md) : `reserve_hint()`を利用して再確保を高々1回に抑える


## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main()
{
  std::vector v = {1, 2, 3, 4, 5};

  // sized_rangeなので、size()と等価な値を返す
  std::println("{}", std::ranges::reserve_hint(v));
}
```
* std::ranges::reserve_hint[color ff0000]

### 出力
```
5
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::ranges::size`](size.md)
- [`std::ranges::approximately_sized_range`](approximately_sized_range.md)


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
