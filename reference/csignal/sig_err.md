# SIG_ERR
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIG_ERR see below
```

## 概要
`signal`関数の戻り値で、シグナルハンドラの設定に失敗したことを示す値。

`signal`関数が失敗した場合、この値が返される。

## 例
```cpp example
#include <csignal>
#include <iostream>
#include <thread>
#include <chrono>

volatile std::sig_atomic_t flag = 0;

void signal_handler(int sig)
{
  flag = 1;
}

int main()
{
  if (std::signal(SIGINT, signal_handler) == SIG_ERR) {
    std::cerr << "Failed to set signal handler" << std::endl;
    return 1;
  }
  std::cout << "Signal handler set successfully" << std::endl; 
  while (!flag) {
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
  }
  return 0;
}
```
* SIG_ERR[color ff0000]
* std::signal[link /reference/csignal/signal.md]

### 出力例

```
Signal handler set successfully
```

## 関連項目
- [`signal`](/reference/csignal/signal.md)
