# unstoppable_token
* stop_token[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class Token>
  concept unstoppable_token =
    stoppable_token<Token> &&
    requires (const Token tok) {
      requires bool_constant<(!tok.stop_possible())>::value;
    };
}
```
* stoppable_token[link stoppable_token.md]
* bool_constant[link /reference/type_traits/bool_constant.md]


## 概要
`unstoppable_token`は、型`Token`が停止不可能な停止トークンであることを表すコンセプトである。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`stoppable_token`](stoppable_token.md)
- [`never_stop_token`](never_stop_token.md.nolink)

## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
