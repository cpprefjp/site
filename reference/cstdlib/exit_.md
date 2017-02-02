#_Exit
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  [[noreturn]] void _Exit(int status) noexcept;
}
```

##概要
後処理をせずに、プログラムを終了させる。

[`exit()`](exit.md)関数は、オブジェクトのデストラクタを呼び出して破棄してからプログラムを終了させるが、この関数はその破棄処理を行わずに、プログラムを終了させる。これは、リソースの破棄を、OSに任せることを意味する。

[`quick_exit()`](quick_exit.md)との違いは、プロセス終了時に呼び出される関数を登録できない点である。

パラメータとして渡された`status`は、プログラムの終了コードとして使用される。

- プログラムを正常終了させたい場合は、`0`もしくは[`EXIT_SUCCESS`](exit_success.md)をパラメータ`status`に設定する。
- プログラムを異常終了させたい場合は、[`EXIT_FAILURE`](exit_failure.md)をパラメータ`status`に設定する。


##効果
- この関数を呼び出したときに生存しているオブジェクトは、破棄されない。
- Cストリームのバッファはフラッシュされない。
- [`atexit()`](atexit.md)で登録された関数は呼び出されない。
- プロセスを終了する。


##戻り値
この関数は決して返らない。


##備考
この関数は、C99で導入され、C++に取り込んだものである。C++では、この関数の代わりに[`quick_exit()`](quick_exit.md)関数を使用することを推奨する。


##例
```cpp
#include <iostream>
#include <cstdlib>

struct X {
  ~X()
  {
    std::cout << "called X's destructor" << std::endl;
  }
};

void f()
{
  X x; // このオブジェクトのデストラクタは、呼び出されない。
  std::_Exit(0); // プログラムを正常終了させる
}

int main()
{
  f();
}
```
* std::_Exit[color ff0000]

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 14.0


##関連項目

| 名前 | 説明 |
|------|------|
| [`exit`](exit.md) | プログラムを終了させる |
| [`quick_exit`](exit.md) | 後処理をせずに、プログラムを終了させる |


##参照
- [N2440 Abandoning a Process](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2440.htm)
- [detachスレッドとプログラム終了処理 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120512/p1)

