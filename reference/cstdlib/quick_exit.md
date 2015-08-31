#quick_exit (C++11)
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  [[noreturn]] void quick_exit(int status) noexcept;
}
```

##概要
後処理をせずに、プログラムを終了させる。

[`exit()`](./exit.md)関数は、オブジェクトのデストラクタを呼び出して破棄してからプログラムを終了させるが、この関数はその破棄処理を行わずに、プログラムを終了させる。これは、リソースの破棄を、OSに任せることを意味する。

この関数の主な用途は、マルチスレッドプログラムの同期をキャンセルしてプログラムを終了させる、というものである。

パラメータとして渡された`status`は、プログラムの終了コードとして使用される。

- プログラムを正常終了させたい場合は、`0`もしくは[`EXIT_SUCCESS`](./exit_success.md)をパラメータ`status`に設定する。
- プログラムを異常終了させたい場合は、[`EXIT_FAILURE`](./exit_failure.md)をパラメータ`status`に設定する。


##効果
- [`at_quick_exit()`](./at_quick_exit.md.nolink)関数で登録された関数が、逆順で呼び出される。
    - 登録された関数で例外が送出された場合、[`std::terminate()`](/exception/terminate.md)関数が呼び出され、プログラムが異常終了する。
- この関数を呼び出したときに生存しているオブジェクトは、破棄されない。
- Cストリームのバッファはフラッシュされない。
- 登録された関数が呼び出されたあと、[`_Exit`](./_exit.md.nolink)`(status)`を呼び出す。


##戻り値
この関数は決して返らない。


##例
```cpp
#include <cstdlib>

void f()
{
  std::quick_exit(0); // プログラムを正常終了させる
}

int main()
{
  f();
}
```

###出力
```
```


##関連項目

| 名前 | 説明 |
|------|------|
| [`at_quick_exit`](./at_quick_exit.md.nolink) | `quick_exit`関数でプログラムが終了するときに呼ばれる関数を登録する |
| [`exit`](./exit.md) | プログラムを終了させる |


##参照
- [N2440 Abandoning a Process](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2440.htm)
- [detachスレッドとプログラム終了処理 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120512/p1)

