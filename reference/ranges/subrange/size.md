# size
* ranges[meta header]
* std::ranges[meta namespace]
* subrange[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr make-unsigned-like-t<iter_difference_t<I>> size() const
  requires (K == subrange_kind::sized);
```
* make-unsigned-like-t[italic][link /reference/type_traits/make_unsigned.md]
* subrange_kind[link /reference/ranges/subrange_kind.md]

## 概要
`subrange`の大きさを取得する。

この関数は、`subrange`が`sized`のときのみオーバーロード解決に参加する。

## 効果

- [`StoreSize`](op_constructor.md)が真のとき、 `return size_;`
- それ以外のとき、`return `[`to-unsigned-like`](/reference/type_traits/make_unsigned.md)`(end_ - begin_);`

## 例
```cpp example
#include <ranges>
#include <iostream>

int main()
{
  constexpr int a[] = {1, 2, 3};
  const std::ranges::subrange sub1(a);
  const std::ranges::subrange sub2(a, a);

  std::cout << sub1.size() << '\n';
  std::cout << sub2.size() << '\n';
}
```

### 出力
```
3
0
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
