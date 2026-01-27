# visit
* format[meta header]
* class[meta id-type]
* std[meta namespace]
* basic_format_arg[meta class]
* cpp26[meta cpp]

```cpp
template <class Visitor>
constexpr decltype(auto)
  visit(this basic_format_arg arg, Visitor&& vis); // (1) C++26

template<class R, class Visitor>
constexpr R
  visit(this basic_format_arg arg, Visitor&& vis); // (2) C++26
```

## 概要
現在保持している型に対応する関数を呼び出す。

- (1) : 現在保持している型に対応する関数を呼び出し、呼び出された関数の戻り値型で戻り値を返す
- (2) : 現在保持している型に対応する関数を呼び出し、指定された戻り値型`R`で戻り値を返す


## 効果
- (1): 以下と等価
    ```cpp
    return arg.value.visit(std::forward<Visitor>(vis));
    ```
    * visit[link /reference/variant/variant/visit.md]

- (2): 以下と等価
    ```cpp
    return arg.value.visit<R>(std::forward<Visitor>(vis));
    ```
    * visit[link /reference/variant/variant/visit.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P2637R3 Member `visit`](http://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2637r3.html)
- [P3391R2 `constexpr std::format`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3391r2.html)
