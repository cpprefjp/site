# final_suspend
* generator[meta header]
* function[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
auto final_suspend() noexcept;
```

## 概要
ジェネレータコルーチンの[最終サスペンドポイント](/lang/cpp20/coroutines.md)を制御するAwaitableオブジェクトを返す。
プログラマが本関数を直接利用することは想定されていない。


## 事前条件
Promiseオブジェクトが`*this`となる[コルーチンへのハンドル](/reference/coroutine/coroutine_handle.md)が、ある[`generator`オブジェクト](../../generator.md)`x`のアクティブスタック(`*active_`)のトップにあること。
この関数はコルーチン実行が最終サスペンドポイントに到達したときに呼び出される。


## 戻り値
下記動作を行うメンバ関数をもつ、未規定の型のAwaitableオブジェクト。

- コルーチンの中断(suspend)時に、ジェネレータ`x`のアクティブスタック(`*x.active_`)のトップからコルーチンハンドルをpopし、
    - アクティブスタックが空でなければトップ要素(`*x.active_->top()`)が指すコルーチンを[再開(resume)](/reference/coroutine/coroutine_handle/resume.md)する。
    - アクティブスタックが空の場合は、現在の[コルーチンの呼び出し元もしくは再開元(resumer)](/lang/cpp20/coroutines.md)へ制御フローを戻す。


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
