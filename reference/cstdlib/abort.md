# abort
* cstdlib[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  void abort();                       // C++03
  [[noreturn]] void abort() noexcept; // C++11
}
```

## 概要
プ�グラムを異常終了させる。

この関数は、シグナルハンドラでシグナル[`SIGABRT`](/reference/csignal/sigabrt.md.nolink)を捕捉しない限り、プ�グラムを異常終了させる。

この関数を呼び出したときに生�しているオブジェクトは、破棄されない。

[`atexit()`](atexit.md)で登録された関数は、呼び出されない。


## 効果
```cpp
raise(SIGABRT);
```
* raise[link /reference/csignal/raise.md.nolink]
* SIGABRT[link /reference/csignal/sigabrt.md.nolink]


## 戻り値
この関数は決して返らない。


## 例
```cpp example
#include <cstdlib>

int main()
{
  std::abort();
}
```
* std::abort()[color ff0000]

### 出力例
```
Aborted
```


