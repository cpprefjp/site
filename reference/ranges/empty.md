# empty
* ranges[meta header]
* std::ranges[meta namespace]
* cpo[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {
    inline constexpr /*unspecified*/ empty = /*unspecified*/;
  }
}
```

## 概要
Rangeが空かどうかを判定する関数オブジェクト。

## 効果
部分式`E`の型を`T`、`t`を`E`を評価した値とする。このとき、式`ranges::empty(E)`の効果は以下の通り。

1. `T`が要素数不明の配列型であれば、呼び出しは不適格。
2. `bool(t.empty())`が有効な式であれば、`bool(t.empty())`と等しい。
3. [`ranges::size`](size.md)`(t) == 0`が有効な式であれば、`(`[`ranges::size`](size.md)`(t) == 0)`と等しい。
4. `bool(`[`ranges::begin`](begin.md)`(t) ==` [`ranges::end`](end.md)`(t))`が有効な式で、[`ranges::begin`](begin.md)`(t)`の型が[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルであれば、`bool(`[`ranges::begin`](begin.md)`(t) ==` [`ranges::end`](end.md)`(t))`と等しい。

どれにも当てはまらないとき、呼び出しは不適格。

## 戻り値
Rangeが空のとき`true`、それ以外の時`false`。

## カスタマイゼーションポイント
[`ranges::begin`](begin.md)と[`ranges::end`](end.md)、または[`ranges::size`](size.md)をカスタマイズすることで、`ranges::empty`をカスタマイズできる。
もしくは、メンバ関数`empty`を持たせるなどの方法でカスタマイズできる。

## 備考
`ranges::empty(E)`が有効な式であるとき、その型は`bool`である。

## 例
```cpp example
#include <vector>
#include <iostream>
#include <ranges>

int main()
{
  int arr[4] = {};
  std::cout << std::boolalpha << std::ranges::empty(arr) << std::endl;

  std::cout << std::boolalpha << std::ranges::empty(u8"arikitari") << std::endl;

  std::vector<int> v;
  std::cout << std::boolalpha << std::ranges::empty(v) << std::endl;
  v.push_back(13);
  std::cout << std::boolalpha << std::ranges::empty(v) << std::endl;
}
```
* std::ranges::empty[color ff0000]

### 出力
```
false
false
true
false
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
- [`std::empty`](/reference/iterator/empty.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
