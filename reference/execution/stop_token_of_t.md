# stop_token_of_t
* execution[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
  using stop_token_of_t = remove_cvref_t<decltype(get_stop_token(declval<T>()))>;
}
```
* get_stop_token[link get_stop_token.md]

## 概要
[クエリ可能オブジェクト型](queryable.md)`T`から[停止トークン型](/reference/stop_token/stoppable_token.md)を取得する。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`get_stop_token`](get_stop_token.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
