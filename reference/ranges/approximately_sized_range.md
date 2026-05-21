# approximately_sized_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept approximately_sized_range =
    range<T> && requires(T& t) { ranges::reserve_hint(t); };
}
```

## 概要
`approximately_sized_range`は、要素数の近似値を償却定数時間で求めることができるRangeを表すコンセプトである。

[`sized_range`](sized_range.md)が正確な要素数を要求するのに対し、`approximately_sized_range`は概算値で十分とする。Unicodeのケース変換や正規化など、出力サイズが入力サイズから厳密には計算できないが概算は可能な場面で、出力先コンテナのメモリ事前確保 (`reserve()`) に利用できる。

`approximately_sized_range`なRangeからは[`ranges::reserve_hint`](reserve_hint.md)で要素数の近似値を取得できる。


## モデル
型が[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<T>`であるlvalue`t`について、`T`が`approximately_sized_range`のモデルとなるのは、以下の条件をすべて満たす場合である：

1. [`ranges::reserve_hint`](reserve_hint.md)`(t)`が償却定数時間で実行でき、`t`を変更せず、その値は0以上で[`range_difference_t`](range_difference_t.md)`<T>`で表現可能であること
2. [`iterator_t`](iterator_t.md)`<T>`が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルであれば、[`ranges::reserve_hint`](reserve_hint.md)`(t)`は[`ranges::begin`](begin.md)`(t)`の評価によらず一意に定まること


## 備考
[`sized_range`](sized_range.md)は`approximately_sized_range`を継承するため、`sized_range`であれば`approximately_sized_range`でもある。


## 例
```cpp example
#include <ranges>
#include <vector>
#include <forward_list>

int main()
{
  // vectorはsized_rangeなのでapproximately_sized_range
  static_assert(std::ranges::approximately_sized_range<std::vector<int>>);

  // forward_listはsized_rangeではないがreserve_hintも提供しない
  static_assert(!std::ranges::approximately_sized_range<std::forward_list<int>>);
}
```
* std::ranges::approximately_sized_range[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::ranges::sized_range`](sized_range.md)
- [`std::ranges::reserve_hint`](reserve_hint.md)


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
