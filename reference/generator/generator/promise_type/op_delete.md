# operator delete
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
void operator delete(void* pointer, size_t size) noexcept;
```

## 概要
[`generator::promise_type`クラス](../promise_type.md)のdelete演算子オーバーロード。


## 事前条件
`pointer`は`size`と同一サイズで[`operator new`](op_new.md)により確保されたストレージを指すポインタ値。


## 効果
[確保時と同じアロケータ](op_new.md)を用いて、`pointer`が指すストレージを解放する。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`operator new`](op_new.md)
