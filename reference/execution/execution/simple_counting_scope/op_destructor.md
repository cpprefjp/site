# デストラクタ
* execution[meta header]
* std::execution[meta namespace]
* simple_counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
~simple_counting_scope();
```

## 概要
デストラクタ


## 効果
説明用のメンバ変数`state`が`joined`, `unused`, `unused-and-closed`のいずれでもなければ、[`terminate`](/reference/exception/terminate.md)を呼び出す。
そうでなければ、何もしない。


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
