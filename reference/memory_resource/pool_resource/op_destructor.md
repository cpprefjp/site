# デストラクタ
* memory_resource[meta header]
* function[meta id-type]
* std::pmr[meta namespace]
* pool_resource[meta class]
* cpp17[meta cpp]

```cpp
virtual ~pool_resource();
```

## 概要
管理しているすべてのメモリを解放する。

クラス名を`pool_resource`としているのは説明のためのプレースホルダで、`synchronized_pool_resource`と`unsynchronized_pool_resource`で共通ということである。

## 効果

`this->release()`を呼び出す。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): 2017 update 6