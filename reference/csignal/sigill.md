# SIGILL
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIGILL see below
```

## 概要
無効な命令を実行しようとした際に送られるシグナルの、シグナル番号を表すマクロ。

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
  std::signal(SIGILL, handler);
  std::raise(SIGILL);
}
```
* SIGILL[color ff0000]

### 出力
```
```
