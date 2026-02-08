# simple-view
* [meta exposition-only]
* ranges[meta header]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
template<class R>
  concept simple-view = // 説明専用コンセプト
    view<R> && range<const R> &&
    same_as<iterator_t<R>, iterator_t<const R>> &&
    same_as<sentinel_t<R>, sentinel_t<const R>>;
```

## 概要
`simple-view`は型`R`が単純（`R`は`const`であっても Range である（`const-iterable`である）上で、`R`が使用するイテレータ/センチネルと読み取り専用のイテレータ/センチネルが同じ型である）となるビューな Range を表す説明専用コンセプトである。

`const-iterable`が要件にあることは、`const-iterable`ではない Range は内部でキャッシュ等の複雑度が高い仕様となることで、`const-iterable`では無くならざるを得なくなることが背景であると考えられる。`const-iterable`でないビューとしては、[`ranges::filter_view`](filter_view.md)などが挙げられる。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参考
- [filter_viewがconst-iterableではない理由](https://zenn.dev/onihusube/scraps/40a95c8f769414)
