# SIGFPE
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIGFPE see below
```

## 概要
算術演算エラー（浮動小数点例外など）が発生した際に送られるシグナルの、シグナル番号を表すマクロ。

`int`型の正の整数の定数式に展開され、実際の値は未規定。

## 例
```cpp example
#include <csignal>
#include <cstdlib>

void handler(int)
{
  std::_Exit(0);
}

int main()
{
  std::signal(SIGFPE, handler);

  volatile double x = 1.0;
  volatile double y = 0.0;
  // 浮動小数点の 0 除算。
  // SIGFPE が発生することもあるが、規格上は保証されない。
  x = x / y;
}
```
* SIGFPE[color ff0000]

### 出力
```
```
