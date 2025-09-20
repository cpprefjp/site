# request_stop
* execution[meta header]
* std::execution[meta namespace]
* counting_scope[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void request_stop() noexcept;
```

## 概要
非同期スコープ上で停止要求を作成する。


## 効果
`s_source.`[`request_stop()`](/reference/stop_token/inplace_stop_source/request_stop.md)


## 例外
投げない


## 備考
`request_stop`の呼び出しはデータ競合を引き起こさない。


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
