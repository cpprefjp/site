# SIGTERM
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIGTERM see below
```

## 概要
プロセスの終了を要求するために送られるシグナルの、シグナル番号を表すマクロ。

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
  std::signal(SIGTERM, handler);
  std::raise(SIGTERM);
  return 0;
}
```
* SIGTERM[color ff0000]

### 出力
```
```
