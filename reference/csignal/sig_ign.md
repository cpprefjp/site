# SIG_IGN
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIG_IGN see below
```

## 概要
`signal`関数に渡される引数として、指定されたシグナルを無視させるマクロ。

シグナル受信時に`signal`関数で`SIG_IGN`が指定されている場合、そのシグナルは無視される。

## 例
```cpp example
#include <csignal>
#include <iostream>
#include <thread>
#include <chrono>

int main()
{
  std::signal(SIGINT, SIG_IGN);
  // Ctrl+Cを押してもプログラムは続行する
  for (int i = 0; i < 10; ++i) {
    std::cout << i << " " << std::flush;
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
  }
  std::cout << std::endl;
  return 0;
}
```
* SIG_IGN[color ff0000]
* std::signal[link /reference/csignal/signal.md]

### 出力

```
0 1 2 3 4 5 6 7 8 9
```

## 関連項目
- [`signal`](/reference/csignal/signal.md)
