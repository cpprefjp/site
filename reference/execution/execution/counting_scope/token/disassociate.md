# disassociate
* execution[meta header]
* function[meta id-type]
* std::execution[meta namespace]
* counting_scope::token[meta class]
* cpp26[meta cpp]

```cpp
void disassociate() const noexcept;
```

## 概要
非同期スコープとの関連付けを解除する。


## 効果
下記と等価。

```cpp
scope->disassociate()
```
* disassociate[link ../disassociate.md]


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


## 関連項目
- [`execution::associate`](../../associate.md)
- [`execution::spawn_future`](../../spawn_future.md.nolink)
- [`execution::spawn`](../../spawn.md.nolink)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
