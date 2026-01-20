# try_associate
* execution[meta header]
* function[meta id-type]
* std::execution[meta namespace]
* counting_scope::token[meta class]
* cpp26[meta cpp]

```cpp
assoc-t try_associate() const noexcept;
```
* assoc-t[link ../../counting_scope.md]

## 概要
非同期スコープとの関連付けを試行する。


## 効果
下記と等価。

```cpp
return scope->try-associate();
```
* try-associate[link ../try-associate.md]


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
- [`execution::spawn_future`](../../spawn_future.md)
- [`execution::spawn`](../../spawn.md)


## 参照
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
- [P3815R1 Add `scope_association` concept to P3149](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3815r1.html)
