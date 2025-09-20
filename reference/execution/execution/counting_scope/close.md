# close
* execution[meta header]
* std::execution[meta namespace]
* counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void close() noexcept;
```

## 概要
非同期スコープを閉じる。


## 効果
説明用のメンバ変数`state`に応じて、

- `unused`のとき、`state`を`unused-and-closed`に変更する。
- `open`のとき、`state`を`closed`に変更する。
- `open-and-joining`のとき、`state`を`closed-and-joining`に変更する。
- それ以外のとき、何もしない。


## 事後条件
`*this`に対する後続の[`try-associate`](try-associate.md)は`false`を返す。


## 例外
投げない


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
