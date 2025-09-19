# join
* execution[meta header]
* std::execution[meta namespace]
* simple_counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
sender auto join() noexcept;
```
* sender[link ../sender.md]

## 概要
非同期スコープを合流する[Sender](../sender.md)を取得する。


## 戻り値
[`make-sender`](../make-sender.md)`(`[`scope-join-t`](../simple_counting_scope.md)`(), this)`


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
