# promise
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
Promise& promise() const;
```

## 概要
コルーチンのPromiseオブジェクトへの参照を返す。


## 事前条件
`*this`が有効なコルーチンを指すこと。


## 戻り値
コルーチンのPromiseオブジェクトへの参照。


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
- [from_promise](from_promise.md)
