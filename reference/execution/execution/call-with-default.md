# call-with-default
* [meta exposition-only]
* execution[meta header]
* function template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class Fn, class Default, class... Args>
  constexpr decltype(auto) call-with-default(
    Fn&& fn, Default&& value, Args&&... args) noexcept(see below);
```

## 概要
`call-with-default`は、Senderアルゴリズム動作仕様定義で用いられる説明専用の関数テンプレートである。

説明用の式`expr`を、適格であるならば[`std::forward`](/reference/utility/forward.md)`<Fn>(fn)(`[`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`とする。そうでなければ、`static_cast<Default>(`[`std::forward`](/reference/utility/forward.md)`<Default>(value))`とする。


## 戻り値
`expr`を返す。


## 備考
noexcept節の式は`noexcept(expr)`となる。


## バージョン
### 言語
- C++26


## 関連項目
- [`execution::on`](on.md)


## 参照
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)
