# from_promise
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static coroutine_handle from_promise(Promise& p);
```

## 概要
Promiseオブジェクトから対応するコルーチンハンドルを取得する。


## 事前条件
`p`はコルーチンのPromiseオブジェクトへの参照。


## 戻り値
コルーチンを参照するコルーチンハンドル(`h`)。


## 事後条件
[`addressof`](/reference/memory/addressof.md)`(h.`[`promise()`](promise.md)`) ==` [`addressof`](/reference/memory/addressof.md)`(p)`


## 備考
型消去されたコルーチンハンドル`coroutine_handle<>`では、本メンバ関数は提供されない。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
- [`promise`](promise.md)
