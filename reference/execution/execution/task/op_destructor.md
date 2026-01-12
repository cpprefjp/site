# デストラクタ
* execution[meta header]
* std::execution[meta namespace]
* task[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
~task();
```

## 概要
デストラクタ


## 効果
下記と等価。

```cpp
if (handle)
  handle.destroy();
```
* destroy()[link /reference/coroutine/coroutine_handle/destroy.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3552R3 Add a Coroutine Task Type](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3552r3.html)
