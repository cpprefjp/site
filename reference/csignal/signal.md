# signal
* csignal[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  extern "C" using signal-handler = void(int); // exposition only
  signal-handler* signal(int sig, signal-handler* func);
}
```
* signal-handler[italic]

## 概要

シグナル番号`sig`の受け取り後の処理を指定する。
`func`の値が`SIG_DFL`の場合、そのシグナルに対するデフォルトの処理が行われる。
`func`の値が`SIG_IGN`の場合、そのシグナルを無視する。
それ以外の場合、関数`func`が実行される。

## 引数

- `sig`: シグナルハンドラを設定するシグナル番号
- `func`: シグナルに対する処理。以下のいずれかを指定する。
    - `SIG_DFL`: そのシグナルに対するデフォルト処理を指定する。
    - `SIG_IGN`: そのシグナルを無視する。
    - `func`: シグナルハンドラにする関数へのポインタを示す。

### シグナルハンドラ関数の制約
シグナルハンドラ関数は戻り値を持たず、`int`型の引数を持つ。
この引数にはシグナル番号が格納される。

シグナルハンドラ内で以下以外の処理を行うことは未定義動作である。
- `volatile std::sig_atomic_t`オブジェクトへの代入
- `abort`関数
- `_Exit`関数
- `quick_exit`関数
- `atomic`引数がロックフリーである場合の`<stdatomic.h>`内の関数
- 任意の`atomic`引数を持つ`atomic_is_lock_free`関数
- `signal`関数（ただし、ハンドラを起こしたシグナル番号に対する呼び出しに限る）

## 戻り値

成功した場合、指定されたシグナルに対する直前のハンドラを返す。
それ以外の場合は`SIG_ERR`を返す

## 備考

マルチスレッド内でのこの関数の動作は未定義。

## 例
```cpp example
#include <csignal>
#include <iostream>

volatile std::sig_atomic_t flag = 0;

void signal_handler(int sig)
{
  flag = 1;
  // std::cout << "signal: " << sig << std::endl; 未定義動作
}

int main()
{
  std::signal(SIGINT, signal_handler);
  while (!flag) {
    //処理
  }
  if (flag) {
    std::cout << "caught SIGINT" << std::endl;
  }
  return 0;
}
```
* std::signal[color ff0000]

### 出力例
```
caught SIGINT
```
