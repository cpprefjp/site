# product-type
* [meta exposition-only]
* execution[meta header]
* class template[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
template<class T0, class T1, ..., class Tn>
struct product-type {  // exposition only
  T0 t0;  // exposition only
  T1 t1;  // exposition only
  // ...
  Tn tn;  // exposition only

  template<size_t I, class Self>
  constexpr decltype(auto) get(this Self&& self) noexcept;  // exposition only

  template<class Self, class Fn>
  constexpr decltype(auto) apply(this Self&& self, Fn&& fn) // exposition only
    noexcept(see below);
};
```
* this Self[link /lang/cpp23/deducing_this.md.nolink]

## 概要
`product-type`は、Senderアルゴリズム動作仕様定義で用いられる説明専用のクラステンプレートである。

`product-type`型の式は[構造化束縛](/lang/cpp17/structured_bindings.md)における初期化子として利用できる。


## クラス仕様
```cpp
template<size_t I, class Self>
constexpr decltype(auto) get(this Self&& self) noexcept;
```
* this Self[link /lang/cpp23/deducing_this.md.nolink]

- 効果 : 下記と等価

    ```cpp
    auto& [...ts] = self;
    return std::forward_like<Self>(ts...[I]);
    ```

```cpp
template<class Self, class Fn>
constexpr decltype(auto) apply(this Self&& self, Fn&& fn) noexcept(see below);
```
* this Self[link /lang/cpp23/deducing_this.md.nolink]

- テンプレートパラメータ制約 : 下記`return`文の式が適格であること。
- 効果 : 下記と等価

    ```cpp
    auto& [...ts] = self;
    return std::forward<Fn>(fn)(std::forward_like<Self>(ts)...);
    ```

- 備考 : `noexcept`節の式は上記`return`文が潜在的に例外送出しないならば`true`に、そうでなければ`false`となる。


## バージョン
### 言語
- C++26


## 関連項目
- [`basic-sender`](basic-sender.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
