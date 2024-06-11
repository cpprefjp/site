# resume
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void operator()() const;
void resume() const;
```

## 概要
中断状態にあるコルーチンの実行を再開する。


## 事前条件
`*this`が中断状態のコルーチンを指し、かつ最終サスペンドポイントで中断状態にないこと。


## 効果
コルーチンの実行を再開する。


## 備考
[`std::thread`](/reference/thread/thread.md)や[`std::jthread`](/reference/thread/jthread.md)のインスタンス、もしくはメインスレッド以外からコルーチンを再開する場合、その振る舞いは処理系定義とされる。


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
