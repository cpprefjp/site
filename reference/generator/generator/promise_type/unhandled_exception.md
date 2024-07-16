# unhandled_exception
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
void unhandled_exception();
```

## 概要
ジェネレータコルーチンから送出された例外を処理する。
プログラマが本関数を直接利用することは想定されていない。


## 事前条件
Promiseオブジェクトが`*this`となる[コルーチンへのハンドル](/reference/coroutine/coroutine_handle.md)が、ある[`generator`オブジェクト](../../generator.md)`x`のアクティブスタック`x.active_`のトップにあること。


## 効果
Promiseオブジェクトが`*this`となる[コルーチンへのハンドル](/reference/coroutine/coroutine_handle.md)がジェネレータ`x`のアクティブスタック`x.active_`の唯一の要素であれば、式`throw`に等しい。

そうでなければ、[説明専用メンバ`except_`](../promise_type.md)に[`current_exception()`](/reference/exception/current_exception.md)を代入する。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`yield_value`](yield_value.md)
