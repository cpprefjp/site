# done
* coroutine[meta header]
* std[meta namespace]
* coroutine_handle[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool done() const;
```

## 概要
最終サスペンドポイントで中断状態にあること、つまりコルーチン本体の終端到達済みか確認する。


## 事前条件
`*this`が中断状態のコルーチンを指すこと。


## 戻り値
コルーチンが最終サスペンドポイントで中断状態にあれば`true`を返す。
それ以外の箇所で中断状態にあれば`false`を返す。


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)
- [`resume`](resume.md)
- [`destroy`](destroy.md)
