# noop_coroutine
* coroutine[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
noop_coroutine_handle noop_coroutine() noexcept;
```
* noop_coroutine_handle[link noop_coroutine_handle.md]

## 概要
中断／再開時に何もしないコルーチンへのハンドルを取得する。

「何もしないコルーチン」は、非対称コルーチン動作と対称コルーチン動作を実行時に制御するケースで利用される。


## 戻り値
中断／再開時に何もしないコルーチンへのハンドル


## 例外
投げない


## 備考
`noop_coroutine()`が返したハンドルと、別の`noop_coroutine()`呼び出しで返されたハンドルとの等値性は規定されない。
（両者は等しいかもしれないし、等しくないかもしれない。）


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.0
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++20 コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P0913R1 Add symmetric coroutine control transfer](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0913r1.html)
