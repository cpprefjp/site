# start-join-sender
* execution[meta header]
* std::execution[meta namespace]
* simple_counting_scope[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class State>
bool start-join-sender(State& st) noexcept; // exposition only
```

## 概要
合流[Sender](../sender.md)を開始する、説明専用のメンバ関数。


## 効果
説明用のメンバ変数`state`に応じて、

- `unused`, `unused-and-closed`, `joined`のとき、`state`を`joined`に変更して`true`を返す。
- `open`, `open-and-joining`のとき、`state`を`open-and-joining`に変更し、`*this`で`st`を登録して`false`を返す。
- `closed`, `closed-and-joingin`のとき、`state`を`closed-and-joining`に変更し、`*this`で`st`を登録して`false`を返す。


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
