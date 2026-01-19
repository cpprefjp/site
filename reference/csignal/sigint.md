# SIGINT
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIGINT see below
```

## 概要
外部割り込みが発生した際に送られるシグナルの、シグナル番号を表すマクロ。

`int`型の正の整数の定数式に展開され、実際の値は未規定。

## 例
```cpp example
#include <csignal>
#include <cstdlib>

volatile std::sig_atomic_t flag = 0;

void handler(int)
{
  std::_Exit(0);
}

int main()
{
  std::signal(SIGINT, handler);
  std::raise(SIGINT);
  return 0;
}
```
* SIGINT[color ff0000]

### 出力
```
```
