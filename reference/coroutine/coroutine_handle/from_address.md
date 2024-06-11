# from_address
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static constexpr coroutine_handle<>
coroutine_handle<>::from_address(void* addr);        // (1)

static constexpr coroutine_handle<Promise>
coroutine_handle<Promise>::from_address(void* addr); // (2)
```

## 概要
アドレス値から対応するコルーチンハンドルを取得する。


## 事前条件
`addr`は[`address()`](address.md)呼び出しで得られたアドレス値であること。


## 戻り値
コルーチンを参照するコルーチンハンドル。


## 事後条件
`from_address(`[`address()`](address.md)`) == *this`


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
- [`address`](address.md)
