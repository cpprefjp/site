# SIG_DFL
* csignal[meta header]
* macro[meta id-type]

```cpp
#define SIG_DFL see below
```

## 概要
`signal`関数に渡される引数として、シグナルハンドラをデフォルトに設定するマクロ。

シグナル受信時に`signal`関数で`SIG_DFL`が指定されている場合、そのシグナルに対する実装定義のデフォルト処理が実行される。

## 例
```cpp example
#include <csignal>
#include <iostream>
#include <thread>
#include <chrono>

volatile std::sig_atomic_t flag = 0;

void handler(int)
{
  flag = 1;
}

int main()
{
  std::signal(SIGINT, handler);

  std::cout << "Press Ctrl+C (handled)" << std::endl;
  while (!flag) {
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
  }

  // デフォルトに戻す
  std::signal(SIGINT, SIG_DFL);
  std::cout << "Press Ctrl+C again (default action)" << std::endl;
  for (;;) {
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
  }
}
```
* SIG_DFL[color ff0000]
* std::signal[link /reference/csignal/signal.md]

### 出力

```
Press Ctrl+C (handled)
Press Ctrl+C again (default action)
```

## 関連項目
- [`signal`](/reference/csignal/signal.md)
