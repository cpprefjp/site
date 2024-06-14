# 無意味なexport宣言を禁止する [P2615R1]
* cpp23[meta cpp]

## 概要
C++20時点でのモジュール定義では、いくつかの不必要なexport宣言ができてしまっていた。

```cpp
template export void f();
export template void f();
export template<> void g(int);
template<> export void g(int);
export template<class T> struct trait<T*>;
```

C++23では、本来必要のない以下の宣言に対するexport宣言を禁止する：

- 明示的なインスタンス化
- 明示的な特殊化
- export宣言

ただし、この変更のあとでも、`export { … }`で囲まれた中では、これらが含まれていてもコンパイルエラーにはならない。


## 関連項目
- [C++20 モジュール](/lang/cpp20/modules.md)


## 参照
- [P2615R1 Meaningful exports](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2615r1.html)
- [CWG Issue 2443. Meaningless template exports](https://wg21.cmeerw.net/cwg/issue2443)
