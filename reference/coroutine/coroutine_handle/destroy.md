# destroy
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void destroy() const;
```

## 概要
中断状態にあるコルーチンを明示的に破棄する。


## 事前条件
`*this`が中断状態のコルーチンを指すこと。


## 効果
コルーチンを破棄する。


## 備考
最終サスペンドポイントにてコルーチンを中断していなければ、該当コルーチンは暗黙に破棄される。

[`std::thread`](/reference/thread/thread.md)や[`std::jthread`](/reference/thread/jthread.md)のインスタンス、もしくはメインスレッド以外からコルーチンを破棄する場合、その振る舞いは処理系定義とされる。


## 例
### 出力

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
- [`done`](done.md)
