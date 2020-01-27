# quick_exit
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  [[noreturn]] void quick_exit(int status) noexcept;
}
```

## 概要
後処理をせずに、プ�グラムを終了させる。

[`exit()`](exit.md)関数は、オブジェクトのデストラクタを呼び出して破棄してからプ�グラムを終了させるが、この関数はその破棄処理を行わずに、プ�グラムを終了させる。これは、リソースの破棄を、OSに任せることを意味する。

この関数の主な用途は、マルチスレッドプ�グラムの同期を�ャンセルしてプ�グラムを終了させる、というものである。たとえば、ユーザーが作成したスレッドクラスのデストラクタが、スレッド終了まで待機するものだったとしたら、デストラクタを実行する[`exit()`](exit.md)関数では、スレッドが終了するまで、プ�セスを終了できない。そういった状況でこの関数を使用することにより、プ�セスの終了を阻害するような破棄処理をOSに任せて、即座にプ�セスを終了させられる。

パラメータとして渡された`status`は、プ�グラムの終了コードとして使用される。

- プ�グラムを�常終了させたい場合は、`0`もしくは[`EXIT_SUCCESS`](exit_success.md)をパラメータ`status`に�定する。
- プ�グラムを異常終了させたい場合は、[`EXIT_FAILURE`](exit_failure.md)をパラメータ`status`に�定する。


## 効果
- [`at_quick_exit()`](at_quick_exit.md)関数で登録された関数が、逆順で呼び出される。
    - 登録された関数で例外が送出された場合、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出され、プ�グラムが異常終了する。
- この関数を呼び出したときに生�しているオブジェクトは、破棄されない。
- Cストリームのバッファはフラッシュされない。
- 登録された関数が呼び出されたあと、[`_Exit`](exit_.md)`(status)`を呼び出す。


## 戻り値
この関数は決して返らない。


## 例
```cpp example
#include <cstdlib>

void f()
{
  std::quick_exit(0); // プ�グラムを�常終了させる
}

int main()
{
  f();
}
```
* std::quick_exit[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.8
- [ICC](/implementation.md#icc): 
- [Visual C++](/implementation.md#visual_cpp): 2015


## 関連項目

| 名前 | 説明 |
|------|------|
| [`at_quick_exit`](at_quick_exit.md) | `quick_exit`関数でプ�グラムが終了するときに呼ばれる関数を登録する |
| [`exit`](exit.md) | プ�グラムを終了させる |


## 参照
- [N2440 Abandoning a Process](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2440.htm)
- [detachスレッドとプ�グラム終了処理 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120512/p1)

