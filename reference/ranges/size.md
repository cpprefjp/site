# size
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ size = /*unspecified*/;
  }
}
```

## 概要
Rangeの要素数を取得する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`t`を`E`を評価した値とする。このとき、式`ranges::size(E)`の効果は以下の通り。

1. `T`が配列型であれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(`[`extent_v`](/reference/type_traits/extent.md)`<T>)`に等しい(expression‑equivalent)。ただし、要素数不明の配列であれば、呼び出しは不適格。
2. [`disable_sized_range`](disable_sized_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`、かつ[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.size())`が整数型(integer-like)の有効な式であれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(t.size())`と等しい。
3. `T`がクラス型または列挙体であって、[`disable_sized_range`](disable_sized_range.md)`<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`、かつ`size`がADLで見つかり、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(size(t))`が整数型の有効な式であれば、[`decay-copy`](/reference/exposition-only/decay-copy.md)`(size(t))`と等しい。
4. `to-unsigned-like(`[`ranges::end`](end.md)`(t) - `[`ranges::begin`](begin.md)`(t))`が有効な式で、[`ranges::begin`](begin.md)の型`I`、[`ranges::end`](end.md)の型`S`が[`sized_sentinel_for`](/reference/iterator/disable_sized_sentinel_for.md)`<S, I>`と[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルであれば、`to-unsigned-like(`[`ranges::end`](end.md)`(t) - `[`ranges::begin`](begin.md)`(t))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
Rangeの要素数。

## カスタマイゼーションポイント
[`ranges::begin`](begin.md)と[`ranges::end`](end.md)をカスタマイズすることで、`ranges::size`をカスタマイズできる。
もしくは、メンバ関数`size`を持たせるなどの方法でカスタマイズできる。

## 備考
`ranges::size(E)`が有効な式であるとき、その型は整数型(integer-like)。

## 例
```cpp example
#include <vector>
#include <iostream>
#include <ranges>

int main()
{
  int arr[4] = {};
  std::cout << std::ranges::size(arr) << std::endl;

  std::cout << std::ranges::size(u8"arikitari") << std::endl;

  std::vector<int> v = { 1,1,2,3,5,8 };
  int hoge = 13;
  v.push_back(hoge);
  std::cout << std::ranges::size(v) << std::endl;
}
```
* std::ranges::size[color ff0000]

### 出力
```
4
10
7
7
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
- [`std::size`](/reference/iterator/size.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
