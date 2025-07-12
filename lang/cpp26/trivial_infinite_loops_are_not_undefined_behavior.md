# 空の無限ループは未定義動作ではないと規定 [P2809R3]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

## 概要
C++23までは、以下のような「条件式が定数式で`true`となる空の無限ループ」が未定義動作と規定されていた。

```cpp
while (true)
  ;
```

C++26ではこのような無限ループは以下のように展開され、並行プログラムの進行保証をした上で未定義動作ではないと規定される。

```cpp
while (true)
  std::this_thread::yield();
```
* std::this_thread[link /reference/thread/this_thread.md]
* yield()[link /reference/thread/this_thread/yield.md]


## 仕様
以下の形式になっている文を、「トリビアルで空のイテレーション文」であると定義する。

- `while (条件式) ;`
- `while (条件式) { }`
- `do ; while (条件式) ;`
- `do { } while (条件式) ;`
- `for ( 初期化式 ; 条件式(省略可) ; ) ;`
- `for ( 初期化式 ; 条件式(省略可) ; ) { }`

また、「トリビアルで空のイテレーション文」のうち、条件式が定数式として`true`に展開される文を「トリビアルな無限ループ」であると定義する。トリビアルな無限ループ内の文は、[`std::this_thread`](/reference/thread/this_thread.md)`::`[`yield()`](/reference/thread/this_thread/yield.md)の呼び出しに置き換えられる。

注：フリースタンディング環境においては、並行進行保証はされない。そのようなシステムにおいては明示的な協調操作が必要となる。


## 参照
- [P2809R3 Trivial infinite loops are not Undefined Behavior](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2809r3.html)
