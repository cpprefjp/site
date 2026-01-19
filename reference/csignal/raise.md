# raise
* csignal[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  int raise(int sig);
}
```

## 概要
現在のプログラムにシグナルを送信する。

## 引数
- `sig`: 送信するシグナル番号

## 戻り値
正常に終了した場合は0を返す。
それ以外の場合は非ゼロの値を返す。

## 備考
`signal`関数などにより、シグナルハンドラが呼び出された場合、それが終了するまでこの関数は戻らない。

## 例
```cpp example
#include <iostream>
#include <csignal>

volatile std::sig_atomic_t got_signal = 0;

void signal_handler(int signum) {
  got_signal = 1;
}

int main (){
  std::signal(SIGABRT, signal_handler);
  std::raise(SIGABRT);
  if (got_signal)
    std::cout << "SIGABRT" << std::endl;
  return 0;
}
```
* std::raise[color ff0000]

### 出力例
```
SIGABRT
```
