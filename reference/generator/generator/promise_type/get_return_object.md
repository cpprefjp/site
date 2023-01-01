# get_return_object
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
generator get_return_object() noexcept;
```
* generator[link ../../generator.md]

## 概要
ジェネレータ[コルーチン](/lang/cpp20/coroutines.md)の戻り値オブジェクトを生成する。


## 戻り値
[`coroutine_handle`](/reference/coroutine/coroutine_handle.md)`<promise_type>::`[`from_promise`](/reference/coroutine/coroutine_handle/from_promise.md)`(*this)`で取得したコルーチンハンドルを保持する[`generator`](../../generator.md)オブジェクト。


## 例外
投げない


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
